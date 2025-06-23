import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Image, Trash2, PlusCircle } from 'lucide-react';
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

    const [showVideoForm, setShowVideoForm] = useState(false);
    const [newVideo, setNewVideo] = useState({ title: '', link: '' });

    const adminToken = localStorage.getItem("ASDFDKFFJF");

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
            } catch (err) {
                setError('Network error or server unavailable. Please try again.');
                console.error("Error fetching details:", err);
            } finally {
                setLoading(false);
            }

            // fetch learnings here
            const learningsResponse = await fetch("http://localhost:5000/api/matrials");
            if (!learningsResponse.ok) {
                alert("failed to fetch matrials");
                return;
            }
            const learningResult = await learningsResponse.json();
            if (!learningResult.success) {
                alert(learningResult.message);
                return;
            }
            setCourseMatrials(learningResult.data);
        };

        fetchData();
    }, [id, adminToken]);


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

                    <div className="md:col-span-2 mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                            <BookOpen className="mr-2 text-indigo-600" /> Course Modules (Videos)
                        </h3>

                        {/* Existing Videos List */}
                        {courseModules && courseModules.length > 0 ? (
                            <div className="space-y-3 mb-6">
                                {courseModules.map((video) => (
                                    <div
                                        key={video._id}
                                        className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                                    >
                                        <div className="flex-1 mr-4">
                                            <strong className="block text-lg font-medium text-gray-800">{video.moduleName}</strong>
                                            <a
                                                href={video.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-800 text-sm truncate block"
                                                style={{ maxWidth: 'calc(100% - 20px)' }}
                                            >
                                                {video.videoLink}
                                            </a>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteModule(video._id)}
                                            className="p-2 text-red-500 hover:text-red-700 transition duration-200 rounded-full hover:bg-red-50"
                                            title="Delete Module"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 mb-6 italic">No modules added yet for this course.</p>
                        )}

                        {/* Toggle Add Form Button */}
                        <button
                            type="button"
                            onClick={() => setShowVideoForm((prev) => !prev)}
                            className="mb-4 px-5 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition duration-200"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" /> {showVideoForm ? 'Cancel Add Video' : 'Add New Video Module'}
                        </button>

                        {/* Add Video Form */}
                        {showVideoForm && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                                <div className="md:col-span-2">
                                    <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                                    <input
                                        id="videoTitle"
                                        type="text"
                                        placeholder="e.g., Introduction to React"
                                        value={newVideo.title}
                                        onChange={(e) => setNewVideo((prev) => ({ ...prev, title: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-1">Video Link (YouTube, Vimeo, etc.)</label>
                                    <input
                                        id="videoLink"
                                        type="url"
                                        placeholder="e.g., https://www.youtube.com/watch?v=..."
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
                    </div>

                    {/* course learnings here */}
                    <div>


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
