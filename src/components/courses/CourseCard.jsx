import React from 'react';
import { FaBookmark, FaStar, FaUser, FaClock, FaShoppingCart } from 'react-icons/fa'; // Importing necessary icons

const CourseCard = ({
    title,
    imageUrl,
    instructorName,
    instructorAvatarUrl, // New prop for instructor's image URL
    ratingValue,        // e.g., 5.00 (number)
    reviewCount,        // e.g., 18 (number)
    studentCount,       // e.g., 1177 (number)
    durationText,       // e.g., "10h" (string)
    tags,               // e.g., "No Code, WordPress" (string)
    priceText           // e.g., "999.00৳" (string)
}) => {
    const accentPurple = '#8A4AF8'; // Define accent color for consistency

    // Placeholder for instructor avatar if not provided
    const defaultAvatar = 'https://via.placeholder.com/40'; // A generic placeholder image

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            {/* Course Image Section */}
            <div className="relative">
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
                {/* Image Overlay (visible in the reference image) */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    {/* Placeholder for the Bengali text overlay "ওয়ার্ডপ্রেস কাস্টমাইজেশন" (WordPress Customization) */}
                    {/* If this text is dynamic, pass it as a prop (e.g., overlayText) */}
                    <span className="text-white text-xl font-bold p-2 text-center [text-shadow:_0_1px_5px_rgb(0_0_0_/_40%)]">
                        {/* "ওয়ার্ডপ্রেস কাস্টমাইজেশন" (Example: replace with dynamic prop if needed) */}
                    </span>
                </div>
                {/* Bookmark Icon */}
                <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                    aria-label="Bookmark Course"
                >
                    <FaBookmark className="w-5 h-5" />
                </button>
            </div>

            {/* Course Details Section */}
            <div className="p-4">
                {/* Rating */}
                <div className="flex items-center text-sm mb-2">
                    <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4" />
                        ))}
                    </div>
                    <span className="font-semibold text-gray-800">{ratingValue.toFixed(2)}</span>
                    <span className="text-gray-500 ml-1">({reviewCount})</span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {title}
                </h3>

                {/* Students and Duration */}
                <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
                    <div className="flex items-center">
                        <FaUser className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{studentCount}</span>
                    </div>
                    <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{durationText}</span>
                    </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
                    <img
                        src={instructorAvatarUrl || defaultAvatar}
                        alt={instructorName}
                        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
                    />
                    <div>
                        <p className="text-gray-700 text-sm">
                            By <span className="font-semibold">{instructorName}</span>
                        </p>
                        <p className="text-gray-500 text-xs">{tags}</p>
                    </div>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{priceText}</span>
                    <button
                        className={`flex items-center px-4 py-2 bg-white text-[${accentPurple}] border border-[${accentPurple}] rounded-lg
                                   hover:bg-[${accentPurple}] hover:text-white transition-all duration-200 shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-[${accentPurple}] focus:ring-opacity-75`}
                        aria-label="Add to cart"
                    >
                        <FaShoppingCart className="w-4 h-4 mr-2" />
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;