import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Image, Trash2, PlusCircle, Edit } from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function CourseEditor() {
    const { id } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [courseModules, setCourseModules] = useState([]);
    const [courseMatrials, setCourseMatrials] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // State for adding new video module
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [newVideo, setNewVideo] = useState({ title: '', link: '' });

    // State for editing video module
    const [editingModuleId, setEditingModuleId] = useState(null);
    const [editVideo, setEditVideo] = useState({ title: '', link: '' });

    // State for adding new learning material
    const [showLearningForm, setShowLearningForm] = useState(false);
    const [newLearning, setNewLearning] = useState({ title: '' });

    // State for editing learning material
    const [editingLearningId, setEditingLearningId] = useState(null);
    const [editLearning, setEditLearning] = useState({ title: '' });

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("No course ID provided in the URL.");
                setLoading(false);
                return;
            }

            try {
                // Fetch Course Details
                const courseResponse = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (!courseResponse.ok) throw new Error(`HTTP error! status: ${courseResponse.status}`);
                const courseResult = await courseResponse.json();
                if (courseResult.success) {
                    setCourseData(courseResult.data);
                    setPreviewImage(`http://localhost:5000/${courseResult.data.courseImage}`);
                } else {
                    setError(courseResult.message || 'Failed to fetch course details.');
                    setLoading(false);
                    return;
                }

                // Fetch Course Modules
                const modulesResponse = await fetch(`http://localhost:5000/api/modules/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${adminToken}`
                    }
                });
                if (modulesResponse.ok) {
                    const modulesResult = await modulesResponse.json();
                    if (modulesResult.success) {
                        setCourseModules(modulesResult.data);
                    } else {
                        console.warn("Failed to fetch course modules:", modulesResult.message);
                        setCourseModules([]);
                    }
                } else {
                    console.error("Error fetching course modules:", modulesResponse.statusText);
                    setCourseModules([]);
                }

                // Fetch Learnings (Course Materials)
                const materialsResponse = await fetch(`http://localhost:5000/api/matrials/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                        "Authorization": `Bearer ${adminToken}`
                    }
                });
                if (materialsResponse.ok) {
                    const materialsResult = await materialsResponse.json();
                    if (materialsResult.success) {
                        setCourseMatrials(materialsResult.data);
                    } else {
                        console.warn("Failed to fetch course materials:", materialsResult.message);
                        setCourseMatrials([]);
                    }
                } else {
                    console.error("Error fetching course materials:", materialsResponse.statusText);
                    setCourseMatrials([]);
                }

            } catch (err) {
                setError('Network error or server unavailable. Please try again.');
                console.error("Error fetching details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, adminToken]);

    // --- Module (Video) Functions ---
    const addModule = async () => {
        if (!newVideo.title || !newVideo.link) {
            alert("Please provide both title and link for the video.");
            return;
        }

        try {
            const moduleToAdd = {
                courseId: id,
                moduleName: newVideo.title,
                videoLink: newVideo.link,
            };
            const response = await fetch("http://localhost:5000/api/modules", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(moduleToAdd)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseModules((prevModules) => [...prevModules, result.data]);
                setNewVideo({ title: '', link: '' });
                setShowVideoForm(false);
                alert("Module added successfully!");
            } else {
                throw new Error(result.message || "Failed to add module.");
            }
        } catch (err) {
            alert("Error adding module: " + err.message);
            console.error("Error adding module:", err);
        }
    };

    const handleDeleteModule = async (moduleId) => {
        if (!window.confirm("Are you sure you want to delete this module?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/modules/${moduleId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseModules((prevModules) => prevModules.filter((module) => module._id !== moduleId));
                alert("Module deleted successfully!");
            } else {
                throw new Error(result.message || "Failed to delete module.");
            }
        } catch (err) {
            alert("Error deleting module: " + err.message);
            console.error("Error deleting module:", err);
        }
    };

    const handleEditModule = (module) => {
        setEditingModuleId(module._id);
        setEditVideo({ title: module.moduleName, link: module.videoLink });
        setShowVideoForm(false); // Hide add form if showing
    };

    const handleUpdateModule = async () => {
        if (!editVideo.title || !editVideo.link) {
            alert("Please provide both title and link for the video module.");
            return;
        }

        try {
            const updatedModule = {
                moduleName: editVideo.title,
                videoLink: editVideo.link,
            };
            const response = await fetch(`http://localhost:5000/api/modules/${editingModuleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(updatedModule)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseModules((prevModules) =>
                    prevModules.map((module) =>
                        module._id === editingModuleId ? { ...module, moduleName: editVideo.title, videoLink: editVideo.link } : module
                    )
                );
                setEditingModuleId(null);
                setEditVideo({ title: '', link: '' });
                alert("Module updated successfully!");
            } else {
                throw new Error(result.message || "Failed to update module.");
            }
        } catch (err) {
            alert("Error updating module: " + err.message);
            console.error("Error updating module:", err);
        }
    };

    // --- Learning Material Functions ---
    const addLearning = async () => {
        if (!newLearning.title) {
            alert("Please provide a title for the learning material.");
            return;
        }

        try {
            const learningToAdd = {
                courseId: id,
                title: newLearning.title,
            };
            const response = await fetch("http://localhost:5000/api/matrials", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(learningToAdd)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseMatrials((prevMatrials) => [...prevMatrials, result.data]);
                setNewLearning({ title: '' });
                setShowLearningForm(false);
                alert("Learning material added successfully!");
            } else {
                throw new Error(result.message || "Failed to add learning material.");
            }
        } catch (err) {
            alert("Error adding learning material: " + err.message);
            console.error("Error adding learning material:", err);
        }
    };

    const handleDeleteLearning = async (learningId) => {
        if (!window.confirm("Are you sure you want to delete this learning material?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/matrials/${learningId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseMatrials((prevMatrials) => prevMatrials.filter((material) => material._id !== learningId));
                alert("Learning material deleted successfully!");
            } else {
                throw new Error(result.message || "Failed to delete learning material.");
            }
        } catch (err) {
            alert("Error deleting learning material: " + err.message);
            console.error("Error deleting learning material:", err);
        }
    };

    const handleEditLearning = (learning) => {
        setEditingLearningId(learning._id);
        setEditLearning({ title: learning.title });
        setShowLearningForm(false); // Hide add form if showing
    };

    const handleUpdateLearning = async () => {
        if (!editLearning.title) {
            alert("Please provide a title for the learning material.");
            return;
        }

        try {
            const updatedLearning = {
                title: editLearning.title,
            };
            const response = await fetch(`http://localhost:5000/api/matrials/${editingLearningId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${adminToken}`
                },
                body: JSON.stringify(updatedLearning)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setCourseMatrials((prevMatrials) =>
                    prevMatrials.map((material) =>
                        material._id === editingLearningId ? { ...material, title: editLearning.title } : material
                    )
                );
                setEditingLearningId(null);
                setEditLearning({ title: '' });
                alert("Learning material updated successfully!");
            } else {
                throw new Error(result.message || "Failed to update learning material.");
            }
        } catch (err) {
            alert("Error updating learning material: " + err.message);
            console.error("Error updating learning material:", err);
        }
    };

    // --- Course Details Update ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            for (let key in courseData) {
                if (key === 'startTime' && courseData[key]) {
                    formData.append(key, new Date(courseData[key]).toISOString());
                } else if (key !== 'courseImage') {
                    formData.append(key, courseData[key]);
                }
            }
            if (imageFile) {
                formData.append('courseImage', imageFile);
            }

            const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                },
                body: formData
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.message);
            alert("Course updated successfully!");
        } catch (err) {
            console.error("Failed to update course:", err);
            alert("Failed to update course: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <UserDashboardContainer role="admin">
                <div className="text-center py-20 text-lg font-medium text-gray-700">Loading course details...</div>
            </UserDashboardContainer>
        );
    }

    if (error) {
        return (
            <UserDashboardContainer role="admin">
                <div className="text-center py-20 text-xl font-semibold text-red-600">{error}</div>
            </UserDashboardContainer>
        );
    }

    if (!courseData) {
        return (
            <UserDashboardContainer role="admin">
                <div className="text-center py-20 text-xl font-semibold text-red-600">Course data not found.</div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer role="admin">
            <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-xl my-8">
                <h2 className="text-3xl font-extrabold mb-8 flex items-center text-gray-800">
                    <BookOpen className="mr-3 text-indigo-600 w-8 h-8" /> Edit Course Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    {/* Course Name */}
                    <div>
                        <label htmlFor="courseName" className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
                        <input
                            id="courseName"
                            type="text"
                            name="courseName"
                            value={courseData.courseName || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        />
                    </div>

                    {/* Instructor Id */}
                    <div>
                        <label htmlFor="instructorId" className="block text-sm font-semibold text-gray-700 mb-2">Instructor's ID</label>
                        <input
                            id="instructorId"
                            type="text"
                            name="instructorId"
                            value={courseData.instructorId || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        />
                    </div>

                    {/* Course Type */}
                    <div>
                        <label htmlFor="courseType" className="block text-sm font-semibold text-gray-700 mb-2">Course Type</label>
                        <select
                            id="courseType"
                            name="courseType"
                            value={courseData.courseType || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            <option value="recorded">Recorded</option>
                            <option value="live">Live</option>
                        </select>
                    </div>

                    {/* Start Date (Conditional for Live courses) */}
                    {courseData.courseType === 'live' && (
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                            <input
                                id="startTime"
                                type="date"
                                name="startTime"
                                value={courseData.startTime ? courseData.startTime.slice(0, 10) : ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            />
                        </div>
                    )}

                    {/* Course Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Course Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={courseData.description || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            rows="5"
                        ></textarea>
                    </div>

                    {/* Course Status */}
                    <div>
                        <label htmlFor="courseStatus" className="block text-sm font-semibold text-gray-700 mb-2">Course Status</label>
                        <select
                            id="courseStatus"
                            name="courseStatus"
                            value={courseData.courseStatus || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Is Paid */}
                    <div>
                        <label htmlFor="isPaid" className="block text-sm font-semibold text-gray-700 mb-2">Is Paid</label>
                        <select
                            id="isPaid"
                            name="isPaid"
                            value={courseData.isPaid ? 'true' : 'false'}
                            onChange={(e) => {
                                const isPaid = e.target.value === 'true';
                                setCourseData((prev) => ({
                                    ...prev,
                                    isPaid,
                                    price: isPaid ? prev.price : '', // clear price if not paid
                                }));
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            <option value="true">Paid</option>
                            <option value="false">Free</option>
                        </select>
                    </div>

                    {/* Price - only if paid */}
                    {courseData.isPaid && (
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (in your currency)
                            </label>
                            <input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                name="price"
                                value={courseData.price || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                placeholder="Enter course price"
                            />
                        </div>
                    )}

                    {/* Course Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="courseImage" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <Image className="w-5 h-5 mr-2 text-indigo-600" /> Course Image
                        </label>
                        <input
                            id="courseImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100 cursor-pointer"
                        />
                        {previewImage && (
                            <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={previewImage}
                                    alt="Course Preview"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Course Modules (Videos) Section */}
                    <div className="md:col-span-2 mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                            <BookOpen className="mr-2 text-indigo-600" /> Course Modules (Videos)
                        </h3>

                        {/* Existing Videos List */}
                        {courseModules && courseModules.length > 0 ? (
                            <div className="space-y-3 mb-6">
                                {courseModules.map((module) => (
                                    <div
                                        key={module._id}
                                        className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <div className="flex-1 mr-4">
                                            <strong className="block text-lg font-medium text-gray-800">{module.moduleName}</strong>
                                            <a
                                                href={module.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-800 text-sm truncate block"
                                                style={{ maxWidth: 'calc(100% - 20px)' }}
                                            >
                                                {module.videoLink}
                                            </a>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditModule(module)}
                                                className="p-2 text-blue-500 hover:text-blue-700 transition duration-200 rounded-full hover:bg-blue-50"
                                                title="Edit Module"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteModule(module._id)}
                                                className="p-2 text-red-500 hover:text-red-700 transition duration-200 rounded-full hover:bg-red-50"
                                                title="Delete Module"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 mb-6 italic">No modules added yet for this course.</p>
                        )}

                        {/* Toggle Add Video Form Button */}
                        {!editingModuleId && ( // Hide add button if editing
                            <button
                                type="button"
                                onClick={() => setShowVideoForm((prev) => !prev)}
                                className="mb-4 px-5 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition duration-200"
                            >
                                <PlusCircle className="w-5 h-5 mr-2" /> {showVideoForm ? 'Cancel Add Video' : 'Add New Video Module'}
                            </button>
                        )}


                        {/* Add Video Form */}
                        {showVideoForm && !editingModuleId && ( // Show add form only if not editing
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                                <div className="md:col-span-2">
                                    <label htmlFor="newVideoTitle" className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                                    <input
                                        id="newVideoTitle"
                                        type="text"
                                        placeholder="e.g., Introduction to React"
                                        value={newVideo.title}
                                        onChange={(e) => setNewVideo((prev) => ({ ...prev, title: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="newVideoLink" className="block text-sm font-medium text-gray-700 mb-1">Video Link (YouTube, Vimeo, etc.)</label>
                                    <input
                                        id="newVideoLink"
                                        type="url"
                                        placeholder="e.g., https://youtube.com/watch?v=example"
                                        value={newVideo.link}
                                        onChange={(e) => setNewVideo((prev) => ({ ...prev, link: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        onClick={addModule}
                                        disabled={!newVideo.title || !newVideo.link}
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add Video Module
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Edit Video Form */}
                        {editingModuleId && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                                <h4 className="md:col-span-2 text-lg font-bold text-blue-800">Editing Module</h4>
                                <div className="md:col-span-2">
                                    <label htmlFor="editVideoTitle" className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                                    <input
                                        id="editVideoTitle"
                                        type="text"
                                        value={editVideo.title}
                                        onChange={(e) => setEditVideo((prev) => ({ ...prev, title: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="editVideoLink" className="block text-sm font-medium text-gray-700 mb-1">Video Link</label>
                                    <input
                                        id="editVideoLink"
                                        type="url"
                                        value={editVideo.link}
                                        onChange={(e) => setEditVideo((prev) => ({ ...prev, link: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2 flex space-x-2">
                                    <button
                                        onClick={handleUpdateModule}
                                        disabled={!editVideo.title || !editVideo.link}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Update Module
                                    </button>
                                    <button
                                        onClick={() => setEditingModuleId(null)} // Cancel Edit
                                        className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Course Learning Topics Section */}
                    <div className="md:col-span-2 mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center mb-4">
                            <BookOpen className="w-7 h-7 text-indigo-600 mr-2" />
                            <h3 className="font-bold text-xl text-gray-800">Course Learning Topics</h3>
                        </div>

                        {/* Existing Learnings List */}
                        {courseMatrials && courseMatrials.length > 0 ? (
                            <div className="space-y-3 mb-6">
                                {courseMatrials.map((material) => (
                                    <div
                                        key={material._id}
                                        className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <div className="flex-1 mr-4">
                                            <strong className="block text-lg font-medium text-gray-800">{material.title}</strong>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditLearning(material)}
                                                className="p-2 text-blue-500 hover:text-blue-700 transition duration-200 rounded-full hover:bg-blue-50"
                                                title="Edit Learning Material"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLearning(material._id)}
                                                className="p-2 text-red-500 hover:text-red-700 transition duration-200 rounded-full hover:bg-red-50"
                                                title="Delete Learning Material"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 italic mb-5">No materials added yet for this course.</p>
                        )}

                        {/* Toggle Add Learning Form Button */}
                        {!editingLearningId && ( // Hide add button if editing
                            <button
                                type="button"
                                onClick={() => setShowLearningForm((prev) => !prev)}
                                className="mb-4 px-5 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition duration-200"
                            >
                                <PlusCircle className="w-5 h-5 mr-2" /> {showLearningForm ? 'Cancel Add Learning' : 'Add New Learning Material'}
                            </button>
                        )}


                        {/* Add Learning Form */}
                        {showLearningForm && !editingLearningId && ( // Show add form only if not editing
                            <div className="grid grid-cols-1 gap-4 mt-4 p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                                <div className="md:col-span-1">
                                    <label htmlFor="newLearningTitle" className="block text-sm font-medium text-gray-700 mb-1">Learning Material Title</label>
                                    <input
                                        id="newLearningTitle"
                                        type="text"
                                        placeholder="e.g., Introduction to React Concepts"
                                        value={newLearning.title}
                                        onChange={(e) => setNewLearning({ title: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <button
                                        onClick={addLearning}
                                        disabled={!newLearning.title}
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add Learning Material
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Edit Learning Form */}
                        {editingLearningId && (
                            <div className="grid grid-cols-1 gap-4 mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                                <h4 className="md:col-span-1 text-lg font-bold text-blue-800">Editing Learning Material</h4>
                                <div className="md:col-span-1">
                                    <label htmlFor="editLearningTitle" className="block text-sm font-medium text-gray-700 mb-1">Learning Material Title</label>
                                    <input
                                        id="editLearningTitle"
                                        type="text"
                                        value={editLearning.title}
                                        onChange={(e) => setEditLearning({ title: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-1 flex space-x-2">
                                    <button
                                        onClick={handleUpdateLearning}
                                        disabled={!editLearning.title}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Update Learning
                                    </button>
                                    <button
                                        onClick={() => setEditingLearningId(null)} // Cancel Edit
                                        className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Update Button */}
                    <div className="md:col-span-2 mt-6">
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating Course...' : 'Update Course Details'}
                        </button>
                    </div>
                </div>
            </div>
        </UserDashboardContainer>
    );
}