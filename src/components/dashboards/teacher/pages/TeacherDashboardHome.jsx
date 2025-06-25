import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, BookOpen, Users, BellRing, Lightbulb, XCircle, ListChecks
} from 'lucide-react';

import TeacherStatsCard from '../home/TeacherStatsCard';
import QuickActionsSection from '../home/QuickActionsSection';
import RecentActivitySection from '../home/RecentActivitySection';
import UpcomingDeadlinesSection from '../home/UpcomingDeadlines';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import ValidateTeacher from "../../../../utils/ValidateTeacher";


const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};


export default function TeacherHome() {
    const [teacherDashboardData, setTeacherDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            const checkUser = await ValidateTeacher();
            setUserName(checkUser.name);
            console.log(checkUser);

            setLoading(true);
            setError(null);
            try {

                setTimeout(() => {
                    const dummyData = {
                        teacherName: 'Ms. Emily Chen',
                        totalCourses: 5,
                        totalStudents: 150,
                        pendingAssignments: 12,
                        unreadMessages: 3,
                        recentActivity: [
                            { type: 'assignment_submitted', course: 'Algebra I', student: 'John Doe', time: '2 mins ago' },
                            { type: 'message_received', sender: 'Admin', time: '1 hour ago' },
                            { type: 'new_enrollment', course: 'Geometry Basics', student: 'Jane Smith', time: '3 hours ago' },
                            { type: 'course_update', course: 'Physics II', time: 'Yesterday' },
                        ],
                        upcomingDeadlines: [
                            { title: 'Grade Algebra Quiz', course: 'Algebra I', date: 'June 15' },
                            { title: 'Submit Course Report', course: 'LMS Admin', date: 'June 20' },
                        ],
                        quickActions: [
                            { name: 'Create New Course', icon: <BookOpen className="h-5 w-5" />, link: '/teacher/courses/create' },
                            { name: 'Grade Assignments', icon: <ListChecks className="h-5 w-5" />, link: '/teacher/assignments/grade' },
                            { name: 'View My Students', icon: <Users className="h-5 w-5" />, link: '/teacher/students' },
                            { name: 'Send Broadcast', icon: <BellRing className="h-5 w-5" />, link: '/teacher/broadcasts/create' },
                        ]
                    };
                    setTeacherDashboardData(dummyData);
                    setLoading(false);
                }, 1200);
            } catch (err) {
                console.error("Failed to fetch teacher dashboard data:", err);
                setError("Failed to load dashboard. Please try again later.");
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <UserDashboardContainer role="teacher">
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-gray-600">
                    <Lightbulb className="h-5 w-5 inline-block animate-pulse mr-2" /> Loading teacher dashboard...
                </div>
            </UserDashboardContainer>
        );
    }

    if (error) {
        return (
            <UserDashboardContainer role={"teacher"}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-red-600">
                    <XCircle className="h-5 w-5 inline-block mr-2" /> {error}
                </div>
            </UserDashboardContainer>
        );
    }

    if (!teacherDashboardData) {
        return (
            <UserDashboardContainer role={"teacher"}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-gray-600">
                    No dashboard data available.
                </div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer role="teacher">
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <LayoutDashboard className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Welcome, {userName}!
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Your central hub for managing courses, students, and activities.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <TeacherStatsCard
                        title="My Courses"
                        value={teacherDashboardData.totalCourses}
                        icon={BookOpen}
                        bgColor="bg-blue-100"
                        textColor="text-blue-700"
                        borderColor="border-blue-100"
                        delay={0}
                    />
                    <TeacherStatsCard
                        title="Total Students"
                        value={teacherDashboardData.totalStudents}
                        icon={Users}
                        bgColor="bg-green-100"
                        textColor="text-green-700"
                        borderColor="border-green-100"
                        delay={0.1}
                    />
                    <TeacherStatsCard
                        title="Pending Grading"
                        value={teacherDashboardData.pendingAssignments}
                        icon={ListChecks}
                        bgColor="bg-orange-100"
                        textColor="text-orange-700"
                        borderColor="border-orange-100"
                        delay={0.2}
                    />
                    <TeacherStatsCard
                        title="Unread Messages"
                        value={teacherDashboardData.unreadMessages}
                        icon={BellRing}
                        bgColor="bg-purple-100"
                        textColor="text-purple-700"
                        borderColor="border-purple-100"
                        delay={0.3}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <QuickActionsSection actions={teacherDashboardData.quickActions} itemVariants={itemVariants} />
                    <RecentActivitySection activities={teacherDashboardData.recentActivity} itemVariants={itemVariants} />
                    <UpcomingDeadlinesSection deadlines={teacherDashboardData.upcomingDeadlines} itemVariants={itemVariants} />
                </div>
            </motion.div>
        </UserDashboardContainer>
    );
}
