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
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState("");
    const [coursesCount, setCoursesCount] = useState(0);
    const [announcements, setAnnouncements] = useState([]);

    const fetchCoursesByTeacher = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/teacher/${id}`);
            const result = await response.json();
            if (result.success) {
                setCoursesCount(result.data.length);
            } else {
                alert("failed to fetch teacher courses!");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const fetchTeachersNotifications = async (id) => {
        const response = await fetch("http://localhost:5000/api//broadcasts/filter/teachers");
        const result = await response.json();
        setAnnouncements(result.data);
    }

    useEffect(() => {
        const fetchDashboardData = async () => {
            const checkUser = await ValidateTeacher();
            setUserName(checkUser.name);

            fetchCoursesByTeacher(checkUser._id);
            fetchTeachersNotifications();

            setError(null);
        };

        fetchDashboardData();
    }, []);

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
                        value={coursesCount}
                        icon={BookOpen}
                        bgColor="bg-blue-100"
                        textColor="text-blue-700"
                        borderColor="border-blue-100"
                        delay={0}
                    />
                    <TeacherStatsCard
                        title="Total Students"
                        value={2}
                        icon={Users}
                        bgColor="bg-green-100"
                        textColor="text-green-700"
                        borderColor="border-green-100"
                        delay={0.1}
                    />
                    <TeacherStatsCard
                        title="Total Sells"
                        value={2}
                        icon={ListChecks}
                        bgColor="bg-orange-100"
                        textColor="text-orange-700"
                        borderColor="border-orange-100"
                        delay={0.2}
                    />
                    <TeacherStatsCard
                        title="Unread Messages"
                        value={2}
                        icon={BellRing}
                        bgColor="bg-purple-100"
                        textColor="text-purple-700"
                        borderColor="border-purple-100"
                        delay={0.3}
                    />
                </div>

            </motion.div>

            <div className="py-4 px-6">'
                <h1 className='text-3xl font-bold ps-1 pb-4'>Announcements!</h1>
                {announcements.length > 0 ? (
                    <motion.ul
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                            hidden: {},
                        }}
                    >
                        {announcements.map((announcement) => (
                            <motion.li
                                key={announcement.id}
                                className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                variants={itemVariants}
                            >
                                <p className="text-lg font-bold text-gray-800 mb-1">{announcement.title}</p>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{announcement.description}</p>
                                <p className="text-xs text-gray-400 text-right">{new Date(announcement.createdAt).toLocaleDateString()}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                ) : (
                    <p className="text-gray-600 text-center py-6">No new announcements at this time.</p>
                )}
            </div>

        </UserDashboardContainer>
    );
}
