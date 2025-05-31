function Profile() {
    // Mock user data
    const user = {
        name: 'Jane Doe',
        studentId: 'S123456',
        email: 'jane.doe@example.com',
        major: 'Computer Science',
        enrollmentDate: '2023-09-01',
        bio: 'Passionate about coding and learning new technologies. Enjoys solving complex problems.',
    };

    const handleMessageInstructor = () => {
        alert('Opening message composer to instructor...');
        // In a real app, this would open a messaging interface
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2 text-center">Your Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <User className="h-12 w-12 text-blue-600" />
                    <div>
                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">Student ID: {user.studentId}</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-700">Email:</p>
                    <p className="text-base text-gray-800">{user.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-700">Major:</p>
                    <p className="text-base text-gray-800">{user.major}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-700">Enrollment Date:</p>
                    <p className="text-base text-gray-800">{user.enrollmentDate}</p>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                <p className="text-sm font-medium text-gray-700 mb-2">About Me:</p>
                <p className="text-base text-gray-800 leading-relaxed">{user.bio}</p>
            </div>

            <button
                onClick={handleMessageInstructor}
                className="w-full bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center shadow-md"
            >
                <MessageSquare className="mr-2 h-5 w-5" /> Message Instructor
            </button>
        </div>
    );
}
