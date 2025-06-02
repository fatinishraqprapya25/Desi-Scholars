import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import {
    LayoutDashboard, // More fitting icon for Dashboard
    BookOpen,
    FileText,
    FolderOpen,
    MessageSquare,
    User,
    LogOut,
    X, // Changed XCircle to X for a cleaner close icon
    BarChart2 // Added a new icon for Analytics/Progress
} from 'lucide-react';

export default function Sidebar({ isOpenSideBar, toggleSidebar }) {
    const location = useLocation(); // Get current path

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }, // Adjusted path for consistency
        { name: 'My Courses', icon: BookOpen, path: '/dashboard/mycourses' },
        { name: 'Practice Tests', icon: FileText, path: '/dashboard/practice' },
        { name: 'My Progress', icon: BarChart2, path: '/dashboard/progress' }, // Added a new item
        { name: 'Resources', icon: FolderOpen, path: '/dashboard/resources' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    const bottomNavItems = [
        { name: 'Logout', icon: LogOut, path: '/logout' },
    ];

    // --- IMPORTANT: Adjust this value based on your HEADER's actual height ---
    // The previous header had py-4 (16px top + 16px bottom = 32px vertical padding)
    // plus icon height (e.g., 24px for h-6). A safe bet is often 64px or 72px.
    // Let's use 72px (4.5rem) as a common header height for modern designs.
    const HEADER_HEIGHT_REM = '4.5rem'; // Equivalent to 72px

    return (
        <>
            {/* Overlay for mobile sidebar when open */}
            {isOpenSideBar && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" // z-30 for overlay
                ></div>
            )}

            <div
                className={`
                    fixed left-0 z-40 // Sidebar is fixed, above content but below header
                    w-64 // Fixed width for the sidebar
                    top-[${HEADER_HEIGHT_REM}] // Starts precisely below the fixed header
                    h-[calc(100vh-${HEADER_HEIGHT_REM})] // Occupies full viewport height minus header height

                    // Appearance
                    bg-white border-r border-gray-200 shadow-xl lg:shadow-none // Light background, subtle border and shadow
                    transform transition-transform duration-300 ease-in-out // For slide-in/out animation
                    ${isOpenSideBar ? 'translate-x-0' : '-translate-x-full'} // Mobile show/hide animation
                    lg:translate-x-0 lg:block // Always visible on desktop and takes up space
                    pb-4 lg:pb-0 // Padding at bottom for mobile to allow scrolling top-0 md:top-[12%] pt-3
                `}
            >
                {/* Sidebar content container (flex column to push footer down) */}
                <div className="h-full flex flex-col pt-4 lg:pt-0 pb-4 lg:pb-0 relative">
                    {/* Mobile close button - positioned at top right within the sidebar */}
                    <div className="flex justify-end p-4 lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Close sidebar"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation Links (flex-grow to push footer down) */}
                    <nav className="flex-grow px-4 overflow-y-auto custom-scrollbar">
                        <ul>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={item.name} className="mb-2">
                                        <Link
                                            to={item.path}
                                            onClick={toggleSidebar} // Close sidebar on click for mobile
                                            className={`w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
                                                ${isActive ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border-r-4 border-blue-600' : ''}
                                            `}
                                        >
                                            <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                                            <span className="text-base">{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Bottom Navigation (Logout) */}
                    <nav className="px-4 mt-6 border-t border-gray-100 pt-4">
                        <ul>
                            {bottomNavItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={toggleSidebar}
                                        className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                                    >
                                        <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                                        <span className="text-base">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 mt-6 px-4">
                        <p>&copy; 2024 EduHub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    );
}