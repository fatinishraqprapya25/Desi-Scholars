// src/pages/EditSingleResourcePage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, FileText, Link, Image, Save, Lightbulb } from 'lucide-react';
import UserDashboardContainer from '../../../common/UserDashboardContainer';
import { useNavigate } from 'react-router-dom'; 

let editableResource = {
    id: 'RES-001',
    title: 'Initial React Hooks Cheatsheet',
    description: 'This is the initial description of the React Hooks Cheatsheet. Feel free to modify it directly.',
    type: 'PDF', 
    resourceLink: '', 
    currentFileName: 'react-hooks-cheatsheet.pdf',
    imageUrl: 'https://via.placeholder.com/150/8A4AF8/FFFFFF?text=Resource+Image' // Placeholder image
};

export default function EditSingleResourcePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState(editableResource.title);
    const [description, setDescription] = useState(editableResource.description);
    const [resourceType, setResourceType] = useState(editableResource.resourceLink ? 'link' : 'file');
    const [resourceLink, setResourceLink] = useState(editableResource.resourceLink);
    const [resourceFile, setResourceFile] = useState(null);
    const [imageFile, setImageFile] = useState(null); 
    const [submissionStatus, setSubmissionStatus] = useState(null); 

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        editableResource.title = title;
        editableResource.description = description;
        editableResource.resourceLink = resourceType === 'link' ? resourceLink : ''; 
        setTimeout(() => {
            setSubmissionStatus('success');
            console.log('Updated Resource Data:', editableResource);
            alert(`Resource "${editableResource.title}" (ID: ${editableResource.id}) updated successfully!`);

       
            setTimeout(() => setSubmissionStatus(null), 2000);
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
                    <Edit className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" /> Edit Resource: {editableResource.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Modify the details of the **single hardcoded resource**. Changes will update the data in memory.
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
                                Resource Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="Enter resource title"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-y"
                                placeholder="Provide a description of the resource content."
                            ></textarea>
                        </div>

                        {/* Resource File/Link Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resource Content Type
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
                                    Upload New Resource File (for demonstration only)
                                </label>
                                <input
                                    type="file"
                                    id="resourceFile"
                                    onChange={(e) => setResourceFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                                />
                                {resourceFile ? (
                                    <p className="mt-2 text-sm text-gray-600">New file selected: <span className="font-medium">{resourceFile.name}</span></p>
                                ) : (
                                    editableResource.currentFileName && <p className="mt-2 text-sm text-gray-600">Currently associated file (mock): <span className="font-medium">{editableResource.currentFileName}</span></p>
                                )}
                            </div>
                        )}

                        {resourceType === 'link' && (
                            <div>
                                <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700 mb-1">
                                    Resource Link
                                </label>
                                <input
                                    type="url"
                                    id="resourceLink"
                                    value={resourceLink}
                                    onChange={(e) => setResourceLink(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="E.g., https://example.com/my-resource.pdf"
                                />
                            </div>
                        )}

                        {/* Image Upload (Optional) */}
                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                                Upload New Thumbnail Image (Optional - for demonstration only)
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
                            {imageFile ? (
                                <p className="mt-2 text-sm text-gray-600">New image selected: <span className="font-medium">{imageFile.name}</span></p>
                            ) : (
                                editableResource.imageUrl && (
                                    <div className="mt-2 flex items-center space-x-2">
                                        <p className="text-sm text-gray-600">Current image preview:</p>
                                        <img src={editableResource.imageUrl} alt="Current Thumbnail" className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                                    </div>
                                )
                            )}
                        </div>

                        {/* Submission Status Message */}
                        {submissionStatus === 'loading' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-blue-100 text-blue-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Saving changes to the single resource...
                            </motion.div>
                        )}
                        {submissionStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center text-sm"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" /> Resource updated successfully!
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
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