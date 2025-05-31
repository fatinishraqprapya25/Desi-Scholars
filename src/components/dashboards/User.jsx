import React, { useState } from 'react';
import { BookOpen, FileText, FolderOpen, MessageSquare, User, LogOut, CheckCircle, Award, Compass } from 'lucide-react';

// Main App Component
export default function App() {
    const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' or 'profile'

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col lg:flex-row">
            {/* Sidebar Component */}
            <Sidebar setActiveSection={setActiveSection} />

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
                {activeSection === 'dashboard' ? (
                    <UserDashboard />
                ) : (
                    <Profile />
                )}
            </div>
        </div>
    );
}

// Sidebar Component
function Sidebar({ setActiveSection }) {
    const navItems = [
        { name: 'My Courses', icon: BookOpen, section: 'dashboard' },
        { name: 'Practice Tests', icon: FileText, section: 'dashboard' },
        { name: 'Resources', icon: FolderOpen, section: 'dashboard' },
        { name: 'Messages', icon: MessageSquare, section: 'dashboard' },
        { name: 'Profile', icon: User, section: 'profile' },
        { name: 'Logout', icon: LogOut, section: 'logout' }, // Logout can be a simple action
    ];

    return (
        <aside className="w-full lg:w-64 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg p-4 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">Student Dashboard</h1>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="mb-3">
                                <button
                                    onClick={() => setActiveSection(item.section)}
                                    className="w-full flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    <span className="text-lg font-medium">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="mt-8 text-center text-sm text-blue-200">
                <p>&copy; 2024 Student Portal</p>
            </div>
        </aside>
    );
}

// UserDashboard Component
function UserDashboard() {
    // Mock data for enrolled courses
    const enrolledCourses = [
        {
            id: 1,
            title: 'Introduction to Web Development',
            progress: 75,
            nextLesson: 'CSS Flexbox',
            instructor: 'Dr. Alice Smith',
            lastAccessed: '2 days ago',
        },
        {
            id: 2,
            title: 'Calculus I',
            progress: 40,
            nextLesson: 'Derivatives',
            instructor: 'Prof. John Doe',
            lastAccessed: '5 days ago',
        },
        {
            id: 3,
            title: 'Data Structures and Algorithms',
            progress: 90,
            nextLesson: 'Graph Traversal',
            instructor: 'Ms. Emily White',
            lastAccessed: '1 day ago',
        },
    ];

    // Mock data for recent test scores
    const recentTestScores = [
        { id: 1, testName: 'Web Dev Basics Quiz', score: 85, date: '2024-05-20' },
        { id: 2, testName: 'Algebra Midterm', score: 72, date: '2024-05-15' },
        { id: 3, testName: 'Python Fundamentals', score: 92, date: '2024-05-10' },
    ];

    return (
        <main className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">Welcome Back, Student!</h2>

            {/* Enrolled Courses Section */}
            <section className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <BookOpen className="mr-3 text-blue-600" /> Enrolled Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                        <div key={course.id} className="bg-blue-50 p-5 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-blue-800 mb-2">{course.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-700 mb-4">Progress: {course.progress}% Complete</p>
                            <p className="text-sm text-gray-700 mb-4">Next Lesson: <span className="font-medium">{course.nextLesson}</span></p>
                            <p className="text-xs text-gray-500 mb-4">Last Accessed: {course.lastAccessed}</p>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                                <Compass className="mr-2 h-4 w-4" /> Continue Course
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Practice Tests & Resources Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <FileText className="mr-3 text-green-600" /> Practice Tests
                    </h3>
                    <p className="text-gray-700 mb-4">Sharpen your skills with our extensive collection of practice tests.</p>
                    <button className="w-full bg-green-600 text-white py-3 px-5 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center">
                        <Award className="mr-2 h-5 w-5" /> Attempt a Test
                    </button>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-200">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                        <FolderOpen className="mr-3 text-purple-600" /> Free Resources
                    </h3>
                    <p className="text-gray-700 mb-4">Access a library of free study materials, tutorials, and guides.</p>
                    <button className="w-full bg-purple-600 text-white py-3 px-5 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center">
                        <BookOpen className="mr-2 h-5 w-5" /> Explore Resources
                    </button>
                </div>
            </section>

            {/* Recent Test Scores Section */}
            <section>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <CheckCircle className="mr-3 text-red-600" /> Recent Test Scores
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Test Name</th>
                                <th className="py-3 px-6 text-left">Score</th>
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {recentTestScores.map((score) => (
                                <tr key={score.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{score.testName}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${score.score >= 80 ? 'bg-green-200 text-green-800' : score.score >= 60 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                                            {score.score}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">{score.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

// Profile Component
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
