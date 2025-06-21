import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, FileText, Video, Book } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import ResourceGrid from '../resources/ResourceGrid';
import ResourceSearchBar from '../resources/ResourceSearchBar';
import { useNavigate } from 'react-router-dom';

const getResourceIcon = (type) => {
    switch (type) {
        case 'PDF': return <FileText className="h-4 w-4 mr-1.5 text-red-500" />;
        case 'Video Guide': return <Video className="h-4 w-4 mr-1.5 text-blue-500" />;
        case 'Ebook': return <Book className="h-4 w-4 mr-1.5 text-green-500" />;
        default: return <FolderKanban className="h-4 w-4 mr-1.5 text-gray-500" />;
    }
};

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
    const [resources, setResources] = useState([]);

    const navigate = useNavigate();
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    const loadResources = () => {
        const fetchResources = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/resource");
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setResources(result.data);
                    }
                }
            } catch (err) {
                alert(err.message);
            }
        }
        fetchResources();
    }

    useEffect(() => {
        loadResources();
    }, []);

    const handleAddResource = () => {
        navigate("/admin/resources/create")
    };

    const deleteResource = (id) => {
        const dltResource = async () => {
            const response = await fetch(`http://localhost:5000/api/resource/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                }
            });
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert("resource deleted successfully!");
                    loadResources();
                } else {
                    alert("failed to delete resource");
                }
            } else {
                alert("failed to delete resource");
            }
        }
        dltResource();
    }

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
                        resources={resources}
                        deleteResource={deleteResource}
                    />
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}