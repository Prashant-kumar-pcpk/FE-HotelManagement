import { useState } from "react";
import {contactUser} from "../api/api.js"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact({ setScreen }) {
  
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const result = await contactUser(formData);
                console.log(result)

            if(result.success){
                 alert("Message sent to the database successful.");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

            }else{
                alert("Message sent failed!")
            }

        }catch(error){
           console.log(error.message || "Contact Added failed!");
        }
        // Simulate form submission
       
    };

    const contactInfo = [
        {
            icon: "📍",
            title: "Address",
            details: ["123 Luxury Avenue", "New York, NY 10001", "United States"]
        },
        {
            icon: "📞",
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 765-4321"]
        },
        {
            icon: "✉️",
            title: "Email",
            details: ["Email: info@pkluxuryhotels.com", "reservations@pk-luxuryhotels.com"]
        },
        {
            icon: "🕒",
            title: "Business Hours",
            details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar setScreen={setScreen} activePage="contact" />

            {/* Contact Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Get in touch with us for reservations, inquiries, or any questions about your stay
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                We're here to help you plan your perfect stay. Reach out to us through any of the channels below.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="text-3xl mb-4">{info.icon}</div>
                                    <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                                    <div className="space-y-1">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-600">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 p-8 rounded-lg text-center">
                            <div className="text-6xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold mb-2">Find Us</h3>
                            <p className="text-gray-600">Interactive map would be displayed here</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">How do I make a reservation?</h3>
                            <p>You can book directly through our website, call our reservations team, or visit any of our properties.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">What's your cancellation policy?</h3>
                            <p>Cancellation policies vary by rate and property. Please check your confirmation email for specific details.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Do you offer airport transfers?</h3>
                            <p>Yes, airport transfer services are available at select properties. Contact the hotel directly for arrangements.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Are pets allowed?</h3>
                            <p>Pet policies vary by property. Some locations welcome pets with additional fees. Please inquire when booking.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}