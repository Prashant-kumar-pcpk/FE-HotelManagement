export default function Landing({ setScreen }) {
    const handleClick = () => {
        setScreen("login");
    };

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center cursor-pointer overflow-hidden"
            style={{
                backgroundImage: `url(/gradient-colored-hotel-banner-template-with-photo_23-2148916706.avif)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
            onClick={handleClick}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                {/* Main Logo/Text */}
                <div className="mb-8">
                    <img
                        src="/pk-luxury hotels.png"
                        alt="PK Luxury Hotels"
                        className="h-48 mx-auto mb-6 object-contain drop-shadow-lg rounded-full bg-transparent"
                    />
                </div>

                {/* Company Name */}
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-wider">
                    Pk-Luxury Hotels
                </h1>

                {/* Tagline */}
                <p className="text-2xl md:text-3xl text-yellow-200 mb-4 drop-shadow-lg font-light">
                    Your Gateway to Luxury
                </p>

                {/* Descriptive Text */}
                <p className="text-lg md:text-xl text-white max-w-2xl mb-12 drop-shadow-lg opacity-90">
                    Experience unparalleled comfort and elegance at world-class hotels
                </p>

                {/* Call to Action */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={handleClick}
                        className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        Get Started
                    </button>

                    {/* <p className="text-white text-sm md:text-base drop-shadow-lg opacity-80 mt-4">
                        Click anywhere to continue →
                    </p> */}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-white text-sm drop-shadow-lg opacity-75">
                        © 2026 Pk-Luxury Hotels. All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>
    );
}
