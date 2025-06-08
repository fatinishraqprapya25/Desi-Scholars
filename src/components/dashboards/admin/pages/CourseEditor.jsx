import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, User, AlignLeft, Video, Radio, PlusCircle, Edit, Trash2, X, Hash, ListOrdered, ClipboardList, Save, CheckCircle
} from 'lucide-react'; // Added relevant icons
import UserDashboardContainer from '../../common/UserDashboardContainer';

// A simple utility for generating unique IDs for new modules
const generateUniqueId = () => `MOD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

// Mock initial course data for demonstration
const mockCourseData = {
    id: 'C-001',
    name: 'Introduction to Modern React Development',
    instructor: 'Dr. Emily White',
    description: 'This comprehensive course covers everything from React fundamentals, hooks, context API, to advanced patterns like render props and custom hooks. Build scalable and maintainable front-end applications.',
    type: 'Live', // Can be 'Recorded' or 'Live'
    modules: [
        { id: 'MOD-001', name: 'Module 1: React Core Concepts & JSX' },
        { id: 'MOD-002', name: 'Module 2: State, Props & Component Lifecycle' },
        { id: 'MOD-003', name: 'Module 3: Hooks - useState, useEffect, useContext' },
        { id: 'MOD-004', name: 'Module 4: React Router & Navigation' },
        { id: 'MOD-005', name: 'Module 5: Advanced State Management (Context API)' },
    ]
};

// Component for adding/editing a module
const ModuleFormModal = ({ isOpen, onClose, moduleData, onSave, isEditing }) => {
    const [moduleName, setModuleName] = useState('');

    useEffect(() => {
        if (isEditing && moduleData) {
            setModuleName(moduleData.name);
        } else {
            setModuleName(''); // Clear for adding new module
        }
    }, [isOpen, moduleData, isEditing]); // Re-run when modal opens or moduleData changes

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (moduleName.trim()) {
            onSave({ ...moduleData, name: moduleName.trim() });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto relative border border-gray-100"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    {isEditing ? <Edit className="h-5 w-5 mr-2 text-indigo-500" /> : <PlusCircle className="h-5 w-5 mr-2 text-green-500" />}
                    {isEditing ? 'Edit Module' : 'Add New Module'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                        <input
                            type="text"
                            id="moduleName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-800"
                            placeholder="e.g., Introduction to CSS"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium text-sm"
                        >
                            {isEditing ? 'Save Changes' : 'Add Module'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default function CourseEditor({ initialCourseData = mockCourseData, onSave = () => console.log('Course saved') }) {
    const [courseDetails, setCourseDetails] = useState(initialCourseData);
    const [modules, setModules] = useState(initialCourseData.modules || []);

    const [showModuleModal, setShowModuleModal] = useState(false);
    const [editingModule, setEditingModule] = useState(null); // Holds module data for editing

    // Ensure state updates if initialCourseData changes (e.g., loading a different course)
    useEffect(() => {
        setCourseDetails(initialCourseData);
        setModules(initialCourseData.modules || []);
    }, [initialCourseData]);

    const handleCourseChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddModule = () => {
        setEditingModule(null); // Clear any editing state
        setShowModuleModal(true);
    };

    const handleEditModule = (moduleToEdit) => {
        setEditingModule(moduleToEdit);
        setShowModuleModal(true);
    };

    const handleDeleteModule = (moduleId) => {
        if (window.confirm("Are you sure you want to delete this module?")) {
            setModules(prev => prev.filter(mod => mod.id !== moduleId));
        }
    };

    const handleSaveModule = (module) => {
        if (module.id) { // Editing an existing module
            setModules(prev => prev.map(mod => mod.id === module.id ? module : mod));
        } else { // Adding a new module
            setModules(prev => [...prev, { ...module, id: generateUniqueId() }]);
        }
    };

    const handleSaveCourse = () => {
        // Here you would typically send the 'courseDetails' and 'modules' to your backend
        const courseToSave = {
            ...courseDetails,
            modules: modules // Ensure modules are part of the saved course data
        };
        console.log("Saving Course:", courseToSave);
        onSave(courseToSave); // Call the onSave prop
        alert('Course saved successfully! (Check console for data)');
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delayChildren: 0.2, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <UserDashboardContainer admin={true}>
            <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-7xl mx-auto">
                <motion.div
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center">
                            <Edit className="mr-3 h-7 w-7 text-indigo-600" /> Edit Course
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSaveCourse}
                            className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-semibold text-base"
                        >
                            <Save className="h-5 w-5 mr-2" /> Save Course
                        </motion.button>
                    </div>

                    {/* Course Details Section */}
                    <motion.div
                        className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-inner border border-indigo-100"
                        variants={itemVariants}
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <ClipboardList className="h-6 w-6 mr-2 text-indigo-700" /> Course Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Course Name */}
                            <div>
                                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1.5 text-blue-500" /> Course Name
                                </label>
                                <input
                                    type="text"
                                    id="courseName"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-800"
                                    value={courseDetails.name || ''}
                                    onChange={handleCourseChange}
                                    placeholder="e.g., Advanced CSS Techniques"
                                    required
                                />
                            </div>

                            {/* Instructor's Name */}
                            <div>
                                <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <User className="h-4 w-4 mr-1.5 text-green-500" /> Instructor's Name
                                </label>
                                <input
                                    type="text"
                                    id="instructorName"
                                    name="instructor"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-800"
                                    value={courseDetails.instructor || ''}
                                    onChange={handleCourseChange}
                                    placeholder="e.g., Prof. Jane Smith"
                                    required
                                />
                            </div>

                            {/* Course Type */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Video className="h-4 w-4 mr-1.5 text-purple-500" /> Course Type
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Live"
                                            checked={courseDetails.type === 'Live'}
                                            onChange={handleCourseChange}
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 transition-colors"
                                        />
                                        <span className="ml-2 text-gray-800 flex items-center"><Radio className="h-4 w-4 mr-1" /> Live</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Recorded"
                                            checked={courseDetails.type === 'Recorded'}
                                            onChange={handleCourseChange}
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 transition-colors"
                                        />
                                        <span className="ml-2 text-gray-800 flex items-center"><Video className="h-4 w-4 mr-1" /> Recorded</span>
                                    </label>
                                </div>
                            </div>

                            {/* Course Description */}
                            <div className="md:col-span-2">
                                <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <AlignLeft className="h-4 w-4 mr-1.5 text-orange-500" /> Course Description
                                </label>
                                <textarea
                                    id="courseDescription"
                                    name="description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-all duration-200 text-gray-800"
                                    value={courseDetails.description || ''}
                                    onChange={handleCourseChange}
                                    placeholder="Provide a detailed description of the course content..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </motion.div>

                    {/* Modules Section */}
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md border border-gray-100"
                        variants={itemVariants}
                    >
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                <ListOrdered className="h-6 w-6 mr-2 text-purple-700" /> Course Modules ({modules.length})
                            </h3>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddModule}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm font-medium text-sm"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" /> Add Module
                            </motion.button>
                        </div>

                        {modules.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                                <ul className="space-y-4">
                                    {modules.map((module) => (
                                        <motion.li
                                            key={module.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                            layout // Ensures smooth transitions when items are added/removed/reordered
                                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium text-gray-900 text-base">{module.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEditModule(module)}
                                                    className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition-colors"
                                                    title="Edit Module"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDeleteModule(module.id)}
                                                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors"
                                                    title="Delete Module"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </motion.button>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </AnimatePresence>
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                <CheckCircle className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                                No modules added yet. Click "Add Module" to begin structuring your course!
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Module Add/Edit Modal */}
                <AnimatePresence>
                    {showModuleModal && (
                        <ModuleFormModal
                            isOpen={showModuleModal}
                            onClose={() => setShowModuleModal(false)}
                            moduleData={editingModule}
                            onSave={handleSaveModule}
                            isEditing={!!editingModule}
                        />
                    )}
                </AnimatePresence>
            </div>
        </UserDashboardContainer>
    );
}

