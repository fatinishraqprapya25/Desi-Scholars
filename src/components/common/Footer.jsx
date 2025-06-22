import {
    FaCcAmex,
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Importing Link

const Footer = () => {
    const accentPurple = '#8A4AF8';

    return (
        <footer className="bg-gradient-to-br from-[#EAEFFF] to-[#E0D7FA] border-t border-gray-200 text-gray-700 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">

                {/* Logo & Intro */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">DSAT Scholars</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        DSAT Scholars is a student-led platform offering free SAT prep, college admissions guidance, and study abroad support to Bangladeshi students from all backgrounds.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><Link to="/" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Home</Link></li>
                        <li><Link to="/courses" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Courses</Link></li>
                        <li><Link to="/about" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>About Us</Link></li>
                        <li><Link to="/blog" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Blog</Link></li>
                        <li><Link to="/practice-tests" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Practice Tests</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h3>
                    <p className="text-sm text-gray-700 mb-2">123 Learning Road, Knowledge City</p>
                    <p className="text-sm text-gray-700">
                        Email: <a href="mailto:info@yourcompany.com" className={`text-gray-800 hover:text-[${accentPurple}] hover:underline transition-colors duration-200`}>info@yourcompany.com</a>
                    </p>
                    <p className="text-sm text-gray-700">
                        Phone: <a href="tel:+1234567890" className={`text-gray-800 hover:text-[${accentPurple}] hover:underline transition-colors duration-200`}>+1 234 567 890</a>
                    </p>
                </div>

                {/* Social & Payments */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
                    <div className="flex space-x-4 mb-6 text-xl text-gray-600">
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaFacebookF /></a>
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaTwitter /></a>
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaInstagram /></a>
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaLinkedinIn /></a>
                    </div>

                    <h4 className="text-md font-medium mb-2 text-gray-800">We Accept</h4>
                    <div className="flex space-x-4 text-3xl text-gray-600">
                        <FaCcVisa className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                        <FaCcMastercard className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                        <FaCcPaypal className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                        <FaCcAmex className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
                &copy; {new Date().getFullYear()} DSAT Scholars. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
