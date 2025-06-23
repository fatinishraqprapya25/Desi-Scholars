import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, PlusCircle, User, Image as ImageIcon, MessageSquare, Video, Mic, Clock, Zap, ToggleRight, DollarSign, BarChart2
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function CreateCoursePage() {
    // State management for form fields
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('recorded');
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [courseStatus, setCourseStatus] = useState('active');
    const [isPaid, setIsPaid] = useState(true);
    const [price, setPrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [courseImagePreview, setCourseImagePreview] = useState('');
    const [level, setLevel] = useState('beginner'); // Default value is important here

    // State for API feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Retrieve admin token (ensure this is handled securely in a real application)
    const adminToken = localStorage.getItem("ASDFDKFFJF");

    // Animation variants for Framer Motion
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    // Handler for course image selection
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

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors
        setSuccess(false);

        // --- Frontend Validation Check ---
        const validationErrors = [];

        if (!courseName.trim()) {
            validationErrors.push("Course Name is required.");
        }
        if (!instructorId.trim()) { // Check if instructorId is not just empty spaces
            validationErrors.push("Instructor ID is required.");
        }
        if (!level.trim()) { // Although 'beginner' is default, good to check
            validationErrors.push("Course Level is required.");
        }
        if (!courseDescription.trim()) {
            validationErrors.push("Course Description is required.");
        }
        if (isPaid && (!price || parseFloat(price) <= 0)) {
            validationErrors.push("Price is required and must be greater than zero for paid courses.");
        }
        if (courseType === 'live' && !startTime) {
            validationErrors.push("Start Date is required for live courses.");
        }

        if (validationErrors.length > 0) {
            setError(validationErrors.join(" ")); // Join all errors into one message
            setLoading(false);
            return; // Stop the submission
        }
        // --- End Frontend Validation Check ---


        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('courseType', courseType);
        formData.append('courseDescription', courseDescription);
        formData.append('instructorId', instructorId);
        formData.append('courseStatus', courseStatus);
        formData.append('isPaid', isPaid);
        formData.append('level', level);

        if (isPaid) {
            formData.append('price', price);
        }
        if (courseType === 'live' && startTime) {
            formData.append('startTime', new Date(startTime).toISOString());
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

            if (response.ok && result.success) {
                setSuccess(true);
                // Reset form fields
                setCourseName('');
                setCourseType('recorded');
                setCourseDescription('');
                setInstructorId('');
                setCourseStatus('active');
                setIsPaid(true);
                setPrice('');
                setStartTime('');
                setCourseImage(null);
                setCourseImagePreview('');
                setLevel('beginner');
            } else {
                // Display specific backend error message if available
                setError(result.message || "Failed to create course. Please check your inputs.");
            }
        } catch (err) {
            setError("Network error or server unavailable. Please try again.");
            console.error("Error creating course:", err);
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="mr-3 h-8 w-8 text-indigo-600" />
                    Create New Course
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-3xl leading-relaxed">
                    Use this form to **add a new course** to your platform. Fill in all the details to ensure your course is presented effectively to students.
                </p>

                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-gray-100"
                    variants={itemVariants}
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* API Feedback and Frontend Validation Errors */}
                        {loading && (
                            <div className="flex items-center justify-center py-4 text-blue-600 font-medium bg-blue-50 rounded-lg border border-blue-200">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating course...
                            </div>
                        )}
                        {error && (
                            <div className="text-red-700 text-center py-3 px-4 border border-red-300 bg-red-50 rounded-lg flex items-center justify-center">
                                <span className="mr-2 text-red-500 font-bold">!</span> {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-green-700 text-center py-3 px-4 border border-green-300 bg-green-50 rounded-lg flex items-center justify-center">
                                <span className="mr-2 text-green-500 font-bold">✓</span> Course created successfully!
                            </div>
                        )}

                        {/* Form Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Course Name */}
                            <div>
                                <label htmlFor="courseName" className="input-label">
                                    <BookOpen className="h-4 w-4 mr-2 text-indigo-500" /> Course Name <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="courseName"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className="fancy-input-field"
                                    placeholder="e.g., Intro to JavaScript"
                                    required
                                />
                            </div>

                            {/* Instructor ID */}
                            <div>
                                <label htmlFor="instructorId" className="input-label">
                                    <User className="h-4 w-4 mr-2 text-indigo-500" /> Instructor ID <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="instructorId"
                                    value={instructorId}
                                    onChange={(e) => setInstructorId(e.target.value)}
                                    className="fancy-input-field"
                                    placeholder="e.g., instr_js_001"
                                    required
                                />
                            </div>

                            {/* Course Type */}
                            <div className="md:col-span-2">
                                <label className="input-label">
                                    <Video className="h-4 w-4 mr-2 text-indigo-500" /> Course Type <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="mt-1 flex flex-wrap gap-4">
                                    <label className="inline-flex items-center cursor-pointer p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition duration-200 ease-in-out">
                                        <input
                                            type="radio"
                                            name="courseType"
                                            value="recorded"
                                            checked={courseType === 'recorded'}
                                            onChange={() => setCourseType('recorded')}
                                            className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 checked:bg-indigo-600"
                                        />
                                        <span className="ml-2 text-indigo-800 font-medium flex items-center">Recorded <Mic className="ml-2 h-4 w-4 text-indigo-600" /></span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition duration-200 ease-in-out">
                                        <input
                                            type="radio"
                                            name="courseType"
                                            value="live"
                                            checked={courseType === 'live'}
                                            onChange={() => setCourseType('live')}
                                            className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 checked:bg-indigo-600"
                                        />
                                        <span className="ml-2 text-indigo-800 font-medium flex items-center">Live <Video className="ml-2 h-4 w-4 text-indigo-600" /></span>
                                    </label>
                                </div>
                            </div>

                            {/* Level Field */}
                            <div>
                                <label htmlFor="level" className="input-label">
                                    <BarChart2 className="h-4 w-4 mr-2 text-indigo-500" /> Course Level <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    id="level"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="fancy-input-field"
                                    required
                                >
                                    <option value="">Select Level</option> {/* Added an empty option to ensure selection */}
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Course Status */}
                            <div>
                                <label htmlFor="courseStatus" className="input-label">
                                    <Zap className="h-4 w-4 mr-2 text-indigo-500" /> Course Status <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    id="courseStatus"
                                    value={courseStatus}
                                    onChange={(e) => setCourseStatus(e.target.value)}
                                    className="fancy-input-field"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Start Time (Live Only) */}
                            {courseType === 'live' && (
                                <div>
                                    <label htmlFor="startTime" className="input-label">
                                        <Clock className="h-4 w-4 mr-2 text-indigo-500" /> Start Date <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="startTime"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="fancy-input-field"
                                        required={courseType === 'live'}
                                    />
                                </div>
                            )}

                            {/* Is Paid */}
                            <div>
                                <label htmlFor="isPaid" className="input-label">
                                    <ToggleRight className="h-4 w-4 mr-2 text-indigo-500" /> Is this course Paid? <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    id="isPaid"
                                    value={isPaid}
                                    onChange={(e) => setIsPaid(e.target.value === 'true')}
                                    className="fancy-input-field"
                                >
                                    <option value="true">Paid</option>
                                    <option value="false">Free</option>
                                </select>
                            </div>

                            {/* Price - only if paid */}
                            {isPaid && (
                                <div>
                                    <label htmlFor="price" className="input-label">
                                        <DollarSign className="h-4 w-4 mr-2 text-indigo-500" /> Price <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="fancy-input-field"
                                        placeholder="e.g., 99.99"
                                        required={isPaid}
                                    />
                                </div>
                            )}

                            {/* Course Description - spans two columns */}
                            <div className="md:col-span-2">
                                <label htmlFor="courseDescription" className="input-label">
                                    <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" /> Course Description <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    id="courseDescription"
                                    rows="5"
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    className="fancy-input-field resize-y"
                                    placeholder="Explain what the course covers, target audience, and learning outcomes in detail..."
                                    required
                                ></textarea>
                            </div>

                            {/* Course Image - spans two columns */}
                            <div className="md:col-span-2">
                                <label htmlFor="courseImage" className="input-label">
                                    <ImageIcon className="h-4 w-4 mr-2 text-indigo-500" /> Course Image
                                </label>
                                <input
                                    type="file"
                                    id="courseImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-600
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-100 file:text-indigo-700
                                                hover:file:bg-indigo-200 cursor-pointer transition duration-200 ease-in-out"
                                />
                                {courseImagePreview && (
                                    <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-md">
                                        <img src={courseImagePreview} alt="Course Preview" className="w-full h-56 object-cover object-center" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
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
                                        <PlusCircle className="h-6 w-6 mr-3" /> Create Course
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
            {/* Styles for 'input-label' and 'fancy-input-field' must be in your global CSS file. */}
        </UserDashboardContainer>
    );
}