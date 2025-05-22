// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
// Assuming Container is a component that sets max-width and padding
import Container from "../common/Container";

// Import social icons from react-icons (install if you haven't: npm install react-icons)
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const teamMembers = [
    {
        name: "Alice Johnson",
        position: "Founder & CEO",
        bio: "Passionate about education and technology, leading DSAT Scholars to success.",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        socials: {
            twitter: "https://twitter.com/alicejohnson",
            linkedin: "https://linkedin.com/in/alicejohnson",
            facebook: "https://facebook.com/alicejohnson",
        },
    },
    {
        name: "Michael Lee",
        position: "Chief Instructor",
        bio: "Expert in software development with over 10 years of teaching experience.",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        socials: {
            twitter: "https://twitter.com/michaellee",
            linkedin: "https://linkedin.com/in/michaellee",
            facebook: "https://facebook.com/michaellee",
        },
    },
    {
        name: "Sara Kim",
        position: "Content Strategist",
        bio: "Creating engaging course content to help learners thrive.",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        socials: {
            twitter: "https://twitter.com/sarakim",
            linkedin: "https://linkedin.com/in/sarakim",
            facebook: "https://facebook.com/sarakim",
        },
    },
    {
        name: "James Carter",
        position: "Community Manager",
        bio: "Building a vibrant and supportive community of learners worldwide.",
        photo: "https://randomuser.me/api/portraits/men/85.jpg",
        socials: {
            twitter: "https://twitter.com/jamescarter",
            linkedin: "https://linkedin.com/in/jamescarter",
            facebook: "https://facebook.com/jamescarter",
        },
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.15, // Slightly reduced delay for snappier animation
            ease: "easeOut",
        },
    }),
};

export default function OurTeam() {
    // useEffect is not strictly necessary here unless you have side effects to manage
    // related to scroll animations or other DOM manipulations that need cleanup.
    // For simple reveal animations with Framer Motion, it's often not needed.
    useEffect(() => {
        // No specific side effects or cleanup needed for this setup
    }, []);

    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden"> {/* Added gradient background and overflow-hidden for animation safety */}
            <Container>
                <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-6 drop-shadow-sm leading-tight">
                    Meet Our <span className="text-indigo-700">Exceptional Team</span>
                </h2>
                <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mt-4 mb-16 px-4">
                    Committed to empowering learners, our diverse team blends expertise, passion, and innovation to craft an unparalleled educational experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16"> {/* Increased gap */}
                    {teamMembers.map(({ name, position, bio, photo, socials }, index) => (
                        <motion.div
                            key={name}
                            className="group relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white cursor-pointer transform hover:-translate-y-2" // Added rounded-2xl, stronger shadow, hover translate-y
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <div className="p-8 text-center flex flex-col items-center justify-start"> {/* Increased padding */}
                                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-indigo-500 shadow-md"> {/* Larger image, stronger border */}
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" // Image scales on hover
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">{name}</h3> {/* Larger name, bolder */}
                                <p className="text-indigo-600 font-semibold mb-3 text-base">{position}</p> {/* Bolder position */}
                                <p className="text-gray-700 text-sm line-clamp-3">{bio}</p> {/* Consistent bio height */}
                            </div>

                            {/* Slide-down overlay for social icons */}
                            <div className="absolute inset-0 bg-indigo-700 bg-opacity-90 text-white flex items-center justify-center transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-2xl"> {/* Smoother transition, rounded corners */}
                                <div className="flex space-x-7"> {/* Increased spacing */}
                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors duration-300">
                                        <FaTwitter className="h-7 w-7" /> {/* Using React Icons */}
                                    </a>
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors duration-300">
                                        <FaLinkedinIn className="h-7 w-7" /> {/* Using React Icons */}
                                    </a>
                                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors duration-300">
                                        <FaFacebookF className="h-7 w-7" /> {/* Using React Icons */}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg"> {/* Gradient button, rounded, larger padding, hover effects */}
                        All of Our Team Members
                    </button>
                </div>
            </Container>
        </section>
    );
}