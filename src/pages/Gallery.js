import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Gallery({ setScreen }) {
    const galleryImages = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkRlbHV4ZSBTdWl0ZTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MzY2ZjEiIGZvbnQtc2l6ZT0iMTYiPkx1eHVyeSBIb3RlbCBSb29tPC90ZXh0Pgo8L3N2Zz4=",
            category: "Rooms",
            title: "Deluxe Suite"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkV4ZWN1dGl2ZSBTdWl0ZTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MzY2ZjEiIGZvbnQtc2l6ZT0iMTYiPkJ1c2luZXNzIENsYXNzPC90ZXh0Pgo8L3N2Zz4=",
            category: "Rooms",
            title: "Executive Suite"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1578662996442-48a792e24d32?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkZpbmUgRGluaW5nPC90ZXh0Pgo8dGV4dCB4PSIzMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZmMSIgZm9udC1zaXplPSIxNiI+UmVzdGF1cmFudDwvdGV4dD4KPC9zdmc+",
            category: "Dining",
            title: "Fine Dining Restaurant"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkx1eHVyeSBTcGE8L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM2NmYxIiBmb250LXNpemU9IjE2Ij5SZWxheGF0aW9uICYgV2VsbG5lc3M8L3RleHQ+Cjwvc3ZnPg==",
            category: "Spa",
            title: "Luxury Spa"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkluZmluaXR5IFBvb2w8L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM2NmYxIiBmb250LXNpemU9IjE2Ij5PdXRkb29yIFJlbGF4YXRpb248L3RleHQ+Cjwvc3ZnPg==",
            category: "Pool",
            title: "Infinity Pool"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkdyYW5kIExvYmJ5PC90ZXh0Pgo8dGV4dCB4PSIzMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZmMSIgZm9udC1zaXplPSIxNiI+RWxlZ2FudCBFbnRyYW5jZTwvdGV4dD4KPC9zdmc+",
            category: "Lobby",
            title: "Grand Lobby"
        },
        {
            id: 7,
            src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPlByZXNpZGVudGlhbCBTdWl0ZTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MzY2ZjEiIGZvbnQtc2l6ZT0iMTYiPlVsdGltYXRlIEx1eHVyeTwvdGV4dD4KPC9zdmc+",
            category: "Rooms",
            title: "Presidential Suite"
        },
        {
            id: 8,
            src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPlByaXZhdGUgQmVhY2g8L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM2NmYxIiBmb250LXNpemU9IjE2Ij5FeGNsdXNpdmUgQWNjZXNzPC90ZXh0Pgo8L3N2Zz4=",
            category: "Beach",
            title: "Private Beach"
        },
        {
            id: 9,
            src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk1vdW50YWluIFZpZXc8L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM2NmYxIiBmb250LXNpemU9IjE2Ij5TY2VuaWMgTGFuZHNjYXBlPC90ZXh0Pgo8L3N2Zz4=",
            category: "Mountain",
            title: "Mountain View"
        },
        {
            id: 10,
            src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPlBlbnRob3VzZSBTdWl0ZTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MzY2ZjEiIGZvbnQtc2l6ZT0iMTYiPlRvcCBGbG9vciBMdXh1cnk8L3RleHQ+Cjwvc3ZnPg==",
            category: "Rooms",
            title: "Penthouse Suite"
        },
        {
            id: 11,
            src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkdhcmRlbiBWaWV3PC90ZXh0Pgo8dGV4dCB4PSIzMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZmMSIgZm9udC1zaXplPSIxNiI+U2VyZW5lIFBlYWNlPC90ZXh0Pgo8L3N2Zz4=",
            category: "Nature",
            title: "Garden View"
        },
        {
            id: 12,
            src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
            fallbackSrc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkNpdHkgU2t5bGluZTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MzY2ZjEiIGZvbnQtc2l6ZT0iMTYiPlVyYmFuIFZpZXc8L3RleHQ+Cjwvc3ZnPg==",
            category: "City",
            title: "City Skyline View"
        }
    ];

    const categories = ["All", "Rooms", "Dining", "Spa", "Pool", "Beach", "Mountain", "City"];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageErrors, setImageErrors] = useState(new Set());
    const [loadingImages, setLoadingImages] = useState(new Set());

    const filteredImages = selectedCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    const [currentImageSrc, setCurrentImageSrc] = useState({});

    const handleImageError = (imageId) => {
        setImageErrors(prev => new Set([...prev, imageId]));
        setLoadingImages(prev => {
            const newLoading = new Set(prev);
            newLoading.delete(imageId);
            return newLoading;
        });
        // Try fallback image
        const image = galleryImages.find(img => img.id === imageId);
        if (image && image.fallbackSrc && !currentImageSrc[imageId]) {
            setCurrentImageSrc(prev => ({
                ...prev,
                [imageId]: image.fallbackSrc
            }));
        }
    };

    const handleImageLoad = (imageId) => {
        setImageErrors(prev => {
            const newErrors = new Set(prev);
            newErrors.delete(imageId);
            return newErrors;
        });
        setLoadingImages(prev => {
            const newLoading = new Set(prev);
            newLoading.delete(imageId);
            return newLoading;
        });
    };

    const handleImageLoadStart = (imageId) => {
        setLoadingImages(prev => new Set([...prev, imageId]));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar setScreen={setScreen} activePage="gallery" transparent={false} />

            {/* Gallery Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-4">
                        Explore the beauty and luxury of our world-class properties
                    </p>
                    <p className="text-sm opacity-90">
                        Note: Images may take a moment to load. If external images don't load, beautiful placeholders will be shown automatically.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition ${
                                selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => setSelectedImage(image)}
                        >
                            {imageErrors.has(image.id) ? (
                                <div className="w-full h-72 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="text-4xl mb-2">🏨</div>
                                        <p className="text-lg font-semibold">{image.title}</p>
                                        <p className="text-sm opacity-90">{image.category}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageErrors(prev => {
                                                    const newErrors = new Set(prev);
                                                    newErrors.delete(image.id);
                                                    return newErrors;
                                                });
                                                handleImageLoadStart(image.id);
                                                setCurrentImageSrc(prev => ({
                                                    ...prev,
                                                    [image.id]: image.src
                                                }));
                                            }}
                                            className="mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-xs hover:bg-gray-100 transition"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </div>
                            ) : loadingImages.has(image.id) ? (
                                <div className="w-full h-76 bg-gray-200 flex items-center justify-center animate-pulse">
                                    <div className="text-center text-gray-500">
                                        <div className="text-4xl mb-2">⏳</div>
                                        <p className="text-sm">Loading...</p>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={currentImageSrc[image.id] || image.src}
                                    alt={image.title}
                                    className="w-full h-76 object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={() => handleImageError(image.id)}
                                    onLoad={() => handleImageLoad(image.id)}
                                    onLoadStart={() => handleImageLoadStart(image.id)}
                                />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                                    <p className="text-sm">{image.category}</p>
                                </div>
                            </div>
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {image.category}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl max-h-full">
                        {imageErrors.has(selectedImage.id) ? (
                            <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-lg">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🏨</div>
                                    <p className="text-xl font-semibold">{selectedImage.title}</p>
                                    <p className="text-lg opacity-90">{selectedImage.category}</p>
                                </div>
                            </div>
                        ) : loadingImages.has(selectedImage.id) ? (
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center animate-pulse rounded-lg">
                                <div className="text-center text-gray-500">
                                    <div className="text-6xl mb-4">⏳</div>
                                    <p className="text-lg">Loading image...</p>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={currentImageSrc[selectedImage.id] || selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-full object-contain"
                                onError={() => handleImageError(selectedImage.id)}
                                onLoadStart={() => handleImageLoadStart(selectedImage.id)}
                            />
                        )}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            ✕
                        </button>
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded">
                            <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                            <p className="text-sm">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}