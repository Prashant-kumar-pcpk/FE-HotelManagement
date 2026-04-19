import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About({ setScreen }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar setScreen={setScreen} activePage="about" />

            {/* About Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-6">About Luxury Hotels</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the epitome of luxury and comfort at Luxury Hotels, where every stay becomes an unforgettable experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                        <p className="text-gray-700 text-lg mb-4">
                            Founded in 2020, Luxury Hotels has been redefining hospitality excellence across the globe.
                            Our commitment to providing unparalleled service and creating memorable experiences has made us
                            a leader in the luxury hospitality industry.
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                            We believe that every guest deserves to feel special, which is why we meticulously curate
                            every aspect of your stay - from the moment you arrive until the time you depart.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Our diverse portfolio of properties spans from bustling city centers to serene beachfront
                            resorts, ensuring there's a perfect Luxury Hotel experience for every traveler.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg text-white">
                        <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="text-yellow-300 mr-3">✓</span>
                                World-class amenities and services
                            </li>
                            <li className="flex items-center">
                                <span className="text-yellow-300 mr-3">✓</span>
                                Prime locations worldwide
                            </li>
                            <li className="flex items-center">
                                <span className="text-yellow-300 mr-3">✓</span>
                                Personalized guest experiences
                            </li>
                            <li className="flex items-center">
                                <span className="text-yellow-300 mr-3">✓</span>
                                24/7 concierge service
                            </li>
                            <li className="flex items-center">
                                <span className="text-yellow-300 mr-3">✓</span>
                                Sustainable luxury practices
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
                            <p className="text-gray-600">Properties Worldwide</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">100K+</h3>
                            <p className="text-gray-600">Happy Guests</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">4.9★</h3>
                            <p className="text-gray-600">Average Rating</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
                            <p className="text-gray-600">Customer Support</p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        To create extraordinary moments and lasting memories by providing exceptional hospitality experiences
                        that exceed expectations, while maintaining our commitment to sustainability and community support.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}