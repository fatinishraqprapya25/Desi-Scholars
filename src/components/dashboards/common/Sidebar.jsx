import { BookOpen, FileText, FolderOpen, MessageSquare, User, LogOut } from 'lucide-react';

export default function Sidebar({ setActiveSection }) {
    const navItems = [
        { name: 'My Courses', icon: BookOpen, section: 'dashboard' },
        { name: 'Practice Tests', icon: FileText, section: 'dashboard' },
        { name: 'Resources', icon: FolderOpen, section: 'dashboard' },
        { name: 'Messages', icon: MessageSquare, section: 'dashboard' },
        { name: 'Profile', icon: User, section: 'profile' },
        { name: 'Logout', icon: LogOut, section: 'logout' }, // Logout can be a simple action
    ];

    return (
        <aside className="w-full lg:w-64 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg p-4 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">Student Dashboard</h1>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="mb-3">
                                <button
                                    onClick={() => setActiveSection(item.section)}
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