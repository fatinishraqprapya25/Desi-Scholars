import {
    FaCode,
    FaExternalLinkAlt,
    FaJs,
    FaLaptopCode,
    FaNodeJs,
    FaReact,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const resources = [
    {
        id: 1,
        icon: <FaJs className="text-yellow-500 text-4xl" />,
        title: "JavaScript for Beginners",
        description: "A complete free JavaScript series for absolute beginners.",
        link: "#",
    },
    {
        id: 2,
        icon: <FaCode className="text-orange-500 text-4xl" />,
        title: "DOM Explained",
        description: "Free course that explains DOM clearly and visually.",
        link: "#",
    },
    {
        id: 3,
        icon: <FaLaptopCode className="text-yellow-400 text-4xl" />,
        title: "Modern JavaScript Series",
        description: "Up-to-date JavaScript practices for frontend devs.",
        link: "#",
    },
    {
        id: 4,
        icon: <FaReact className="text-blue-500 text-4xl" />,
        title: "React Fundamentals",
        description: "A full React.js playlist to get started with frontend.",
        link: "#",
    },
    {
        id: 5,
        icon: <FaNodeJs className="text-green-500 text-4xl" />,
        title: "Node.js in Bangla",
        description: "Express, Node & MongoDB tutorial series in Bangla.",
        link: "#",
    },
    {
        id: 6,
        icon: <SiTailwindcss className="text-teal-500 text-4xl" />,
        title: "Tailwind CSS Guide",
        description: "A complete free Tailwind CSS design series.",
        link: "#",
    },
];

export default function FreeResources() {
    return (
        <section className="py-16 bg-slate-100 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Left Sidebar */}
                <div className="lg:col-span-1">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712034.png"
                        alt="Illustration"
                        className="w-40 h-auto mb-6"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Awesome Tutorials</h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                        Dive into well-structured series covering JavaScript, React, Node.js, Tailwind CSS, and more — perfect for learners and self-taught developers.
                    </p>
                </div>

                {/* Resource Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {resources.map(({ id, icon, title, description, link }) => (
                        <div
                            key={id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition"
                        >
                            <div className="mb-4">{icon}</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{description}</p>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                View Details <FaExternalLinkAlt className="ml-2 text-sm" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
