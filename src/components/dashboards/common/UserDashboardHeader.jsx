import { Bell, User, Menu, Home, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

function UserDashboardHeader({ setActiveSection, toggleSidebar, isSidebarOpen, role }) {

    const headerBg = isSidebarOpen
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200'
        : 'bg-gradient-to-r from-blue-100 to-indigo-100';

    let dashboardHomePath = "";
    if (role === "teacher") {
        dashboardHomePath = "/teacher/dashboard";
    } else if (role === "admin") {
        dashboardHomePath = "/admin/dashboard";
    } else {
        dashboardHomePath = "/dashboard";
    }

    return (
        <header className={`flex justify-between items-center py-4 px-6 fixed w-full z-30 transition-all duration-300 ${headerBg}`}>
            <div className="flex items-center gap-4 lg:gap-8">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* EduHub Logo */}
                <div className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-indigo-600">DESH</span>
                    <span className="text-slate-700"> Scholar</span>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <Link to={`${dashboardHomePath}`}>
                        <button
                            className={`py-2 px-3 rounded-lg text-gray-700 text-sm font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200
                            ${setActiveSection === 'courses' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : ''}`}
                        >
                            <Layers className="inline-block w-4 h-4 mr-2" /> Dashboard
                        </button></Link>
                </nav>
            </div>


            {/* Right Side: Notification and User Profile */}
            <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Notification Icon */}
                <button
                    className="relative p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="View notifications"
                >
                    <Bell className="h-6 w-6" />
                    {/* Notification Dot - change bg-red-400 to a more subtle alert color if desired */}
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500 animate-pulse"></span>
                </button>

                {/* User Profile Icon/Avatar */}
                <button
                    onClick={() => { setActiveSection('profile'); /* setIsSidebarOpen(false); // Only if you want to force close on profile click */ }}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
                    aria-label="Go to profile settings"
                >
                    <User className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}

export default UserDashboardHeader;