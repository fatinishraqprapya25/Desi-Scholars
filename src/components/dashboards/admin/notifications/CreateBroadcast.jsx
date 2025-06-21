import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BellRing, Send, Users, CheckCircle, XCircle, Lightbulb
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import { useNavigate } from 'react-router-dom';

export default function CreateBroadcastPage() {
    const navigate = useNavigate();
    const adminToken = localStorage.getItem('ASDFDKFFJF');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [audience, setAudience] = useState('both'); // teachers | students | both
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!description.trim()) newErrors.description = 'Description is required.';
        if (!audience) newErrors.audience = 'Audience is required.';
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
            const res = await fetch('http://localhost:5000/api/broadcasts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({ title, description, for: audience }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmissionStatus('success');
                setTitle('');
                setDescription('');
                setAudience('both');
                setTimeout(() => navigate('/admin/notifications'), 1500);
            } else {
                setSubmissionStatus('error');
                setErrors({ general: data.message || 'Failed to create broadcast.' });
            }
        } catch (error) {
            setSubmissionStatus('error');
            setErrors({ general: 'Network error. Please try again.' });
        }
    };

    return (
        <UserDashboardContainer admin={true}>
            <motion.div
                className="p-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold flex items-center mb-4">
                    <BellRing className="mr-2 text-indigo-600" /> Create Broadcast
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Broadcast title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full border rounded px-3 py-2 resize-y ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Detailed broadcast message"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* For/Audience */}
                    <div>
                        <label className="block mb-2 font-medium">Send To</label>
                        <div className="flex gap-6 flex-wrap">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="both"
                                    checked={audience === 'both'}
                                    onChange={() => setAudience('both')}
                                    className="mr-2"
                                />
                                <span className="text-gray-700 flex items-center">
                                    <Users className="w-4 h-4 mr-1" /> Both
                                </span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="teachers"
                                    checked={audience === 'teachers'}
                                    onChange={() => setAudience('teachers')}
                                    className="mr-2"
                                />
                                Teachers
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="students"
                                    checked={audience === 'students'}
                                    onChange={() => setAudience('students')}
                                    className="mr-2"
                                />
                                Students
                            </label>
                        </div>
                        {errors.audience && <p className="text-red-500 text-sm mt-1">{errors.audience}</p>}
                    </div>

                    {/* Status messages */}
                    {submissionStatus === 'loading' && (
                        <div className="text-blue-600 flex items-center text-sm">
                            <Lightbulb className="w-4 h-4 mr-2" /> Sending broadcast...
                        </div>
                    )}
                    {submissionStatus === 'success' && (
                        <div className="text-green-600 flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2" /> Broadcast sent successfully!
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="text-red-600 flex items-center text-sm">
                            <XCircle className="w-4 h-4 mr-2" /> {errors.general || 'Something went wrong.'}
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                        disabled={submissionStatus === 'loading'}
                    >
                        <Send className="inline w-4 h-4 mr-1" /> Send Broadcast
                    </button>
                </form>
            </motion.div>
        </UserDashboardContainer>
    );
}
