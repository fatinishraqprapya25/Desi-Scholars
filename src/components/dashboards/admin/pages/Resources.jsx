import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderKanban, Clock, PlusCircle, Search, Edit, Calendar, FileText, Video, Book, Lightbulb, User, HardDrive
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer'; // Assuming this component exists

// Mock data for resources
const resourcesData = [
    {
        id: 'RES-001',
        title: 'React Hooks Cheatsheet',
        description: 'A concise PDF guide for quick reference on all essential React Hooks and their usage.',
        type: 'PDF',
        author: 'Dr. Emily White',
        uploadDate: '2025-05-25',
        fileSize: '1.2 MB'
    },
    {
        id: 'RES-002',
        title: 'Advanced JavaScript Video Series',
        description: 'A series of video tutorials covering advanced topics like closures, async/await, and design patterns.',
        type: 'Video Guide',
        author: 'Prof. David Lee',
        uploadDate: '2025-06-01',
        duration: '45 mins'
    },
    {
        id: 'RES-003',
        title: 'Data Structures & Algorithms Ebook',
        description: 'An interactive ebook explaining fundamental data structures and algorithms with Python examples.',
        type: 'Ebook',
        author: 'Ms. Sarah Chen',
        uploadDate: '2025-04-18',
        fileSize: '8.5 MB'
    },
    {
        id: 'RES-004',
        title: 'Machine Learning Concepts PDF',
        description: 'An introductory PDF document on core machine learning concepts, models, and evaluation metrics.',
        type: 'PDF',
        author: 'Mr. Alex Kim',
        uploadDate: '2025-05-10',
        fileSize: '2.5 MB'
    },
    {
        id: 'RES-005',
        title: 'UI/UX Design Principles Video',
        description: 'A video guide exploring the foundational principles of user interface and user experience design.',
        type: 'Video Guide',
        author: 'Dr. Olivia Brown',
        uploadDate: '2025-03-22',
        duration: '30 mins'
    },
];

export default function ManageResourcesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const accentPurple = '#8A4AF8'; // Define the accent color for consistency

    // Framer Motion variants (reused from previous pages)
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    // Helper function to get icon based on resource type
    const getResourceIcon = (type) => {
        switch (type) {
            case 'PDF':
                return <FileText className="h-4 w-4 mr-1.5 text-red-500" />;
            case 'Video Guide':
                return <Video className="h-4 w-4 mr-1.5 text-blue-500" />;
            case 'Ebook':
                return <Book className="h-4 w-4 mr-1.5 text-green-500" />;
            default:
                return <FolderKanban className="h-4 w-4 mr-1.5 text-gray-500" />;
        }
    };

    // Helper function to get badge styling based on resource type
    const getResourceBadge = (type) => {
        switch (type) {
            case 'PDF':
                return 'bg-red-100 text-red-800';
            case 'Video Guide':
                return 'bg-blue-100 text-blue-800';
            case 'Ebook':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Filtering logic for resources
    const filteredResources = useMemo(() => {
        let processedResources = [...resourcesData];

        if (searchTerm) {
            processedTests = processedResources.filter(resource =>
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedResources;
    }, [searchTerm, resourcesData]);

    // Handlers for resource actions
    const handleAddResource = () => {
        alert('Prompt to add a new resource (e.g., open a form modal)!');
    };

    const handleEditResource = (resourceId) => {
        alert(`Edit resource with ID: ${resourceId}`);
    };

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <FolderKanban className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Manage Resources
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    A central hub to **manage and organize all educational resources** including PDFs, video guides, and ebooks. Easily search and add new content.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-3 sm:p-5 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Top Controls: Search and Add Resource */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-5 gap-3 sm:gap-4">
                        <div className="relative flex-grow w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        <button
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                            onClick={handleAddResource}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add New Resource
                        </button>
                    </div>

                    {/* Resource Cards Grid */}
                    {filteredResources.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <AnimatePresence>
                                {filteredResources.map((resource) => (
                                    <motion.div
                                        key={resource.id}
                                        className="bg-white rounded-xl shadow-lg border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between relative overflow-hidden"
                                        variants={cardVariants}
                                        layout // Enables smooth layout transitions for reordering/filtering
                                    >
                                        {/* Decorative top border */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

                                        {/* Resource ID and Type Badge */}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span className="font-medium">{resource.id}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getResourceBadge(resource.type)}`}>
                                                {resource.type}
                                            </span>
                                        </div>

                                        {/* Resource Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                            {resource.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={resource.description}>
                                            {resource.description}
                                        </p>

                                        {/* Resource Details (Author, Date, Size/Duration) */}
                                        <div className="text-xs text-gray-500 grid grid-cols-2 gap-y-1 mb-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> {resource.author}</div>
                                            <div className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1.5 text-orange-500" /> Uploaded: {resource.uploadDate}</div>
                                            {resource.fileSize && (
                                                <div className="flex items-center col-span-2"><HardDrive className="h-3.5 w-3.5 mr-1.5 text-gray-500" /> Size: {resource.fileSize}</div>
                                            )}
                                            {resource.duration && (
                                                <div className="flex items-center col-span-2"><Clock className="h-3.5 w-3.5 mr-1.5 text-purple-500" /> Duration: {resource.duration}</div>
                                            )}
                                        </div>

                                        {/* Action Button: Edit Resource */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                                                onClick={() => handleEditResource(resource.id)}
                                                title="Edit Resource"
                                            >
                                                <Edit className="h-4 w-4 mr-2" /> Edit Resource
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-base">
                            <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Adjust your search or add a new resource!
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}