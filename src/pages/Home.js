import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgImage from "../assets/bgImage.jpg"


export default function Home({ setScreen, user }) {

    // Mock hotel data
    const hotels = [
        {
            id: 1,
            name: "Grand Palace Hotel",
            location: "New York, USA",
            price: 299,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
            description: "Luxury hotel with stunning city views and world-class amenities.",
            amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Room Service", "Spa"]
        },
       
        {
            id: 4,
            name: "Urban Boutique Hotel",
            location: "San Francisco, CA",
            price: 259,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
            description: "Modern boutique hotel in the heart of the city with rooftop bar.",
            amenities: ["Rooftop Bar", "City Views", "Restaurant", "Business Center", "Fitness Center", "Free WiFi"]
        },
    
        {
            id: 6,
            name: "Historic Castle Hotel",
            location: "Edinburgh, Scotland",
            price: 399,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500",
            description: "Historic castle converted into a luxury hotel with modern amenities.",
            amenities: ["Historic Building", "Castle Views", "Restaurant", "Bar", "Spa", "Guided Tours"]
        }
    ];

    // Available rooms data
    const availableRooms = [
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
        }
    ];

    const handleHotelClick = (hotel) => {
        setScreen("hotelDetails", hotel);
    };

    const handleRoomClick = (room) => {
        // Navigate to hotel details with room data
        setScreen("hotelDetails", room);
    };

    const handleHotels = () => {
        // Navigate to the rooms page to show all available hotels/rooms
        setScreen("rooms");
    }

    return(
        <div className="min-h-screen bg-gray-200">
            {/* Hero Section with Background Image */}

             {/* Navbar */}
            <Navbar setScreen={setScreen} activePage="" transparent={false} />

            <div
                className="h-screen bg-cover bg-center relative"
               style={{ backgroundImage: `url(${bgImage})` }} >
                
                <div className="absolute inset-0  bg-opacity-50"></div>

               

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Luxury Hotels</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                        Experience unparalleled comfort and elegance at our world-class hotels
                    </p>
                    <button
                    onClick={() => handleHotels()}
                    className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition">
                        Explore Hotels
                    </button>
                </div>
            </div>

            {/* Hotel Listings Section */}
            <div className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Hotels</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => handleHotelClick(hotel)}
                            >
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                                    <p className="text-gray-600 mb-2">{hotel.location}</p>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                                        <span className="text-yellow-500">★ {hotel.rating}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Available Rooms Section */}
            <div className="py-16 px-6 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Available Rooms</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableRooms.map((room) => (
                            <div
                                key={room.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => handleRoomClick(room)}
                            >
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                    <div className="text-gray-600 text-sm mb-2 space-y-1">
                                        <p>📐 {room.size}</p>
                                        <p>🛏️ {room.beds}</p>
                                        <p>👥 {room.capacity}</p>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-2xl font-bold text-green-600">${room.price}</span>
                                        <span className="text-blue-500 text-sm">per night</span>
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
                                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Rooms Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setScreen("rooms")}
                            className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition font-semibold"
                        >
                            View All Rooms
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}