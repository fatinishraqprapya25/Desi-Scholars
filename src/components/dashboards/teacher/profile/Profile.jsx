import { User, Edit, Save, XCircle, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import validateTeacher from "../../../../utils/ValidateTeacher";

export default function Profile() {
    const [user, setUser] = useState({});
    const [editableUser, setEditableUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const retrieveUserInfo = async () => {
            const teacher = await validateTeacher();
            const response = await fetch(`http://localhost:5000/api/teacher/${teacher._id}`);
            const result = await response.json();
            setUser(result.data);
            setEditableUser(result.data);
        };
        retrieveUserInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setUser(editableUser);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditableUser(user);
        setImageFile(null);
        setIsEditing(false);
    };

    return (
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
                                value={editableUser.name || ''}
                                onChange={handleChange}
                                className="text-lg font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-1"
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                        )}
                        <p className="text-sm text-gray-600">ID: {user._id}</p>
                    </div>
                </div>

                {/* Email Field */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-700">Email:</p>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={editableUser.email || ''}
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
                            value={editableUser.major || ''}
                            onChange={handleChange}
                            className="text-base text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 rounded-md p-1 w-full"
                        />
                    ) : (
                        <p className="text-base text-gray-800">{user.major}</p>
                    )}
                </div>

                {/* Image Upload Field (Only when editing) */}
                {isEditing && (
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-700 mb-1">Profile Image:</p>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <UploadCloud className="text-blue-600 w-5 h-5" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <span className="text-sm text-gray-600">Choose file</span>
                            {imageFile && <span className="text-xs text-gray-500 ml-2 truncate">{imageFile.name}</span>}
                        </label>
                    </div>
                )}
            </div>

            {/* Bio Field */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                <p className="text-sm font-medium text-gray-700 mb-2">About Me:</p>
                {isEditing ? (
                    <textarea
                        name="bio"
                        value={editableUser.bio || ''}
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
        </div>
    );
}
