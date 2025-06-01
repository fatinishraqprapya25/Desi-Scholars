import { Link } from 'react-router-dom';
import {
    BookOpen,
    FileText,
    FolderOpen,
    MessageSquare,
    User,
    LogOut,
    XCircle,
} from 'lucide-react';

export default function Sidebar({ isOpenSideBar, toggleSidebar }) {
    const navItems = [
        { name: 'Dashboard', icon: BookOpen, path: '/dashboard/' },
        { name: 'My Courses', icon: BookOpen, path: '/dashboard/mycourses' },
        { name: 'Practice Tests', icon: FileText, path: '/dashboard/practice' },
        { name: 'Resources', icon: FolderOpen, path: '/dashboard/resources' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
        { name: 'Logout', icon: LogOut, path: '/logout' },
    ];

    return (
        <div style={{ position: "fixed", top: "12%" }}
            className={`
         left-0 z-50 w-64 h-screen bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpenSideBar ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}
        >
            {/* Mobile close button */}
            <div className="flex justify-end p-4 lg:hidden">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <XCircle className="h-6 w-6" />
                </button>
            </div>

            {/* Sidebar content */}
            <div className="h-full flex flex-col justify-between px-4 pb-4 overflow-hidden">
                {/* Header & Navigation */}
                <div>
                    <nav>
                        <ul>
                            {navItems.map((item) => (
                                <li key={item.name} className="mb-3">
                                    <Link
                                        to={item.path}
                                        onClick={toggleSidebar}
                                        className="w-full flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        <span className="text-lg font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-blue-200">
                    <p>&copy; 2024 Student Portal</p>
                </div>
            </div>
        </div>
    );
}
