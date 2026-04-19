import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center md:justify-start">
                        <img
                            src="/pk-luxury hotels.png"
                            alt="PK Luxury Hotels Logo"
                            className="h-20 object-contain rounded-full"
                        />
                    </div>

                    {/* Links Section */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
                            <li><a href="/" className="hover:text-yellow-400 transition">About Us</a></li>
                            <li><a href="/" className="hover:text-yellow-400 transition">Rooms</a></li>
                            <li><a href="/" className="hover:text-yellow-400 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm mb-2">Email: info@pkluxuryhotels.com</p>
                        <p className="text-sm mb-2">Phone: +1-800-LUXURY-1</p>
                        <p className="text-sm">Address: 123 Luxury Lane, Hotel City</p>
                    </div>
                </div>

                <hr className="border-gray-600 mb-4" />

                <div className="text-center">
                    <p className="text-sm">&copy; 2026 PK Luxury Hotels. PRASHANT_KUMAR All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
