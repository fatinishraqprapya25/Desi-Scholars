import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, BookOpen, Users, BellRing, SquarePen, CalendarDays,
    ArrowRight, MessageSquareText, FileText, Lightbulb, GraduationCap, ListChecks,
    History, Info
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';

export default function TeacherHome() {
    const [teacherDashboardData, setTeacherDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate fetching teacher dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
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

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'assignment_submitted':
                return <FileText className="h-4 w-4 text-blue-500" />;
            case 'message_received':
                return <MessageSquareText className="h-4 w-4 text-purple-500" />;
            case 'new_enrollment':
                return <Users className="h-4 w-4 text-green-500" />;
            case 'course_update':
                return <BookOpen className="h-4 w-4 text-orange-500" />;
            default:
                return <Info className="h-4 w-4 text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <UserDashboardContainer admin={false}> {/* Teachers are not 'admin' in this context */}
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-gray-600">
                    <Lightbulb className="h-5 w-5 inline-block animate-pulse mr-2" /> Loading teacher dashboard...
                </div>
            </UserDashboardContainer>
        );
    }

    if (error) {
        return (
            <UserDashboardContainer teacher={true}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-red-600">
                    <XCircle className="h-5 w-5 inline-block mr-2" /> {error}
                </div>
            </UserDashboardContainer>
        );
    }

    if (!teacherDashboardData) {
        return (
            <UserDashboardContainer admin={false}>
                <div className="p-4 sm:p-6 lg:p-8 font-sans w-full max-w-4xl mx-auto text-center text-gray-600">
                    No dashboard data available.
                </div>
            </UserDashboardContainer>
        );
    }

    return (
        <UserDashboardContainer admin={false}> {/* Pass false for teacher context */}
            <motion.div
                className="p-4 sm:p-6 lg:p-8 font-sans w-full mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                    <LayoutDashboard className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Welcome, {teacherDashboardData.teacherName}!
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-2xl leading-relaxed">
                    Your central hub for managing courses, students, and activities.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0} className="bg-white rounded-xl shadow-sm p-4 border border-blue-100 flex items-center space-x-3">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">My Courses</p>
                            <p className="text-xl font-bold text-gray-900">{teacherDashboardData.totalCourses}</p>
                        </div>
                    </motion.div>
                    <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1} className="bg-white rounded-xl shadow-sm p-4 border border-green-100 flex items-center space-x-3">
                        <div className="p-3 rounded-full bg-green-100 text-green-700">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Students</p>
                            <p className="text-xl font-bold text-gray-900">{teacherDashboardData.totalStudents}</p>
                        </div>
                    </motion.div>
                    <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2} className="bg-white rounded-xl shadow-sm p-4 border border-orange-100 flex items-center space-x-3">
                        <div className="p-3 rounded-full bg-orange-100 text-orange-700">
                            <ListChecks className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Grading</p>
                            <p className="text-xl font-bold text-gray-900">{teacherDashboardData.pendingAssignments}</p>
                        </div>
                    </motion.div>
                    <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={3} className="bg-white rounded-xl shadow-sm p-4 border border-purple-100 flex items-center space-x-3">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                            <BellRing className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Unread Messages</p>
                            <p className="text-xl font-bold text-gray-900">{teacherDashboardData.unreadMessages}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-xl shadow-md p-5 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                            <SquarePen className="h-5 w-5 mr-2 text-indigo-600" /> Quick Actions
                        </h3>
                        <div className="space-y-3">
                            {teacherDashboardData.quickActions.map((action, index) => (
                                <motion.a
                                    key={index}
                                    href={action.link} // Use a real React Router Link in production
                                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="flex items-center text-gray-800 font-medium">
                                        {action.icon}
                                        <span className="ml-3">{action.name}</span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-xl shadow-md p-5 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                            <History className="h-5 w-5 mr-2 text-teal-600" /> Recent Activity
                        </h3>
                        <ul className="space-y-3">
                            {teacherDashboardData.recentActivity.length > 0 ? (
                                teacherDashboardData.recentActivity.map((activity, index) => (
                                    <li key={index} className="flex items-center space-x-3 text-gray-700 text-sm">
                                        {getActivityIcon(activity.type)}
                                        <span>
                                            {activity.type === 'assignment_submitted' && `Student ${activity.student} submitted an assignment in ${activity.course}.`}
                                            {activity.type === 'message_received' && `Received a message from ${activity.sender}.`}
                                            {activity.type === 'new_enrollment' && `New student ${activity.student} enrolled in ${activity.course}.`}
                                            {activity.type === 'course_update' && `Course ${activity.course} was updated.`}
                                        </span>
                                        <span className="ml-auto text-gray-500 text-xs">{activity.time}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No recent activity.</p>
                            )}
                        </ul>
                    </motion.div>

                    {/* Upcoming Deadlines */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 bg-white rounded-xl shadow-md p-5 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                            <CalendarDays className="h-5 w-5 mr-2 text-red-600" /> Upcoming Deadlines
                        </h3>
                        <ul className="space-y-3">
                            {teacherDashboardData.upcomingDeadlines.length > 0 ? (
                                teacherDashboardData.upcomingDeadlines.map((deadline, index) => (
                                    <li key={index} className="flex items-center space-x-3 text-gray-700 text-sm p-2 bg-yellow-50 rounded-md border border-yellow-100">
                                        <GraduationCap className="h-4 w-4 text-yellow-700" /> {/* Corrected GradCap to GraduationCap */}
                                        <span>
                                            <span className="font-medium">{deadline.title}</span> for <span className="font-medium">{deadline.course}</span>.
                                        </span>
                                        <span className="ml-auto text-yellow-700 text-xs flex items-center">
                                            <CalendarDays className="h-4 w-4 mr-1" /> {deadline.date}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No upcoming deadlines.</p>
                            )}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </UserDashboardContainer>
    );
}
