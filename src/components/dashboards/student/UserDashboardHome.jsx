import React, { useState } from 'react';
import { BookOpen, FileText, FolderOpen, CheckCircle, Award, Compass } from 'lucide-react';
import EnrolledCourses from './EnrolledCourses';
import PracticeTest from './PracticeTest';
import FreeResources from './FreeResource';
import RecentTestScores from "./RecentTestScores"

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

                <FreeResources />
            </section>

            {/* Recent Test Scores Section */}
            <RecentTestScores />
        </main>
    );
}
