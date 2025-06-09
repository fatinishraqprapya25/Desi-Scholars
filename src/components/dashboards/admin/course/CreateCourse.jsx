import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, PlusCircle, User, Image as ImageIcon, MessageSquare, Video, Mic
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function CreateCoursePage() {
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('recorded'); // 'live' or 'recorded'
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [courseImage, setCourseImage] = useState(null); // Stores the File object
    const [courseImagePreview, setCourseImagePreview] = useState(''); // Stores URL for preview

    // Framer Motion variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCourseImage(file);
            setCourseImagePreview(URL.createObjectURL(file)); // Create a URL for preview
        } else {
            setCourseImage(null);
            setCourseImagePreview('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send this data to your backend API
        const formData = {
            courseName,
            courseType,
            courseDescription,
            instructorName,
            // courseImage: courseImage // You'd send the File object or upload it separately
        };
        console.log('New Course Data:', formData);
        if (courseImage) {
            console.log('Course Image File:', courseImage);
        }

        alert('Course creation initiated! Check console for data.');
        // Reset form or redirect
        setCourseName('');
        setCourseType('recorded');
        setCourseDescription('');
        setInstructorName('');
        setCourseImage(null);
        setCourseImagePreview('');
    };

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <BookOpen className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Create New Course
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Use this form to **add a new course** to your platform. Fill in all the details to ensure your course is presented effectively.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Course Name */}
                        <div>
                            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-indigo-500" /> Course Name</span>
                            </label>
                            <input
                                type="text"
                                id="courseName"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                placeholder="e.g., Introduction to Web Development"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                            />
                        </div>

                        {/* Course Type: Live or Recorded */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><Video className="h-4 w-4 mr-2 text-indigo-500" /> Course Type</span>
                            </label>
                            <div className="mt-1 flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        name="courseType"
                                        value="recorded"
                                        checked={courseType === 'recorded'}
                                        onChange={() => setCourseType('recorded')}
                                    />
                                    <span className="ml-2 text-gray-700 flex items-center">Recorded <Mic className="ml-1 h-4 w-4" /></span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        name="courseType"
                                        value="live"
                                        checked={courseType === 'live'}
                                        onChange={() => setCourseType('live')}
                                    />
                                    <span className="ml-2 text-gray-700 flex items-center">Live <Video className="ml-1 h-4 w-4" /></span>
                                </label>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div>
                            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-indigo-500" /> Course Description</span>
                            </label>
                            <textarea
                                id="courseDescription"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                rows="4"
                                placeholder="Provide a detailed description of what the course covers, its objectives, and target audience."
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                            ></textarea>
                        </div>

                        {/* Instructor's Name */}
                        <div>
                            <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><User className="h-4 w-4 mr-2 text-indigo-500" /> Instructor's Name</span>
                            </label>
                            <input
                                type="text"
                                id="instructorName"
                                value={instructorName}
                                onChange={(e) => setInstructorName(e.target.value)}
                                placeholder="e.g., Dr. Emily White"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                            />
                        </div>

                        {/* Course Image */}
                        <div>
                            <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 text-indigo-500" /> Course Image</span>
                            </label>
                            <input
                                type="file"
                                id="courseImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-full file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-indigo-50 file:text-indigo-700
                                           hover:file:bg-indigo-100 transition-colors duration-200"
                            />
                            {courseImagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                    <img
                                        src={courseImagePreview}
                                        alt="Course Preview"
                                        className="max-w-xs h-auto rounded-md shadow-md border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <PlusCircle className="h-5 w-5 mr-3" /> Create Course
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}