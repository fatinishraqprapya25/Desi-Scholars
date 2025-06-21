import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BellRing, Send, UploadCloud, Users, CheckCircle, XCircle, Lightbulb, Edit
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function EditBroadcastPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [audience, setAudience] = useState('both');
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const adminToken = localStorage.getItem('ASDFDKFFJF');

    useEffect(() => {
        const fetchBroadcast = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/broadcasts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${adminToken}`
                    }
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    const broadcast = data.data;
                    setTitle(broadcast.title);
                    setMessage(broadcast.description);
                    setAudience(broadcast.audience || 'both');
                    setExistingImage(broadcast.image || '');
                } else {
                    console.error(data.message);
                }
            } catch (err) {
                console.error('Failed to fetch broadcast:', err);
            }
        };

        fetchBroadcast();
    }, [id]);

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

        try {
            const payload = {
                title,
                description: message,
                for: audience,
                existingImage,
            };

            const res = await fetch(`http://localhost:5000/api/broadcasts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmissionStatus('success');
                setTimeout(() => navigate('/admin/notifications'), 1500);
            } else {
                setSubmissionStatus('error');
                setErrors({ general: data.message });
            }
        } catch (err) {
            setSubmissionStatus('error');
            setErrors({ general: 'Something went wrong while updating.' });
        }
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

                        {submissionStatus === 'loading' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-blue-100 text-blue-800 rounded-lg flex items-center text-sm">
                                <Lightbulb className="h-4 w-4 mr-2" /> Updating broadcast...
                            </motion.div>
                        )}
                        {submissionStatus === 'success' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 mr-2" /> Broadcast updated successfully!
                            </motion.div>
                        )}
                        {submissionStatus === 'error' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-100 text-red-800 rounded-lg flex items-center text-sm">
                                <XCircle className="h-4 w-4 mr-2" /> Please fix the errors above.
                                {errors.general && <span className="ml-2">{errors.general}</span>}
                            </motion.div>
                        )}

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