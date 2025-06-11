// src/pages/CreateResourcePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    PlusCircle, FileText, Link, Image, Lightbulb, Save
} from 'lucide-react';
import UserDashboardContainer from '../../../common/UserDashboardContainer'; 

export default function CreateResourcePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [resourceType, setResourceType] = useState('file'); // 'file' or 'link'
    const [resourceFile, setResourceFile] = useState(null);
    const [resourceLink, setResourceLink] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

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
        if (!title.trim()) newErrors.title = 'Resource title is required.';
        if (!description.trim()) newErrors.description = 'Description is required.';

        if (resourceType === 'file' && !resourceFile) {
            newErrors.resourceFile = 'Please upload a resource file.';
        }
        if (resourceType === 'link' && !resourceLink.trim()) {
            newErrors.resourceLink = 'Please provide a resource link.';
        } else if (resourceType === 'link' && resourceLink.trim() && !/^https?:\/\/\S+$/.test(resourceLink)) {
            newErrors.resourceLink = 'Please enter a valid URL.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null); // Reset status

        if (!validateForm()) {
            setSubmissionStatus('error');
            return;
        }

        console.log('Submitting Resource Data:', {
            title,
            description,
            resourceType,
            resourceFile: resourceFile ? resourceFile.name : null,
            resourceLink,
            imageFile: imageFile ? imageFile.name : null,
        });

        setTimeout(() => {
            alert('Resource created successfully! (Check console for data)');
            setSubmissionStatus('success');
            // Clear form after successful submission
            setTitle('');
            setDescription('');
            setResourceType('file');
            setResourceFile(null);
            setResourceLink('');
            setImageFile(null);
            setErrors({});
        }, 1000);
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
                    <PlusCircle className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Create New Resource
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Use this form to **add new educational resources** to the platform. Provide details, upload files or links, and add an image.
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
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
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
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Provide a comprehensive description of the resource content."
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Resource File/Link Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resource Content Type <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        name="resourceType"
                                        value="file"
                                        checked={resourceType === 'file'}
                                        onChange={() => setResourceType('file')}
                                    />
                                    <span className="ml-2 text-gray-800 flex items-center"><FileText className="h-4 w-4 mr-1" /> File Upload</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600"
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
                        {resourceType === 'file' && (
                            <div>
                                <label htmlFor="resourceFile" className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Resource File
                                    {resourceType === 'file' && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="file"
                                    id="resourceFile"
                                    onChange={(e) => setResourceFile(e.target.files[0])}
                                    className={`block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100 ${errors.resourceFile ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {resourceFile && (
                                    <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-medium">{resourceFile.name}</span></p>
                                )}
                                {errors.resourceFile && <p className="mt-1 text-sm text-red-600">{errors.resourceFile}</p>}
                            </div>
                        )}

                        {resourceType === 'link' && (
                            <div>
                                <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource Link
                                    {resourceType === 'link' && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="url"
                                    id="resourceLink"
                                    value={resourceLink}
                                    onChange={(e) => setResourceLink(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${errors.resourceLink ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="E.g., https://example.com/my-resource.pdf"
                                />
                                {errors.resourceLink && <p className="mt-1 text-sm text-red-600">{errors.resourceLink}</p>}
                            </div>
                        )}

                        {/* Image Upload (Optional) */}
                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Thumbnail Image (Optional)
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
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                            />
                            {imageFile && (
                                <p className="mt-2 text-sm text-gray-600">Selected image: <span className="font-medium">{imageFile.name}</span></p>
                            )}
                            {errors.imageFile && <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>}
                        </div>

                        {/* Submission Status Message */}
                        {submissionStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Resource successfully added!
                            </motion.div>
                        )}
                        {submissionStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-100 text-red-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Please fix the errors above.
                                {errors.general && <span className="ml-2">{errors.general}</span>}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <Save className="h-5 w-5 mr-2" /> Create Resource
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </UserDashboardContainer>
    );
}