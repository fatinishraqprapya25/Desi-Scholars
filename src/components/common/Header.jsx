import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import validateToken from "../../utils/ValidateToken";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const checkLogin = async () => {
            const isLogged = await validateToken();
            setLoggedIn(isLogged);
        };
        checkLogin();
    }, []);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses" },
        { name: "Resources", path: "/resources" },
        { name: "Practice Test", path: "/practice-test" },
        { name: "Mock", path: "/mock" },
        { name: "About Us", path: "/about" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className={`z-50 w-full bg-white transition-all duration-500 ${isSticky ? "fixed top-0 py-3 shadow-md" : "relative py-6"
                }`}
        >
            <Container>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl md:text-2xl font-bold tracking-tight">
                        <span className="text-indigo-600">DESH</span>
                        <span className="text-slate-700"> Scholar</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 text-slate-700 text-base font-semibold">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-indigo-600 underline underline-offset-4"
                                        : "hover:text-indigo-500 transition-colors duration-150"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4 text-base font-semibold relative" ref={profileRef}>
                        {loggedIn ? (
                            <>
                                <img
                                    src="https://randomuser.me/api/portraits/men/75.jpg"
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow cursor-pointer"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                />
                                {profileOpen && (
                                    <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md py-2 w-48 border border-gray-200 z-50">
                                        {[
                                            { label: "Profile", path: "/dashboard/profile" },
                                            { label: "Dashboard", path: "/dashboard" },
                                            { label: "Practice Tests", path: "/practice-test" },
                                            { label: "Progress", path: "/dashboard/progress" },
                                            { label: "Resources", path: "/resources" },
                                        ].map((item) => (
                                            <NavLink
                                                to={item.path}
                                                key={item.label}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                {item.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="text-slate-700 hover:text-indigo-500 transition-colors"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className="flex flex-col justify-between w-6 h-5 md:hidden z-50 relative"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div
                            className={`h-0.5 bg-slate-700 transition-transform duration-500 ${menuOpen ? "rotate-45 translate-y-2" : ""
                                }`}
                        />
                        <div
                            className={`h-0.5 bg-slate-700 transition-all duration-500 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <div
                            className={`h-0.5 bg-slate-700 transition-transform duration-500 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="flex flex-col gap-4 text-slate-700 text-base font-semibold">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-indigo-600 underline underline-offset-4"
                                        : "hover:text-indigo-500 transition-colors duration-150"
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {!loggedIn ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition text-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (

                            <>
                                <NavLink
                                    to="/dashboard/profile"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/dashboard"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/practice-test"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Practice Tests
                                </NavLink>
                                <NavLink
                                    to="/progress"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Progress
                                </NavLink>
                                <NavLink
                                    to="/resources"
                                    className="hover:text-indigo-500"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Resources
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}
