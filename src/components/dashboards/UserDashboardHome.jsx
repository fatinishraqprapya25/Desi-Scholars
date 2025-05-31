import React, { useState } from 'react';
import { BookOpen, FileText, FolderOpen, MessageSquare, User, LogOut, CheckCircle, Award, Compass } from 'lucide-react';

// UserDashboard Component
export default function UserDashboardHome() {
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
