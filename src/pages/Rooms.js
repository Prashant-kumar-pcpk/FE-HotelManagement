import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Rooms({ setScreen }) {
    const rooms = [
        {
            id: 1,
            name: "Deluxe King Room",
            price: 299,
            size: "35 m²",
            beds: "1 King Bed",
            capacity: "2 Guests",
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500",
            amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "City View"]
        },
        {
            id: 2,
            name: "Executive Suite",
            price: 449,
            size: "65 m²",
            beds: "1 King Bed + Sofa Bed",
            capacity: "4 Guests",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
            amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "Living Area", "Work Desk"]
        },
        {
            id: 3,
            name: "Presidential Suite",
            price: 699,
            size: "120 m²",
            beds: "1 King Bed + 2 Single Beds",
            capacity: "6 Guests",
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
            amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "Private Balcony", "Jacuzzi", "Dining Area"]
        },
        {
            id: 4,
            name: "Ocean View Room",
            price: 379,
            size: "40 m²",
            beds: "2 Queen Beds",
            capacity: "4 Guests",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
            amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "Ocean View", "Balcony"]
        },
        {
            id: 5,
            name: "Mountain View Cabin",
            price: 329,
            size: "45 m²",
            beds: "1 Queen Bed + Sofa Bed",
            capacity: "4 Guests",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
            amenities: ["Free WiFi", "Fireplace", "Mini Bar", "Room Service", "Mountain View", "Private Deck"]
        },
        {
            id: 6,
            name: "Penthouse Suite",
            price: 899,
            size: "200 m²",
            beds: "1 King Bed + 2 Queen Beds",
            capacity: "8 Guests",
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500",
            amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "Private Terrace", "Jacuzzi", "Chef's Kitchen", "Panoramic Views"]
        }
    ];

    const handleRoomSelect = (room) => {
        setScreen("hotelDetails", room);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar setScreen={setScreen} activePage="rooms" transparent={false} />

            {/* Rooms Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Our Luxury Rooms</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Experience unparalleled comfort in our meticulously designed rooms and suites
                    </p>
                </div>
            </div>

            {/* Rooms Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => handleRoomSelect(room)}
                        >
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                <div className="text-gray-600 text-sm mb-3 space-y-1">
                                    <p>📐 {room.size}</p>
                                    <p>🛏️ {room.beds}</p>
                                    <p>👥 {room.capacity}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-2xl font-bold text-blue-600">${room.price}</span>
                                    <span className="text-sm text-gray-500">per night</span>
                                </div>
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Amenities:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {room.amenities.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                {amenity}
                                            </span>
                                        ))}
                                        {room.amenities.length > 3 && (
                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                +{room.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click when button is clicked
                                        handleRoomSelect(room);
                                    }}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Book your perfect room today and discover what makes our accommodations truly exceptional.
                    </p>
                    <button
                        className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition"
                        onClick={() => setScreen("home")}
                    >
                        View All Hotels
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}