import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

// Stripe Payment Form Component
const StripePaymentForm = ({ amount, onSuccess, onError, bookingData, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Create payment intent on backend
            const response = await fetch('http://localhost:5009/api/payments/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    bookingData: bookingData
                }),
            });

            const { clientSecret, paymentIntentId } = await response.json();

            // Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (stripeError) {
                setError(stripeError.message);
                onError(stripeError.message);
            } else if (paymentIntent.status === 'succeeded') {
                // Confirm payment on backend and create booking
                const confirmResponse = await fetch('http://localhost:5009/api/payments/confirm-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentIntentId,
                        bookingData: bookingData,
                        userId: user?._id || 'guest'
                    }),
                });

                const confirmData = await confirmResponse.json();

                if (confirmData.success) {
                    onSuccess(confirmData.booking);
                } else {
                    onError('Payment confirmation failed');
                }
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
            onError('Payment failed. Please try again.');
        }

        setIsProcessing(false);
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
                <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                    <CardElement options={cardElementOptions} />
                </div>
            </div>

            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing...' : `Pay $${amount}`}
            </button>
        </form>
    );
};

export default function Booking({ setScreen, bookingDetails }) {
    const [currentStep, setCurrentStep] = useState(1); // 1: Guest Info, 2: Payment Method, 3: Payment Form, 4: Processing, 5: Success/Failure

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: ""
    });

    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'
    const [bookingId, setBookingId] = useState("");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCardInputChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    const validateGuestInfo = () => {
        return formData.firstName && formData.lastName && formData.email && formData.phone;
    };

    const handleGuestInfoSubmit = (e) => {
        e.preventDefault();
        if (validateGuestInfo()) {
            setCurrentStep(2);
        } else {
            alert("Please fill in all required fields");
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
        setCurrentStep(3);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setCurrentStep(4); // Processing

        if (paymentMethod === 'upi') {
            // Simulate UPI payment process
            setTimeout(async () => {
                try {
                    // Simulate UPI payment API call
                    const upiResponse = await fetch('http://localhost:5009/api/payments/upi-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            upiId: upiId,
                            amount: finalTotal,
                            bookingData: {
                                room: bookingDetails,
                                guestInfo: formData,
                                checkInDate: bookingDetails.checkInDate,
                                checkOutDate: bookingDetails.checkOutDate,
                                totalAmount: finalTotal
                            }
                        }),
                    });

                    if (upiResponse.ok) {
                        const upiData = await upiResponse.json();
                        handlePaymentSuccess(upiData.booking);
                    } else {
                        handlePaymentError('UPI payment failed. Please try again.');
                    }
                } catch (error) {
                    handlePaymentError('UPI payment failed. Please check your connection and try again.');
                }
            }, 3000); // Simulate UPI processing time
        }
        // Card payment is handled by StripePaymentForm component
    };

    const handlePaymentSuccess = (booking) => {
        setPaymentStatus('success');
        setBookingId(booking._id);
        setCurrentStep(5);
    };

    const handlePaymentError = (error) => {
        setPaymentStatus('failed');
        setCurrentStep(5);
    };

    const handleRetryPayment = () => {
        setPaymentStatus(null);
        setCurrentStep(3);
    };

    const handleChangePaymentMethod = () => {
        setPaymentStatus(null);
        setPaymentMethod("");
        setCurrentStep(2);
    };

    const calculateNights = () => {
        if (bookingDetails.checkInDate && bookingDetails.checkOutDate) {
            const checkIn = new Date(bookingDetails.checkInDate);
            const checkOut = new Date(bookingDetails.checkOutDate);
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 1;
    };

    const totalNights = calculateNights();
    const finalTotal = bookingDetails.totalPrice * totalNights;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar setScreen={setScreen} activePage="booking" />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <button
                    className="text-cyan-600 hover:text-cyan-800 cursor-pointer transition flex items-center gap-2"
                    onClick={() => setScreen("home")}
                >
                    ← Back to Hotels
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Progress Indicator */}
                {currentStep < 5 && (
                    <div className="mb-8">
                        <div className="flex justify-center items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-cyan-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                1
                            </div>
                            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-cyan-600' : 'bg-gray-300'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-cyan-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                2
                            </div>
                            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-cyan-600' : 'bg-gray-300'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 3 ? 'bg-cyan-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                3
                            </div>
                        </div>
                        <div className="flex justify-center mt-2 text-sm text-gray-600">
                            <span className={currentStep === 1 ? 'font-semibold' : ''}>Guest Info</span>
                            <span className="mx-8">→</span>
                            <span className={currentStep === 2 ? 'font-semibold' : ''}>Payment Method</span>
                            <span className="mx-8">→</span>
                            <span className={currentStep === 3 ? 'font-semibold' : ''}>Payment</span>
                        </div>
                    </div>
                )}

                {/* Step 1: Guest Information */}
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Booking Summary */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">Hotel:</span>
                                    <span>{bookingDetails.hotel?.name || bookingDetails.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Location:</span>
                                    <span>{bookingDetails.hotel?.location || bookingDetails.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Room Type:</span>
                                    <span>{bookingDetails.roomType?.name || bookingDetails.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Guests:</span>
                                    <span>{bookingDetails.guests}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Check-in:</span>
                                    <span>{bookingDetails.checkInDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Check-out:</span>
                                    <span>{bookingDetails.checkOutDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Nights:</span>
                                    <span>{totalNights}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Price per night:</span>
                                    <span>${bookingDetails.totalPrice}</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span>${finalTotal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Guest Information Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-6">Guest Information</h2>
                            <form onSubmit={handleGuestInfoSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Any special requests or requirements..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition font-semibold"
                                >
                                    Continue to Payment
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Step 2: Payment Method Selection */}
                {currentStep === 2 && (
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-8">Choose Payment Method</h1>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-center text-gray-600 mb-6">
                                Your payment is <span className="font-semibold text-green-600">सुरक्षित (secure)</span> and encrypted.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handlePaymentMethodSelect('upi')}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition flex items-center gap-4"
                                >
                                    <div className="text-2xl">📱</div>
                                    <div className="text-left">
                                        <div className="font-semibold">UPI</div>
                                        <div className="text-sm text-gray-600">Pay via any UPI app using your UPI ID</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handlePaymentMethodSelect('card')}
                                    className="w-full p-4 border-2 border-cyan-500 bg-cyan-50 rounded-lg flex items-center gap-4"
                                >
                                    <div className="text-2xl">💳</div>
                                    <div className="text-left">
                                        <div className="font-semibold">Credit / Debit Card</div>
                                        <div className="text-sm text-gray-600">Secure payment powered by Stripe</div>
                                    </div>
                                </button>
                            </div>

                            <button
                                onClick={() => setCurrentStep(1)}
                                className="w-full mt-6 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition font-semibold"
                            >
                                Back to Guest Information
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Payment Form */}
                {currentStep === 3 && (
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-center mb-8">Complete Payment</h1>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            {paymentMethod === 'upi' && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">📱 UPI Payment</h2>
                                    <p className="text-gray-600 mb-6">
                                        Enter your UPI ID to proceed. After clicking "Pay Now", you will receive a request in your UPI app.
                                    </p>
                                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                placeholder="username@bank"
                                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                                required
                                            />
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-blue-800 mb-2">Popular UPI Apps:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-white px-3 py-1 rounded-full text-sm">Google Pay</span>
                                                <span className="bg-white px-3 py-1 rounded-full text-sm">PhonePe</span>
                                                <span className="bg-white px-3 py-1 rounded-full text-sm">Paytm</span>
                                                <span className="bg-white px-3 py-1 rounded-full text-sm">Amazon Pay</span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                                        >
                                            Pay via UPI - ${finalTotal}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {paymentMethod === 'card' && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">💳 Secure Card Payment</h2>
                                    <p className="text-gray-600 mb-6">
                                        Your payment information is encrypted and secure. Powered by Stripe.
                                    </p>

                                    <Elements stripe={stripePromise}>
                                        <StripePaymentForm
                                            amount={finalTotal}
                                            onSuccess={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                            bookingData={{
                                                room: bookingDetails,
                                                guestInfo: formData,
                                                checkInDate: bookingDetails.checkInDate,
                                                checkOutDate: bookingDetails.checkOutDate,
                                                totalAmount: finalTotal
                                            }}
                                            user={null} // You can pass the logged-in user here
                                        />
                                    </Elements>
                                </div>
                            )}

                            <button
                                onClick={() => setCurrentStep(2)}
                                className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition font-semibold"
                            >
                                 Change Payment Method
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Processing */}
                {currentStep === 4 && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                            <h2 className="text-2xl font-semibold mb-4">Processing Payment...</h2>
                            <p className="text-gray-600">Please wait while we process your payment securely.</p>
                        </div>
                    </div>
                )}

                {/* Step 5: Success/Failure */}
                {currentStep === 5 && (
                    <div className="max-w-2xl mx-auto">
                        {paymentStatus === 'success' && (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="text-6xl mb-4">🎉</div>
                                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                                <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>

                                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                                    <h3 className="text-xl font-semibold mb-4">Booking Details:</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Hotel Name:</span>
                                            <span>{bookingDetails.hotel?.name || bookingDetails.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Check-in:</span>
                                            <span>{bookingDetails.checkInDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Check-out:</span>
                                            <span>{bookingDetails.checkOutDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Booking ID:</span>
                                            <span className="font-mono font-semibold">{bookingId}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6">
                                    A confirmation has been sent to your registered email.
                                </p>
                                <p className="text-lg font-semibold text-cyan-600 mb-6">
                                    Thank you for choosing us! 😊
                                </p>

                                <button
                                    onClick={() => setScreen("home")}
                                    className="bg-cyan-600 text-white py-3 px-8 rounded-lg hover:bg-cyan-700 transition font-semibold"
                                >
                                    Back to Home
                                </button>
                            </div>
                        )}

                        {paymentStatus === 'failed' && (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="text-6xl mb-4">❌</div>
                                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
                                <p className="text-gray-600 mb-6">
                                    Something went wrong while processing your payment.
                                </p>
                                <p className="text-sm text-gray-500 mb-6">
                                    If the amount was deducted, it will be refunded within 5-7 business days.
                                </p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleRetryPayment}
                                        className="flex-1 bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition font-semibold"
                                    >
                                        Retry Payment
                                    </button>
                                    <button
                                        onClick={handleChangePaymentMethod}
                                        className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition font-semibold"
                                    >
                                        Change Payment Method
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}