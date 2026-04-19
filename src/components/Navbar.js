import React from 'react';

const Navbar = ({ setScreen, activePage = "home", transparent = false }) => {
    const navClasses = transparent
        ? "relative z-10 bg-transparent text-white px-6 py-4"
        : "bg-cyan-400 text-white px-6 py-4 shadow-md";

    const getNavItemClasses = (page) => {
        const baseClasses = "hover:text-yellow-400 cursor-pointer transition";
        return activePage === page
            ? `${baseClasses} text-yellow-400`
            : baseClasses;
    };

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <img
                    src="/pk-luxury hotels.png"
                    alt="PK Luxury Hotels Logo"
                    className="h-16 cursor-pointer rounded-full object-contain"
                    onClick={() => setScreen("home")}
                    title="Go to Home"
                />
                <ul className="flex gap-8 text-lg font-medium">
                    <li
                        className={getNavItemClasses("home")}
                        onClick={() => setScreen("home")}
                    >
                        Home
                    </li>
                    <li
                        className={getNavItemClasses("about")}
                        onClick={() => setScreen("about")}
                    >
                        About
                    </li>
                    <li
                        className={getNavItemClasses("rooms")}
                        onClick={() => setScreen("rooms")}
                    >
                        Our Rooms
                    </li>
                    <li
                        className={getNavItemClasses("gallery")}
                        onClick={() => setScreen("gallery")}
                    >
                        Gallery
                    </li>
                    <li
                        className={getNavItemClasses("vlog")}
                        onClick={() => setScreen("vlog")}
                    >
                        Vlog
                    </li>
                    <li
                        className={getNavItemClasses("contact")}
                        onClick={() => setScreen("contact")}
                    >
                        Contact Us
                    </li>
                </ul>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-3xl cursor-pointer hover:bg-red-700 transition"
                    onClick={() => setScreen("login")}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;