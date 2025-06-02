import { Bell, User, Menu, Home, Layers } from 'lucide-react'; // Added Home and Layers for more options

function UserDashboardHeader({ setActiveSection, toggleSidebar, isSidebarOpen }) {
    // Determine header background based on sidebar state for a cohesive feel
    const headerBg = isSidebarOpen
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200' // Lighter when sidebar is open
        : 'bg-gradient-to-r from-blue-100 to-indigo-100'; // Slightly darker with shadow when sidebar is closed

    return (
        <header className={`flex justify-between items-center py-4 px-6 fixed w-full z-30 transition-all duration-300 ${headerBg}`}>
            {/* Left Side: Hamburger/Close Menu, Logo, and Desktop Nav */}
            <div className="flex items-center gap-4 lg:gap-8">
                {/* Hamburger/Close Button for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* EduHub Logo */}
                <div className="flex items-center">
                    <button
                        onClick={() => { setActiveSection('dashboard'); /* setIsSidebarOpen(false); // Only if you want to force close on desktop logo click */ }}
                        className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-0"
                        aria-label="Go to Dashboard"
                    >
                        <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">EduHub</span>
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <button
                        onClick={() => setActiveSection('dashboard')}
                        className={`py-2 px-3 rounded-lg text-gray-700 text-sm font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200
                            ${setActiveSection === 'dashboard' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : ''}`}
                    >
                        <Home className="inline-block w-4 h-4 mr-2" /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveSection('courses')}
                        className={`py-2 px-3 rounded-lg text-gray-700 text-sm font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200
                            ${setActiveSection === 'courses' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : ''}`}
                    >
                        <Layers className="inline-block w-4 h-4 mr-2" /> Courses
                    </button>
                    {/* Add more desktop nav items as needed */}
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