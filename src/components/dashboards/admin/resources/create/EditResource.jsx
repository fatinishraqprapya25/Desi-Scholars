import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, FileText, Link, Save, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../../common/UserDashboardContainer';
import { useNavigate, useParams } from 'react-router-dom';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

export default function EditSingleResourcePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [resourceData, setResourceData] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [resourceType, setResourceType] = useState('file');
    const [resourceLink, setResourceLink] = useState('');
    const [resourceFile, setResourceFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    // Fetch resource data on load
    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/resource/${id}`);
                const data = await res.json();
                if (data.success) {
                    setResourceData(data.data);
                    setTitle(data.data.title || '');
                    setDescription(data.data.description || '');
                    setResourceType(data.data.type === 'link' ? 'link' : 'file');
                    setResourceLink(data.data.url || '');
                }
            } catch (err) {
                console.error('Failed to fetch resource:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', resourceType);
        if (resourceType === 'link') {
            formData.append('url', resourceLink);
        }
        if (resourceFile) {
            formData.append('resourceFile', resourceFile);
        }
        if (imageFile) {
            formData.append('coverPhoto', imageFile);
        }

        try {
            const res = await fetch(`http://localhost:5000/api/resource/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                setSubmissionStatus('success');
                setTimeout(() => navigate('/admin/resources'), 1500);
            } else {
                throw new Error(result.message || 'Update failed');
            }
        } catch (err) {
            console.error(err);
            setSubmissionStatus('error');
        }
    };

    if (loading || !resourceData) {
        return <div className="text-center py-10 text-gray-600">Loading resource...</div>;
    }

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Edit className="mr-2 text-purple-600" /> Edit Resource
                </h2>

                <motion.div
                    className="bg-white rounded-xl shadow-md p-6 border"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg resize-y"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="file"
                                        checked={resourceType === 'file'}
                                        onChange={() => setResourceType('file')}
                                        className="mr-1"
                                    />
                                    <FileText className="w-4 h-4 mr-1" /> File
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="link"
                                        checked={resourceType === 'link'}
                                        onChange={() => setResourceType('link')}
                                        className="mr-1"
                                    />
                                    <Link className="w-4 h-4 mr-1" /> Link
                                </label>
                            </div>
                        </div>

                        {resourceType === 'link' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resource URL</label>
                                <input
                                    type="url"
                                    value={resourceLink}
                                    onChange={(e) => setResourceLink(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="https://..."
                                />
                            </div>
                        )}

                        {resourceType === 'file' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New File (optional)</label>
                                <input type="file" onChange={(e) => setResourceFile(e.target.files[0])} />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (optional)</label>
                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            {!imageFile && resourceData.coverPhoto && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-1">Current Cover:</p>
                                    <img
                                        src={`http://localhost:5000/${resourceData.coverPhoto.replace(/\\/g, '/')}`}
                                        alt="Current Cover"
                                        className="h-32 w-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>

                        {submissionStatus === 'loading' && (
                            <p className="text-blue-600 text-sm flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" /> Updating resource...
                            </p>
                        )}
                        {submissionStatus === 'success' && (
                            <p className="text-green-600 text-sm">Resource updated successfully!</p>
                        )}
                        {submissionStatus === 'error' && (
                            <p className="text-red-600 text-sm">Failed to update. Please try again.</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                            disabled={submissionStatus === 'loading'}
                        >
                            <Save className="inline-block mr-2 h-4 w-4" /> Save Changes
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}
