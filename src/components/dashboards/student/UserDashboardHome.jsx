import React, { useState } from 'react';
import { BookOpen, FileText, FolderOpen, CheckCircle, Award, Compass } from 'lucide-react';
import EnrolledCourses from './EnrolledCourses';
import PracticeTest from './PracticeTest';
import FreeResources from './FreeResource';
import RecentTestScores from "./RecentTestScores"

// UserDashboard Component
export default function UserDashboardHome() {
    return (
        <main className="bg-white p-6">
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
