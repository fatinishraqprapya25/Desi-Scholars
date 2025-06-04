import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Globe, Video, FileText, Code, ExternalLink } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

// Mock data for resources
const resourcesData = [
    {
        id: 'web-dev-docs',
        title: 'MDN Web Docs',
        description: 'Comprehensive documentation for web technologies: HTML, CSS, JavaScript, and more. An essential reference for all web developers.',
        type: 'Documentation',
        link: 'https://developer.mozilla.org/en-US/',
        icon: 'https://placehold.co/60x60/E0F2F7/2196F3?text=MDN',
        color: 'from-blue-100 to-blue-200',
        iconColor: 'text-blue-600'
    },
    {
        id: 'react-official-docs',
        title: 'React Official Documentation',
        description: 'The official guide to React.js, covering core concepts, hooks, and advanced topics. Best place to learn React.',
        type: 'Documentation',
        link: 'https://react.dev/',
        icon: 'https://placehold.co/60x60/E8F5E9/4CAF50?text=RCT',
        color: 'from-green-100 to-green-200',
        iconColor: 'text-green-600'
    },
    {
        id: 'freecodecamp',
        title: 'freeCodeCamp.org',
        description: 'Learn to code for free with thousands of hours of lessons, certifications, and projects. Covers various programming domains.',
        type: 'Interactive Courses',
        link: 'https://www.freecodecamp.org/',
        icon: 'https://placehold.co/60x60/FFF3E0/FF9800?text=FCC',
        color: 'from-orange-100 to-orange-200',
        iconColor: 'text-orange-600'
    },
    {
        id: 'javascript-info',
        title: 'JavaScript.info',
        description: 'A modern JavaScript tutorial from the basics to advanced topics. Well-structured and easy to understand.',
        type: 'Tutorial',
        link: 'https://javascript.info/',
        icon: 'https://placehold.co/60x60/FCE4EC/E91E63?text=JS.I',
        color: 'from-pink-100 to-pink-200',
        iconColor: 'text-pink-600'
    },
    {
        id: 'css-tricks',
        title: 'CSS-Tricks',
        description: 'Daily articles about CSS, HTML, JavaScript, and all things web design and development. Great for tips and tricks.',
        type: 'Blog/Articles',
        link: 'https://css-tricks.com/',
        icon: 'https://placehold.co/60x60/E3F2FD/2196F3?text=CSS',
        color: 'from-cyan-100 to-cyan-200',
        iconColor: 'text-cyan-600'
    },
    {
        id: 'youtube-channels',
        title: 'Popular Dev YouTube Channels',
        description: 'Curated list of top YouTube channels for web development tutorials, coding challenges, and industry insights.',
        type: 'Video Tutorials',
        link: '#', // Link to a dedicated page or section, or a list of channels
        icon: 'https://placehold.co/60x60/D1C4E9/673AB7?text=YT',
        color: 'from-purple-100 to-purple-200',
        iconColor: 'text-purple-600'
    },
];

function ResourcesPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Helper to pick the correct icon based on resource type
    const getTypeIcon = (type) => {
        switch (type) {
            case 'Documentation':
                return <BookOpen className="h-4 w-4 mr-1 text-gray-500" />;
            case 'Interactive Courses':
                return <PlayCircle className="h-4 w-4 mr-1 text-gray-500" />;
            case 'Tutorial':
                return <FileText className="h-4 w-4 mr-1 text-gray-500" />;
            case 'Blog/Articles':
                return <Code className="h-4 w-4 mr-1 text-gray-500" />;
            case 'Video Tutorials':
                return <Video className="h-4 w-4 mr-1 text-gray-500" />;
            default:
                return <Globe className="h-4 w-4 mr-1 text-gray-500" />;
        }
    };

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h3 className="text-3xl mt-3 font-extrabold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="mr-3 h-8 w-8 text-purple-600" /> Learning Resources
                </h3>
                <p className="text-gray-700 text-lg mb-10 max-w-2xl">
                    Discover a curated list of valuable resources to enhance your coding journey. From official documentation to interactive tutorials, find everything you need here!
                </p>

                {/* Resource Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                    variants={sectionVariants} // Using sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {resourcesData.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                                       hover:shadow-2xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2"
                            variants={cardVariants} // Use cardVariants for individual card animation
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Icon/Image Section */}
                            <div className={`p-6 flex items-center justify-center rounded-t-2xl bg-gradient-to-br ${resource.color}`}>
                                <img src={resource.icon} alt={resource.title} className="w-16 h-16 object-contain" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
                                <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{resource.title}</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">{resource.description}</p> {/* Added flex-grow */}
                                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4 gap-y-2">
                                    <span className="flex items-center">
                                        {getTypeIcon(resource.type)} {resource.type}
                                    </span>
                                </div>
                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-lg
                                               hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                                               flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95 mt-auto" // mt-auto to push button to bottom
                                >
                                    <ExternalLink className="mr-2 h-5 w-5" /> Visit Resource
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.section>
        </UserDashboardContainer>
    );
}

export default ResourcesPage;