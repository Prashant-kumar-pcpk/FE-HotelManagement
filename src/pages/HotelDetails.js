import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HotelDetails({ setScreen, selectedHotel }) {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [roomType, setRoomType] = useState("standard");

    // Check if this is room data (has size property) or hotel data (has location property)
    const isRoom = selectedHotel && selectedHotel.size;

    const roomTypes = isRoom ? [
        { id: "standard", name: selectedHotel.name, price: selectedHotel.price, description: `Comfortable ${selectedHotel.name} with all amenities` }
    ] : [
        { id: "standard", name: "Standard Room", price: selectedHotel.price, description: "Comfortable room with basic amenities" },
        { id: "deluxe", name: "Deluxe Room", price: selectedHotel.price + 50, description: "Spacious room with premium amenities" },
        { id: "suite", name: "Suite", price: selectedHotel.price + 100, description: "Luxury suite with separate living area" }
    ];

    const selectedRoom = roomTypes.find(room => room.id === roomType);
    const totalPrice = selectedRoom ? selectedRoom.price : selectedHotel.price;

    const handleBooking = () => {
        if (!checkInDate || !checkOutDate) {
            alert("Please select check-in and check-out dates");
            return;
        }

        // Navigate to booking page with all details
        setScreen("booking", {
            hotel: selectedHotel,
            checkInDate,
            checkOutDate,
            guests,
            roomType: selectedRoom,
            totalPrice
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar setScreen={setScreen} activePage="" transparent={false} />

            {/* Hotel/Room Details */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hotel Image */}
                    <div className="lg:col-span-1">
                        <img
                            src={selectedHotel.image}
                            alt={selectedHotel.name}
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Hotel Info & Booking */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h1>
                            {isRoom ? (
                                <div className="text-gray-600 text-lg mb-4 space-y-1">
                                    <p>📐 {selectedHotel.size}</p>
                                    <p>🛏️ {selectedHotel.beds}</p>
                                    <p>👥 {selectedHotel.capacity}</p>
                                </div>
                            ) : (
                                <p className="text-xl text-gray-600 mb-4">{selectedHotel.location}</p>
                            )}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl font-bold text-blue-600">${selectedHotel.price}/night</span>
                                {!isRoom && <span className="text-yellow-500 text-xl">★ {selectedHotel.rating}</span>}
                            </div>
                            {isRoom ? (
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Amenities:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedHotel.amenities.map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-700 text-lg">{selectedHotel.description}</p>
                            )}
                        </div>

                        {/* Booking Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4">Book Your Stay</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                                    <input
                                        type="date"
                                        value={checkInDate}
                                        onChange={(e) => setCheckInDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                                    <input
                                        type="date"
                                        value={checkOutDate}
                                        onChange={(e) => setCheckOutDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min={checkInDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value={1}>1 Guest</option>
                                    <option value={2}>2 Guests</option>
                                    <option value={3}>3 Guests</option>
                                    <option value={4}>4 Guests</option>
                                </select>
                            </div>

                            {!isRoom && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                                    <select
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {roomTypes.map(room => (
                                            <option key={room.id} value={room.id}>
                                                {room.name} - ${room.price}/night
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-sm text-gray-600 mt-1">{selectedRoom?.description}</p>
                                </div>
                            )}

                            <div className="bg-gray-50 p-4 rounded-md mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total Price:</span>
                                    <span className="text-2xl font-bold text-blue-600">${totalPrice}/night</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                                Proceed to Booking
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hotel Amenities */}
                <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-6">Hotel Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedHotel.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span>{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}