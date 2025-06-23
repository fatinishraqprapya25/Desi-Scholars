import React from 'react';
import { FaBookmark, FaStar, FaUser, FaClock, FaPlay } from 'react-icons/fa';

const CourseCard = ({
    courseName,
    courseImage,
    instructorName,
    instructorAvatarUrl,
    ratingValue,
    reviewCount,
    studentCount,
    duration,
    tags,
    price
}) => {
    const accentPurple = '#8A4AF8';
    const defaultAvatar = 'https://surli.cc/onzxll';

    const handleEnrollClick = () => {
        // Navigate to the course details page
        window.location.href = "/courses/1221";
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-500 hover:border-white">
            {/* Course Image Section */}
            <div className="relative">
                <img src={courseImage} alt={courseName} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-xl font-bold p-2 text-center [text-shadow:_0_1px_5px_rgb(0_0_0_/_40%)]">
                    </span>
                </div>
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
                    <span className="font-semibold text-gray-800">{ratingValue ? ratingValue.toFixed(2) : "3.5"}</span>
                    <span className="text-gray-500 ml-1">({500})</span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {courseName}
                </h3>

                {/* Students and Duration */}
                <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
                    <div className="flex items-center">
                        <FaUser className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{studentCount ? studentCount : 200}</span>
                    </div>
                    <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{duration}</span>
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

                {/* Price and Enroll now Button */}
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{price ? price + " TK" : "Free"}</span>
                    <button
                        style={{
                            color: accentPurple,
                            borderColor: accentPurple,
                            backgroundColor: 'white'
                        }}
                        className="flex items-center px-4 py-2 border rounded-md transition-all duration-200 shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 cursor-pointer"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = accentPurple;
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = accentPurple;
                        }}
                        onClick={handleEnrollClick}
                        aria-label="Enroll now"
                    >
                        <FaPlay className="w-4 h-4 mr-2" />
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
