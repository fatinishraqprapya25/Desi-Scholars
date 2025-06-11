import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BellRing, Send, UploadCloud, Users, CheckCircle, XCircle, Lightbulb
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import { useNavigate } from 'react-router-dom';

export default function CreateBroadcastPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [audience, setAudience] = useState('both'); // 'teachers', 'students', 'both'
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'loading'

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
        if (!audience) newErrors.audience = 'Audience selection is required.'; // Should not happen with default

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading'); // Indicate loading state
        setErrors({}); // Clear previous errors

        if (!validateForm()) {
            setSubmissionStatus('error');
            return;
        }

        // Simulate API call to send broadcast
        console.log('Sending Broadcast:', {
            title,
            message,
            audience,
            imageFile: imageFile ? imageFile.name : null,
            // In a real app, you would send the actual file data (e.g., via FormData)
        });

        setTimeout(() => {
            alert('Broadcast sent successfully! (Check console for data)');
            setSubmissionStatus('success');
            // Clear form
            setTitle('');
            setMessage('');
            setImageFile(null);
            setAudience('both');
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
                    <BellRing className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Create New Broadcast
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Compose a new broadcast message to be sent to teachers, students, or both.
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
                                Upload Image (Optional)
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
                            {imageFile && (
                                <p className="mt-2 text-sm text-gray-600">Selected image: <span className="font-medium">{imageFile.name}</span></p>
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
                                <Lightbulb className="h-4 w-4 mr-2" /> Sending broadcast...
                            </motion.div>
                        )}
                        {submissionStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm"
                            >
                                <CheckCircle className="h-4 w-4 mr-2" /> Broadcast sent successfully!
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
                                <Send className="h-5 w-5 mr-2" /> Send Broadcast
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}