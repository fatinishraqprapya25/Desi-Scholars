import React from 'react';
import { Bell, User } from 'lucide-react';

function UserDashboardHeader({ setActiveSection }) {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white ">
            {/* Logo and Home Link */}
            <div className="flex items-center">
                <button
                    onClick={() => setActiveSection('dashboard')} // Navigate to dashboard on logo click
                    className="flex items-center text-white hover:text-blue-100 transition-colors duration-200 focus:outline-none"
                >
                    {/* Placeholder for Logo */}
                    <span className="text-3xl font-extrabold tracking-wide">EduHub</span>

                </button>
            </div>

            {/* Notification and User Icons */}
            <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-opacity-70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <Bell className="h-6 w-6 text-white" />
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-400"></span> {/* Notification dot */}
                </button>
                <button
                    onClick={() => setActiveSection('profile')} // Navigate to profile on user icon click
                    className="p-2 rounded-full bg-blue-700 bg-opacity-50 hover:bg-opacity-70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <User className="h-6 w-6 text-white" />
                </button>
            </div>
        </header>
    );
}

export default UserDashboardHeader;
