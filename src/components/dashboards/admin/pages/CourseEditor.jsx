import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Image } from 'lucide-react'; // Only import necessary icons
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function CourseEditor() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // live courses option
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [newVideo, setNewVideo] = useState({ title: '', link: '' });

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.success) {
                    setCourseData(result.data);
                    setPreviewImage(`http://localhost:5000/${result.data.courseImage}`);
                } else {
                    setError(result.message || 'Failed to fetch course details.');
                }
            } catch (err) {
                setError('Network error or server unavailable. Please try again.');
                console.error("Error fetching course details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourseDetails();
        } else {
            setError("No course ID provided in the URL.");
            setLoading(false);
        }
    }, [id]);

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
            const adminToken = localStorage.getItem("ASDFDKFFJF");
            const formData = new FormData();
            for (let key in courseData) {
                if (key === 'startTime' && courseData[key]) {
                    formData.append(key, new Date(courseData[key]).toISOString());
                } else {
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
            console.log(err.message);
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

                    {/* Instructor Name */}
                    <div>
                        <label htmlFor="instructorName" className="block text-sm font-semibold text-gray-700 mb-2">Instructor Name</label>
                        <input
                            id="instructorName"
                            type="text"
                            name="instructorName"
                            value={courseData.instructorName || ''}
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
                            onChange={(e) => setCourseData((prev) => ({ ...prev, isPaid: e.target.value === 'true' }))}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            <option value="true">Paid</option>
                            <option value="false">Free</option>
                        </select>
                    </div>

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

                    {/* for live courses, if previous uploaded videos are avalable */}
                    {courseData.courseType === 'live' && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Previous Videos
                            </label>

                            {/* Existing Videos List */}
                            {courseData.previousVideos?.length > 0 ? (
                                <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                                    {courseData.previousVideos.map((video, index) => (
                                        <li key={index}>
                                            <strong>{video.title}:</strong>{' '}
                                            <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                                                Watch
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 mb-4">No previous videos added.</p>
                            )}

                            {/* Toggle Add Form */}
                            <button
                                type="button"
                                onClick={() => setShowVideoForm((prev) => !prev)}
                                className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                            >
                                {showVideoForm ? 'Cancel' : 'Add New Video'}
                            </button>

                            {/* Add Video Form */}
                            {showVideoForm && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Video Title"
                                        value={newVideo.title}
                                        onChange={(e) => setNewVideo((prev) => ({ ...prev, title: e.target.value }))}
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        type="url"
                                        placeholder="Video Link"
                                        value={newVideo.link}
                                        onChange={(e) => setNewVideo((prev) => ({ ...prev, link: e.target.value }))}
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <div className="md:col-span-2">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                        >
                                            Add Video
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}



                    {/* Update Button */}
                    <div className="md:col-span-2 mt-6">
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating Course...' : 'Update Course'}
                        </button>
                    </div>
                </div>


            </div>
        </UserDashboardContainer>
    );
}