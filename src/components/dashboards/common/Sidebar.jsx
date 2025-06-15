import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import {
    LayoutDashboard, // More fitting icon for Dashboard
    BookOpen,
    FileText,
    FolderOpen,
    MessageSquare,
    User,
    LogOut,
    X,
    BarChart2,
    Users, UserCog, BellRing, Settings,
    ListChecks,
    UserCircle2,
} from 'lucide-react';

export default function Sidebar({ role, isOpenSideBar, toggleSidebar }) {
    const location = useLocation(); // Get current path

    const studentNavItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }, // Adjusted path for consistency
        { name: 'My Courses', icon: BookOpen, path: '/dashboard/mycourses' },
        { name: 'Leader Board', icon: BookOpen, path: '/dashboard/leaderboard' },
        { name: 'Practice Tests', icon: FileText, path: '/dashboard/practicetest' },
        { name: 'My Progress', icon: BarChart2, path: '/dashboard/progress' }, // Added a new item
        { name: 'Resources', icon: FolderOpen, path: '/dashboard/resources' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];
    const adminNavItems = [
        { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Manage Students', icon: Users, path: '/admin/students' },
        { name: 'Manage Teachers', icon: UserCog, path: '/admin/teachers' },
        { name: 'Manage Courses', icon: BookOpen, path: '/admin/courses' },
        { name: 'Manage Practice Tests', icon: FileText, path: '/admin/practicetests' },
        { name: 'Manage Resources', icon: FolderOpen, path: '/admin/resources' },
        { name: 'Payments', icon: FolderOpen, path: '/admin/payments' },
        { name: 'Broadcast Notifications', icon: BellRing, path: '/admin/notifications' },
        { name: 'System Settings', icon: Settings, path: '/admin/settings' },
    ];
    const teacherNavItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
        { name: 'My Courses', icon: BookOpen, path: '/teacher/courses' },
        { name: 'My Students', icon: Users, path: '/teacher/students' },
        { name: 'Grade Assignments', icon: ListChecks, path: '/teacher/assignments/grade' },
        { name: 'Messages', icon: MessageSquare, path: '/teacher/messages' },
        { name: 'My Tests', icon: FolderOpen, path: '/teacher/tests' },
        { name: 'Profile', icon: UserCircle2, path: '/teacher/profile' },
    ];

    let navItems;
    if (role === "admin") {
        navItems = adminNavItems;
    } else if (role === "teacher") {
        navItems = teacherNavItems;
    } else {
        navItems = studentNavItems;
    }

    const bottomNavItems = [
        { name: 'Logout', icon: LogOut, path: '/logout' },
    ];

    const HEADER_HEIGHT_REM = '4.5rem';

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
                    fixed left-0 z-40
                    w-64
                    top-[${HEADER_HEIGHT_REM}]
                    h-[90vh] overflow-y-scroll
                    bg-white border-r border-gray-200 shadow-xl lg:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${isOpenSideBar ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:block
                    flex flex-col
                `}
            >
                {/* Mobile close button */}
                <div className="flex justify-end p-4 lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Close sidebar"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow px-4 overflow-y-auto custom-scrollbar">
                    <ul>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.name} className="mb-2">
                                    <Link
                                        to={item.path}
                                        onClick={toggleSidebar} // Close sidebar on mobile
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
                <nav className="px-4 mt-1 border-t border-gray-100 pt-4">
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
        </>
    );
}
