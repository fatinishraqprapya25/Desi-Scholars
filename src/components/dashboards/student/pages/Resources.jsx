import { motion } from 'framer-motion';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import PageHeader from '../../common/PageHeader';
import ResourceCard from '../resources/ResourceCard';
import { GrResources } from 'react-icons/gr';
import { useEffect, useState } from 'react';

// const resourcesData = [
//     {
//         id: 'web-dev-docs',
//         title: 'MDN Web Docs',
//         description: 'Comprehensive documentation for web technologies: HTML, CSS, JavaScript, and more. An essential reference for all web developers.',
//         type: 'Documentation',
//         link: 'https://developer.mozilla.org/en-US/',
//         icon: 'https://placehold.co/60x60/E0F2F7/2196F3?text=MDN',
//         color: 'from-blue-100 to-blue-200',
//         iconColor: 'text-blue-600'
//     },
//     {
//         id: 'react-official-docs',
//         title: 'React Official Documentation',
//         description: 'The official guide to React.js, covering core concepts, hooks, and advanced topics. Best place to learn React.',
//         type: 'Documentation',
//         link: 'https://react.dev/',
//         icon: 'https://placehold.co/60x60/E8F5E9/4CAF50?text=RCT',
//         color: 'from-green-100 to-green-200',
//         iconColor: 'text-green-600'
//     },
//     {
//         id: 'freecodecamp',
//         title: 'freeCodeCamp.org',
//         description: 'Learn to code for free with thousands of hours of lessons, certifications, and projects. Covers various programming domains.',
//         type: 'Interactive Courses',
//         link: 'https://www.freecodecamp.org/',
//         icon: 'https://placehold.co/60x60/FFF3E0/FF9800?text=FCC',
//         color: 'from-orange-100 to-orange-200',
//         iconColor: 'text-orange-600'
//     },
//     {
//         id: 'javascript-info',
//         title: 'JavaScript.info',
//         description: 'A modern JavaScript tutorial from the basics to advanced topics. Well-structured and easy to understand.',
//         type: 'Tutorial',
//         link: 'https://javascript.info/',
//         icon: 'https://placehold.co/60x60/FCE4EC/E91E63?text=JS.I',
//         color: 'from-pink-100 to-pink-200',
//         iconColor: 'text-pink-600'
//     },
//     {
//         id: 'css-tricks',
//         title: 'CSS-Tricks',
//         description: 'Daily articles about CSS, HTML, JavaScript, and all things web design and development. Great for tips and tricks.',
//         type: 'Blog/Articles',
//         link: 'https://css-tricks.com/',
//         icon: 'https://placehold.co/60x60/E3F2FD/2196F3?text=CSS',
//         color: 'from-cyan-100 to-cyan-200',
//         iconColor: 'text-cyan-600'
//     },
//     {
//         id: 'youtube-channels',
//         title: 'Popular Dev YouTube Channels',
//         description: 'Curated list of top YouTube channels for web development tutorials, coding challenges, and industry insights.',
//         type: 'Video Tutorials',
//         link: '#', // Link to a dedicated page or section, or a list of channels
//         icon: 'https://placehold.co/60x60/D1C4E9/673AB7?text=YT',
//         color: 'from-purple-100 to-purple-200',
//         iconColor: 'text-purple-600'
//     },
// ];
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

function ResourcesPage() {
    const [resourcesData, setResourcesData] = useState([]);
    useEffect(() => {
        const fetchResources = async () => {
            const response = await fetch("http://localhost:5000/api/resource");
            const result = await response.json();
            setResourcesData(result.data);
        }
        fetchResources();
    }, []);

    return (
        <UserDashboardContainer>
            <motion.section
                className="mb-10 font-sans"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <PageHeader icon={<GrResources />
                } title="Our Resources" />

                {/* Resource Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                    variants={sectionVariants} // Using sectionVariants for staggering
                    initial="hidden"
                    animate="visible"
                >
                    {resourcesData.map((resource, index) => (
                        <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                </motion.div>
            </motion.section>
        </UserDashboardContainer>
    );
}

export default ResourcesPage;