import { BookOpen, FileText, FolderOpen, MessageSquare, User, LogOut, XCircle } from 'lucide-react';

// Sidebar Component
export default function Sidebar({ setActiveSection, isOpenSideBar, toggleSidebar }) {
    const navItems = [
        { name: 'My Courses', icon: BookOpen, section: 'dashboard' },
        { name: 'Practice Tests', icon: FileText, section: 'dashboard' },
        { name: 'Resources', icon: FolderOpen, section: 'dashboard' },
        { name: 'Messages', icon: MessageSquare, section: 'dashboard' },
        { name: 'Profile', icon: User, section: 'profile' },
        { name: 'Logout', icon: LogOut, section: 'logout' }, // Logout can be a simple action
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg p-4 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpenSideBar ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:w-64 lg:self-start lg:h-auto`}
        >
            <div className="flex justify-end lg:hidden">
                <button onClick={toggleSidebar} className="p-2 text-white focus:outline-none">
                    <XCircle className="h-6 w-6" />
                </button>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">Student Dashboard</h1>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="mb-3">
                                <button
                                    onClick={() => { setActiveSection(item.section); toggleSidebar(); }} // Close sidebar on navigation
                                    className="w-full flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    <span className="text-lg font-medium">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="mt-8 text-center text-sm text-blue-200">
                <p>&copy; 2024 Student Portal</p>
            </div>
        </aside>
    );
}
