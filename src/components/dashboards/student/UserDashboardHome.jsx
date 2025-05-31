import React, { useState } from 'react';
import { BookOpen, FileText, FolderOpen, CheckCircle, Award, Compass } from 'lucide-react';
import EnrolledCourses from './EnrolledCourses';
import PracticeTest from './PracticeTest';

// UserDashboard Component
export default function UserDashboardHome() {

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
            <EnrolledCourses />

            {/* Practice Tests & Resources Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <PracticeTest />

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
