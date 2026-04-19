import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Vlog({ setScreen }) {
    const videos = [
        {
            id: 1,
            title: "A Day in Paradise: Ocean View Resort Experience",
            description: "Join us as we explore the breathtaking Ocean View Resort in Miami, featuring private beaches, world-class dining, and unforgettable sunsets.",
            thumbnail: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600",
            duration: "5:32",
            views: "12.5K",
            date: "2024-03-15"
        },
        {
            id: 2,
            title: "Mountain Lodge Winter Wonderland",
            description: "Experience the magic of Aspen at our Mountain Lodge. From skiing adventures to cozy fireplace evenings, discover why this is a winter paradise.",
            thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
            duration: "7:18",
            views: "8.9K",
            date: "2024-02-28"
        },
        {
            id: 3,
            title: "Urban Luxury: San Francisco Boutique Hotel Tour",
            description: "Take a virtual tour of our Urban Boutique Hotel in the heart of San Francisco, featuring rooftop bars, city views, and modern elegance.",
            thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
            duration: "6:45",
            views: "15.2K",
            date: "2024-02-10"
        },
        {
            id: 4,
            title: "Behind the Scenes: Hotel Service Excellence",
            description: "Meet our dedicated team and learn about the meticulous attention to detail that makes every Luxury Hotels stay extraordinary.",
            thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
            duration: "8:21",
            views: "6.7K",
            date: "2024-01-25"
        },
        {
            id: 5,
            title: "Culinary Journey: World-Class Dining Experiences",
            description: "Embark on a gastronomic adventure through our signature restaurants, featuring cuisine from around the globe prepared by master chefs.",
            thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
            duration: "9:15",
            views: "11.3K",
            date: "2024-01-12"
        },
        {
            id: 6,
            title: "Spa & Wellness: Ultimate Relaxation Guide",
            description: "Discover our comprehensive wellness facilities, from rejuvenating spa treatments to fitness centers designed for peak performance.",
            thumbnail: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600",
            duration: "6:58",
            views: "9.4K",
            date: "2023-12-20"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar setScreen={setScreen} activePage="vlog" />

            {/* Vlog Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Luxury Hotels Vlog</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Behind the scenes, travel tips, and exclusive experiences from around the world
                    </p>
                </div>
            </div>

            {/* Featured Video */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
                    <div className="relative">
                        <img
                            src={videos[0].thumbnail}
                            alt={videos[0].title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-2xl">▶</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Featured Video</h2>
                                <p className="text-lg">{videos[0].duration}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                            {videos[0].duration}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3">{videos[0].title}</h3>
                        <p className="text-gray-600 mb-4">{videos[0].description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <span>👁 {videos[0].views} views</span>
                            <span className="mx-2">•</span>
                            <span>{videos[0].date}</span>
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <h2 className="text-3xl font-bold text-center mb-8">More Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.slice(1).map((video) => (
                        <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center">
                                        <span className="text-white text-xl">▶</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{video.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{video.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>👁 {video.views}</span>
                                    <span>{video.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subscribe Section */}
            <div className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Subscribe to our vlog for exclusive behind-the-scenes content, travel tips, and special offers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                        />
                        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}