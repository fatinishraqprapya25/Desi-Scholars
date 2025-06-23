import { User, Menu, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import AdminDropDown from './dropdowns/AdminDropDown';
import StudentDropDown from './dropdowns/StudentDropDown';

function UserDashboardHeader({ toggleSidebar, isSidebarOpen, role }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const profileRef = useRef(null);

    const headerBg = isSidebarOpen
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200'
        : 'bg-gradient-to-r from-blue-100 to-indigo-100';

    let dashboardHomePath = '';
    if (role === 'teacher') {
        dashboardHomePath = '/teacher/dashboard';
    } else if (role === 'admin') {
        dashboardHomePath = '/admin/dashboard';
    } else {
        dashboardHomePath = '/dashboard';
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header
            className={`flex justify-between items-center py-4 px-6 fixed w-full z-30 transition-all duration-300 ${headerBg}`}
        >
            <div className="flex items-center gap-4 lg:gap-8">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
                    aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-indigo-600">DESH</span>
                    <span className="text-slate-700"> Scholar</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <Link to={dashboardHomePath}>
                        <span className="py-2 px-3 rounded-lg text-gray-700 text-sm font-semibold hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
                            <Layers className="inline-block w-4 h-4 mr-2" />
                            Dashboard
                        </span>
                    </Link>
                </nav>
            </div>

            {/* Right side: profile */}
            <div className="relative flex items-center space-x-3 sm:space-x-4" ref={profileRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
                    aria-label="Profile menu"
                >
                    <User className="h-6 w-6" />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                        {role === "admin" ? <AdminDropDown /> : (
                            role === "teacher" ? <h1>Hi</h1> : <StudentDropDown />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default UserDashboardHeader;
