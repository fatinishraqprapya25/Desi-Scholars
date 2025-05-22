// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
import Container from "../common/Container";

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
            delay: i * 0.2,
            ease: "easeOut",
        },
    }),
};

export default function OurTeam() {
    useEffect(() => {
        // Reset scroll animations if needed
    }, []);

    return (
        <section className="bg-white py-16">
            <Container>
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-5">
                    Our Team
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
                    Meet the passionate individuals behind our mission to empower learners worldwide. Our dedicated team brings expertise, creativity, and heart to everything we do.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {teamMembers.map(({ name, position, bio, photo, socials }, index) => (
                        <motion.div
                            key={name}
                            className="group relative rounded-lg shadow-lg overflow-hidden bg-white"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <div className="p-6 text-center h-80 flex flex-col items-center justify-start">
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-600"
                                />
                                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                                <p className="text-indigo-600 font-medium mb-2">{position}</p>
                                <p className="text-gray-700 text-sm">{bio}</p>
                            </div>

                            {/* Slide-down overlay */}
                            <div className="absolute inset-0 bg-indigo-600 bg-opacity-95 text-white flex items-center justify-center transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                                <div className="flex space-x-6">
                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
                                        </svg>
                                    </a>
                                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 12a10 10 0 10-11 9.95V14.9h-3v-3h3v-2.3c0-3 1.79-4.7 4.53-4.7 1.31 0 2.69.23 2.69.23v3h-1.53c-1.5 0-1.97.93-1.97 1.88V12h3.36l-.54 3h-2.82v7.05A10 10 0 0022 12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-600 hover:text-white transition">
                        All of our Team Members
                    </button>
                </div>
            </Container>
        </section>
    );
}
