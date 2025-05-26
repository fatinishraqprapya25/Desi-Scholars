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

const Footer = () => {
    const accentPurple = '#8A4AF8'; // Consistent with other sections

    return (
        <footer className="bg-gradient-to-br from-[#EAEFFF] to-[#E0D7FA] border-t border-gray-200 text-gray-700 font-sans"> {/* Light gradient background and border */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">

                {/* Logo & Intro */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">YourCompany</h2> {/* Dark heading */}
                    <p className="text-gray-600 text-sm leading-relaxed"> {/* Medium gray for body text */}
                        Empowering learners worldwide with quality education, expert guidance, and practical skills to succeed in the digital world.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3> {/* Dark heading */}
                    <ul className="space-y-2 text-sm text-gray-700"> {/* Dark gray for list items */}
                        <li><a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Home</a></li> {/* Accent purple on hover */}
                        <li><a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Courses</a></li>
                        <li><a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>About Us</a></li>
                        <li><a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Blog</a></li>
                        <li><a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}>Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h3> {/* Dark heading */}
                    <p className="text-sm text-gray-700 mb-2">123 Learning Road, Knowledge City</p> {/* Dark gray */}
                    <p className="text-sm text-gray-700">Email: <a href="mailto:info@yourcompany.com" className={`text-gray-800 hover:text-[${accentPurple}] hover:underline transition-colors duration-200`}>info@yourcompany.com</a></p> {/* Dark text, accent purple on hover */}
                    <p className="text-sm text-gray-700">Phone: <a href="tel:+1234567890" className={`text-gray-800 hover:text-[${accentPurple}] hover:underline transition-colors duration-200`}>+1 234 567 890</a></p> {/* Dark text, accent purple on hover */}
                </div>

                {/* Social & Payments */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3> {/* Dark heading */}
                    <div className="flex space-x-4 mb-6 text-xl text-gray-600"> {/* Medium gray icons */}
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaFacebookF /></a> {/* Accent purple on hover */}
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaTwitter /></a>
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaInstagram /></a>
                        <a href="#" className={`hover:text-[${accentPurple}] transition-colors duration-200`}><FaLinkedinIn /></a>
                    </div>

                    <h4 className="text-md font-medium mb-2 text-gray-800">We Accept</h4> {/* Dark heading */}
                    <div className="flex space-x-4 text-3xl text-gray-600"> {/* Medium gray icons */}
                        <FaCcVisa className={`hover:text-[${accentPurple}] transition-colors duration-200`} /> {/* Accent purple on hover */}
                        <FaCcMastercard className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                        <FaCcPaypal className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                        <FaCcAmex className={`hover:text-[${accentPurple}] transition-colors duration-200`} />
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4"> {/* Medium gray text, light border */}
                &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;