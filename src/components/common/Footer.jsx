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
    return (
        <footer className="bg-white border-t border-gray-200 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Logo & Intro */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">YourCompany</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Empowering learners worldwide with quality education, expert guidance, and practical skills to succeed in the digital world.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><a href="#" className="hover:text-black">Home</a></li>
                        <li><a href="#" className="hover:text-black">Courses</a></li>
                        <li><a href="#" className="hover:text-black">About Us</a></li>
                        <li><a href="#" className="hover:text-black">Blog</a></li>
                        <li><a href="#" className="hover:text-black">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h3>
                    <p className="text-sm text-gray-700 mb-2">123 Learning Road, Knowledge City</p>
                    <p className="text-sm text-gray-700">Email: <a href="mailto:info@yourcompany.com" className="text-black hover:underline">info@yourcompany.com</a></p>
                    <p className="text-sm text-gray-700">Phone: <a href="tel:+1234567890" className="text-black hover:underline">+1 234 567 890</a></p>
                </div>

                {/* Social & Payments */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
                    <div className="flex space-x-4 mb-6 text-xl text-gray-600">
                        <a href="#"><FaFacebookF className="hover:text-black" /></a>
                        <a href="#"><FaTwitter className="hover:text-black" /></a>
                        <a href="#"><FaInstagram className="hover:text-black" /></a>
                        <a href="#"><FaLinkedinIn className="hover:text-black" /></a>
                    </div>

                    <h4 className="text-md font-medium mb-2 text-gray-800">We Accept</h4>
                    <div className="flex space-x-4 text-3xl text-gray-600">
                        <FaCcVisa className="hover:text-black" />
                        <FaCcMastercard className="hover:text-black" />
                        <FaCcPaypal className="hover:text-black" />
                        <FaCcAmex className="hover:text-black" />
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
                &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
