import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BellRing, Send, UploadCloud, Users, CheckCircle, XCircle, Lightbulb, Edit
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function EditBroadcastPage() {
    // Dummy broadcast data for demonstration
    const dummyBroadcast = {
        id: 'BROADCAST-XYZ-123', // A fixed dummy ID
        title: 'Important Update: School Closure',
        message: 'Dear all, please be informed that the school will remain closed tomorrow, June 12, 2025, due to unforeseen circumstances. All classes and activities are cancelled. We apologize for any inconvenience.',
        image: 'school_notice.jpg', // Dummy existing image name
        audience: 'both', // 'teachers', 'students', 'both'
    };

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [audience, setAudience] = useState('both');
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'loading'

    // Populate form fields with dummy data on initial render
    useEffect(() => {
        setTitle(dummyBroadcast.title);
        setMessage(dummyBroadcast.message);
        setExistingImage(dummyBroadcast.image);
        setAudience(dummyBroadcast.audience);
    }, []); // Empty dependency array means this runs only once on mount

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const validateForm = () => {
        let newErrors = {};
        if (!title.trim()) newErrors.title = 'Broadcast title is required.';
        if (!message.trim()) newErrors.message = 'Broadcast message is required.';
        if (!audience) newErrors.audience = 'Audience selection is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');
        setErrors({});

        if (!validateForm()) {
            setSubmissionStatus('error');
            return;
        }

        // Simulate API call to update broadcast with dummy ID
        console.log('Updating Broadcast:', {
            id: dummyBroadcast.id, // Use the dummy ID
            title,
            message,
            audience,
            imageFile: imageFile ? imageFile.name : null,
            existingImage, // Can be sent to help backend decide if image changed
        });

        setTimeout(() => {
            alert('Broadcast updated successfully! (Check console for data)');
            setSubmissionStatus('success');
            // In a real app, you might clear submissionStatus or redirect after a delay
        }, 1500);
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
                    <Edit className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Edit Broadcast
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Modify the details of an existing broadcast message.
                </p>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Broadcast Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="E.g., Important Notice: Exam Schedule Change"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Message/Description */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                rows="6"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Write the detailed broadcast message here."
                            ></textarea>
                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        </div>

                        {/* Image Upload (Optional) */}
                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                                Upload New Image (Optional)
                            </label>
                            <input
                                type="file"
                                id="imageFile"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-purple-50 file:text-purple-700
                                    hover:file:bg-purple-100"
                            />
                            {imageFile ? (
                                <p className="mt-2 text-sm text-gray-600">New image selected: <span className="font-medium">{imageFile.name}</span></p>
                            ) : existingImage && (
                                <p className="mt-2 text-sm text-gray-600">Existing image: <span className="font-medium">{existingImage}</span></p>
                            )}
                        </div>

                        {/* Audience Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Send To <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        name="audience"
                                        value="both"
                                        checked={audience === 'both'}
                                        onChange={() => setAudience('both')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center"><Users className="h-4 w-4 mr-1" /> Both Teachers & Students</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        name="audience"
                                        value="teachers"
                                        checked={audience === 'teachers'}
                                        onChange={() => setAudience('teachers')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center">Teachers Only</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        name="audience"
                                        value="students"
                                        checked={audience === 'students'}
                                        onChange={() => setAudience('students')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center">Students Only</span>
                                </label>
                            </div>
                            {errors.audience && <p className="mt-1 text-sm text-red-600">{errors.audience}</p>}
                        </div>

                        {/* Submission Status Message */}
                        {submissionStatus === 'loading' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-blue-100 text-blue-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Updating broadcast...
                            </motion.div>
                        )}
                        {submissionStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm"
                            >
                                <CheckCircle className="h-4 w-4 mr-2" /> Broadcast updated successfully!
                            </motion.div>
                        )}
                        {submissionStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-100 text-red-800 rounded-lg flex items-center text-sm"
                            >
                                <XCircle className="h-4 w-4 mr-2" /> Please fix the errors above.
                                {errors.general && <span className="ml-2">{errors.general}</span>}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                disabled={submissionStatus === 'loading'}
                            >
                                <Send className="h-5 w-5 mr-2" /> Update Broadcast
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}