import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, FileText, Link, Save, Lightbulb, Loader2 } from 'lucide-react'; // Added Loader2 for loading state
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
    const [resourceFile, setResourceFile] = useState(null); // For new file uploads
    const [imageFile, setImageFile] = useState(null); // For new image uploads
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'loading', 'success', 'error'
    const [errors, setErrors] = useState({}); // For form validation errors

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    // Validate form
    const validateForm = () => {
        let newErrors = {};
        if (!title.trim()) newErrors.title = 'Resource title is required.';
        if (!description.trim()) newErrors.description = 'Description is required.';

        if (resourceType === 'link' && !resourceLink.trim()) {
            newErrors.resourceLink = 'Please provide a resource link.';
        } else if (resourceType === 'link' && resourceLink.trim() && !/^https?:\/\/\S+$/.test(resourceLink)) {
            newErrors.resourceLink = 'Please enter a valid URL.';
        }
        // For file, we don't strictly require a new file on edit,
        // as the existing one might be kept if no new file is uploaded.

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
                } else {
                    // Handle case where resource is not found or API returns an error
                    console.error('Failed to fetch resource:', data.message || 'Unknown error');
                    setSubmissionStatus('error'); // Indicate an error state for fetching
                    navigate('/admin/resources', { replace: true }); // Redirect if not found/error
                }
            } catch (err) {
                console.error('Failed to fetch resource:', err.message);
                setSubmissionStatus('error');
                navigate('/admin/resources', { replace: true });
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [id, navigate]); // Added navigate to dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null); // Clear previous status
        setErrors({}); // Clear previous errors

        if (!validateForm()) {
            setSubmissionStatus('error'); // Indicate form validation error
            return;
        }

        setSubmissionStatus('loading');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', resourceType);

        if (resourceType === 'link') {
            formData.append('url', resourceLink);
        } else if (resourceFile) { // Only append if a new file is selected
            formData.append('resourceFile', resourceFile);
        }

        if (imageFile) { // Only append if a new image is selected
            formData.append('coverPhoto', imageFile);
        }

        try {
            const res = await fetch(`http://localhost:5000/api/resource/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    // Content-Type is NOT set for FormData; browser handles it
                },
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                setSubmissionStatus('success');
                setTimeout(() => navigate('/admin/resources'), 1500); // Redirect on success
            } else {
                setSubmissionStatus('error');
                setErrors({ general: result.message || 'Update failed' });
                // console.error('API Error:', result.message);
            }
        } catch (err) {
            console.error('Submission error:', err);
            setSubmissionStatus('error');
            setErrors({ general: 'Something went wrong. Please try again.' });
        }
    };

    if (loading) {
        return (
            <UserDashboardContainer role="admin">
                <div className="flex justify-center items-center h-screen-75 text-gray-600">
                    <Loader2 className="animate-spin mr-3 h-6 w-6 text-purple-500" />
                    <p className="text-lg">Loading resource data...</p>
                </div>
            </UserDashboardContainer>
        );
    }

    if (!resourceData && !loading) {
        return (
            <UserDashboardContainer role="admin">
                <div className="flex flex-col justify-center items-center h-screen-75 text-red-600">
                    <Lightbulb className="h-10 w-10 mb-4" />
                    <p className="text-xl font-semibold">Resource not found or failed to load.</p>
                    <button
                        onClick={() => navigate('/admin/resources')}
                        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition"
                    >
                        Go Back to Resources
                    </button>
                </div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer role="admin">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <Edit className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" /> Edit Resource: {resourceData?.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Update the details for this educational resource. Fields with <span className="text-red-500">*</span> are required.
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
                                Resource Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="E.g., Advanced React Patterns Guide"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-y ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Provide a comprehensive description of the resource content."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Resource File/Link Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resource Content Type <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-6"> {/* Increased spacing */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        name="resourceType"
                                        value="file"
                                        checked={resourceType === 'file'}
                                        onChange={() => setResourceType('file')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center"><FileText className="h-4 w-4 mr-1" /> File Upload</span>
                                </label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                        name="resourceType"
                                        value="link"
                                        checked={resourceType === 'link'}
                                        onChange={() => setResourceType('link')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center"><Link className="h-4 w-4 mr-1" /> External Link</span>
                                </label>
                            </div>
                        </div>

                        {/* Conditional File Upload or Link Input */}
                        {resourceType === 'link' && (
                            <div>
                                <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    id="resourceLink"
                                    value={resourceLink}
                                    onChange={(e) => setResourceLink(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.resourceLink ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="E.g., https://example.com/my-resource.pdf"
                                />
                                {errors.resourceLink && <p className="mt-1 text-sm text-red-600">{errors.resourceLink}</p>}
                            </div>
                        )}

                        {resourceType === 'file' && (
                            <div>
                                <label htmlFor="resourceFile" className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload New Resource File (Optional, current file will be replaced)
                                </label>
                                <input
                                    type="file"
                                    id="resourceFile"
                                    onChange={(e) => setResourceFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100 transition-colors duration-200"
                                />
                                {resourceFile && (
                                    <p className="mt-2 text-sm text-gray-600">Selected new file: <span className="font-medium">{resourceFile.name}</span></p>
                                )}
                                {/* Display current file name if applicable and no new file selected */}
                                {!resourceFile && resourceData?.resourceFile && (
                                    <p className="mt-2 text-sm text-gray-600">Current file: <span className="font-medium">{resourceData.resourceFile.split('/').pop()}</span></p>
                                )}
                            </div>
                        )}

                        {/* Image Upload (Optional) */}
                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                                Upload New Thumbnail Image (Optional, current image will be replaced)
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
                  hover:file:bg-purple-100 transition-colors duration-200"
                            />
                            {imageFile && (
                                <p className="mt-2 text-sm text-gray-600">Selected new image: <span className="font-medium">{imageFile.name}</span></p>
                            )}
                            {/* Display current cover photo */}
                            {!imageFile && resourceData?.coverPhoto && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-1">Current Cover:</p>
                                    <img
                                        src={`http://localhost:5000/${resourceData.coverPhoto.replace(/\\/g, '/')}`}
                                        alt="Current Cover"
                                        className="h-32 w-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submission Status Message */}
                        {submissionStatus === 'loading' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-blue-50 text-blue-800 rounded-lg flex items-center text-sm"
                            >
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating resource...
                            </motion.div>
                        )}
                        {submissionStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Resource updated successfully! Redirecting...
                            </motion.div>
                        )}
                        {submissionStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-100 text-red-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Failed to update resource. Please fix the errors.
                                {errors.general && <span className="ml-2 font-medium">{errors.general}</span>}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={submissionStatus === 'loading'}
                            >
                                <Save className="h-5 w-5 mr-2" /> Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}