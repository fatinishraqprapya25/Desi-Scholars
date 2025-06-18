import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, PlusCircle, User, Image as ImageIcon, MessageSquare, Video, Mic, Clock, Zap, ToggleRight
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function CreateCoursePage() {
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('recorded');
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [courseStatus, setCourseStatus] = useState('active');
    const [isPaid, setIsPaid] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [courseImagePreview, setCourseImagePreview] = useState('');
    const [loading, setLoading] = useState(false); // New: Loading state for API call
    const [error, setError] = useState(null);     // New: Error state for API call
    const [success, setSuccess] = useState(false); // New: Success state for feedback

    const adminToken = localStorage.getItem("ASDFDKFFJF"); // Retrieve token

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
            setCourseImagePreview(URL.createObjectURL(file));
        } else {
            setCourseImage(null);
            setCourseImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors
        setSuccess(false); // Clear previous success

        // Prepare form data for sending (including file)
        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('courseType', courseType);
        formData.append('courseDescription', courseDescription);
        formData.append('instructorName', instructorName);
        formData.append('courseStatus', courseStatus);
        formData.append('isPaid', isPaid);
        if (courseType === 'live' && startTime) {
            formData.append('startTime', startTime);
        }
        if (courseImage) {
            formData.append('courseImage', courseImage);
        }

        try {
            const response = await fetch("http://localhost:5000/api/courses", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result);

            if (response.ok && result.success) {
                setSuccess(true);
                alert("Course created successfully!");
                setCourseName('');
                setCourseType('recorded');
                setCourseDescription('');
                setInstructorName('');
                setCourseStatus('active');
                setIsPaid(true);
                setStartTime('');
                setCourseImage(null);
                setCourseImagePreview('');
            } else {
                setError(result.message || "Failed to create course.");
                alert(`Error: ${result.message || "Failed to create course."}`);
            }
        } catch (err) {
            console.log(err.message)
            setError("Network error or server unavailable. Please try again.");
            console.error("Error creating course:", err);
            alert("Network error or server unavailable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <BookOpen className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" />
                    Create New Course
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                    Use this form to <strong>add a new course</strong> to your platform. Fill in all the details to ensure your course is presented effectively.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100"
                    variants={itemVariants}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* API Feedback */}
                        {loading && (
                            <div className="text-blue-500 text-center py-2">Creating course...</div>
                        )}
                        {error && (
                            <div className="text-red-500 text-center py-2 border border-red-300 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-green-500 text-center py-2 border border-green-300 bg-green-50 rounded-md">
                                Course created successfully!
                            </div>
                        )}

                        {/* Course Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-indigo-500" /> Course Name</span>
                            </label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                className="input-field"
                                placeholder="e.g., Intro to JavaScript"
                                required
                            />
                        </div>

                        {/* Course Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><Video className="h-4 w-4 mr-2 text-indigo-500" /> Course Type</span>
                            </label>
                            <div className="mt-1 flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input type="radio" name="courseType" value="recorded" checked={courseType === 'recorded'} onChange={() => setCourseType('recorded')} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                                    <span className="ml-2 text-gray-700 flex items-center">Recorded <Mic className="ml-1 h-4 w-4 text-gray-500" /></span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" name="courseType" value="live" checked={courseType === 'live'} onChange={() => setCourseType('live')} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                                    <span className="ml-2 text-gray-700 flex items-center">Live <Video className="ml-1 h-4 w-4 text-gray-500" /></span>
                                </label>
                            </div>
                        </div>

                        {/* Start Time (Live Only) */}
                        {courseType === 'live' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="flex items-center"><Clock className="h-4 w-4 mr-2 text-indigo-500" /> Start Time</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="input-field"
                                    required={courseType === 'live'} // Required only for live courses
                                />
                            </div>
                        )}

                        {/* Course Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><Zap className="h-4 w-4 mr-2 text-indigo-500" /> Course Status</span>
                            </label>
                            <select value={courseStatus} onChange={(e) => setCourseStatus(e.target.value)} className="input-field" required>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Is Paid */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><ToggleRight className="h-4 w-4 mr-2 text-indigo-500" /> Is this course Paid?</span>
                            </label>
                            <select value={isPaid} onChange={(e) => setIsPaid(e.target.value === 'true')} className="input-field">
                                <option value="true">Paid</option>
                                <option value="false">Free</option>
                            </select>
                        </div>

                        {/* Course Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-2 text-indigo-500" /> Course Description</span>
                            </label>
                            <textarea
                                rows="4"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                className="input-field"
                                placeholder="Explain what the course covers..."
                                required
                            />
                        </div>

                        {/* Instructor Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><User className="h-4 w-4 mr-2 text-indigo-500" /> Instructor</span>
                            </label>
                            <input
                                type="text"
                                value={instructorName}
                                onChange={(e) => setInstructorName(e.target.value)}
                                className="input-field"
                                placeholder="e.g., John Smith"
                                required
                            />
                        </div>

                        {/* Course Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 text-indigo-500" /> Course Image</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input block w-full text-sm text-gray-500
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-md file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-indigo-50 file:text-indigo-700
                                           hover:file:bg-indigo-100" // Tailwind for file input
                            />
                            {courseImagePreview && (
                                <div className="mt-4">
                                    <img src={courseImagePreview} alt="Course Preview" className="w-48 rounded-md shadow-md border border-gray-200 object-cover aspect-video" />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="h-5 w-5 mr-3" /> Create Course
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}