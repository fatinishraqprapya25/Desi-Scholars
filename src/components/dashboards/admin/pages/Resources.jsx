import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, FileText, Video, Book } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import ResourceGrid from '../resources/ResourceGrid';
import ResourceSearchBar from '../resources/ResourceSearchBar';

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

// Helper functions (can be moved to a utilities file if needed elsewhere)
const getResourceIcon = (type) => {
    switch (type) {
        case 'PDF': return <FileText className="h-4 w-4 mr-1.5 text-red-500" />;
        case 'Video Guide': return <Video className="h-4 w-4 mr-1.5 text-blue-500" />;
        case 'Ebook': return <Book className="h-4 w-4 mr-1.5 text-green-500" />;
        default: return <FolderKanban className="h-4 w-4 mr-1.5 text-gray-500" />;
    }
};



// Animation variants (can be centralized in a constants/animations file)
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};


export default function ManageResourcesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtering logic for resources
    const filteredResources = useMemo(() => {
        let processedResources = [...resourcesData];

        if (searchTerm) {
            processedResources = processedResources.filter(resource =>
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return processedResources;
    }, [searchTerm]); // No need to include resourcesData in dependency array if it's constant

    // Handlers for resource actions
    const handleAddResource = () => {
        alert('Prompt to add a new resource (e.g., open a form modal)!');
    };

    const handleEditResource = (resourceId) => {
        alert(`Edit resource with ID: ${resourceId}`);
    };

    return (
        <UserDashboardContainer role={"admin"}>
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
                    <ResourceSearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onAddResource={handleAddResource}
                    />
                    <ResourceGrid
                        resources={filteredResources}
                        onEditResource={handleEditResource}
                    />
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}