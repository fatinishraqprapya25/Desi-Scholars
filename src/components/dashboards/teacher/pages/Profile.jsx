// import User from "./UserDashboardHome";
import { MessageSquare, User, Edit, Save, XCircle } from 'lucide-react';
import { useState } from 'react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function MyProfile() {
    // Mock user data
    const initialUser = {
        name: 'Jane Doe',
        studentId: 'S123456',
        email: 'jane.doe@example.com',
        major: 'Computer Science',
        enrollmentDate: '2023-09-01',
        bio: 'Passionate about coding and learning new technologies. Enjoys solving complex problems.',
    };

    const [user, setUser] = useState(initialUser);
    const [editableUser, setEditableUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Handle input changes for editable fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Save changes
    const handleSaveClick = () => {
        setUser(editableUser); // In a real application, you would send this data to a backend
        setIsEditing(false);
        console.log('Profile saved:', editableUser); // For demonstration
    };

    // Cancel changes
    const handleCancelClick = () => {
        setEditableUser(user); // Revert to original user data
        setIsEditing(false);
    };

    // Show message instructor modal
    const handleMessageInstructor = () => {
        setShowModal(true);
    };

    // Close message instructor modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <UserDashboardContainer role="teacher">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2 text-center">Your Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Name Field */}
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <User className="h-12 w-12 text-blue-600" />
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableUser.name}
                                    onChange={handleChange}
                                    className="text-lg font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-1"
                                />
                            ) : (
                                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                            )}
                            <p className="text-sm text-gray-600">Student ID: {user.studentId}</p>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-700">Email:</p>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={editableUser.email}
                                onChange={handleChange}
                                className="text-base text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-1 w-full"
                            />
                        ) : (
                            <p className="text-base text-gray-800">{user.email}</p>
                        )}
                    </div>

                    {/* Major Field */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-700">Major:</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="major"
                                value={editableUser.major}
                                onChange={handleChange}
                                className="text-base text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-1 w-full"
                            />
                        ) : (
                            <p className="text-base text-gray-800">{user.major}</p>
                        )}
                    </div>

                    {/* Enrollment Date (not editable in this example, but could be) */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-700">Enrollment Date:</p>
                        <p className="text-base text-gray-800">{user.enrollmentDate}</p>
                    </div>
                </div>

                {/* Bio Field */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                    <p className="text-sm font-medium text-gray-700 mb-2">About Me:</p>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={editableUser.bio}
                            onChange={handleChange}
                            rows="4"
                            className="text-base text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-2 w-full"
                        ></textarea>
                    ) : (
                        <p className="text-base text-gray-800 leading-relaxed">{user.bio}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                    {!isEditing ? (
                        <button
                            onClick={handleEditClick}
                            className="w-full sm:w-auto bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center shadow-md"
                        >
                            <Edit className="mr-2 h-5 w-5" /> Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSaveClick}
                                className="w-full sm:w-auto bg-green-600 text-white py-3 px-5 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center shadow-md"
                            >
                                <Save className="mr-2 h-5 w-5" /> Save Changes
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="w-full sm:w-auto bg-red-600 text-white py-3 px-5 rounded-lg hover:bg-red-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center shadow-md"
                            >
                                <XCircle className="mr-2 h-5 w-5" /> Cancel
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={handleMessageInstructor}
                    className="w-full bg-indigo-600 text-white py-3 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center shadow-md"
                >
                    <MessageSquare className="mr-2 h-5 w-5" /> Message Instructor
                </button>

                {/* Message Instructor Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Instructor</h3>
                            <p className="text-gray-700 mb-6">This is a placeholder for your messaging interface. In a real application, you would have a form here to compose and send a message.</p>
                            <button
                                onClick={handleCloseModal}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </UserDashboardContainer>
    );
}