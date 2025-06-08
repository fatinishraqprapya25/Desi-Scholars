import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Compass, Clock, UserSquare2,
    BarChart2, CalendarDays, Megaphone, Lightbulb, TrendingUp, Trophy, FolderOpen,
    PlayCircle, PlusCircle, Search, Award, MessageSquare
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import WelcomeBanner from '../home/WelcomeBanner';
import KeyMetrics from '../home/KeyMetrics';

const COLORS = {
    primary: '#3B82F6', // blue-500
    primaryDarker: '#2563EB', // blue-600
    secondary: '#6366F1', // indigo-500
    success: '#10B981', // green-500
    danger: '#EF4444', // red-500
    border: '#E5E7EB', // gray-200
    accentPurple: '#8A4AF8',
    lightPurpleBg: 'linear-gradient(to bottom right, #F5F3FF, #E0D7FA)',
};

// demo enrolled course
const enrolledCoursesData = [
    {
        id: 1,
        title: 'Introduction to Web Development',
        progress: 75,
        nextLesson: 'CSS Flexbox',
        instructor: 'Dr. Alice Smith',
        lastAccessed: '2 days ago',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9d91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 2,
        title: 'Calculus I',
        progress: 40,
        nextLesson: 'Derivatives',
        instructor: 'Prof. John Doe',
        lastAccessed: '5 days ago',
        imageUrl: 'https://images.unsplash.com/photo-1554460586-e0094025170d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 3,
        title: 'Data Structures and Algorithms',
        progress: 90,
        nextLesson: 'Graph Traversal',
        instructor: 'Ms. Emily White',
        lastAccessed: '1 day ago',
        imageUrl: 'https://images.unsplash.com/photo-1617470701193-276949b2-32b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
];

// demo announcements data
const announcementsData = [
    { id: 1, title: 'Platform Maintenance Scheduled', date: 'June 10, 2025', message: 'Our platform will undergo scheduled maintenance from 2 AM to 4 AM UTC. Services may be temporarily interrupted.' },
    { id: 2, title: 'New Course: Advanced React Hooks', date: 'May 28, 2025', message: 'Exciting news! A new course on Advanced React Hooks has been launched. Enroll now to deepen your React expertise.' },
    { id: 3, title: 'Webinar: Future of AI in Education', date: 'May 25, 2025', message: 'Join our upcoming webinar on June 15th to discuss the transformative impact of AI in the education sector.' },
];

// demo upcoming events data
const upcomingEventsData = [
    { id: 1, title: 'Web Dev Project Deadline', date: 'June 15, 2025', time: '11:59 PM', course: 'Web Development' },
    { id: 2, title: 'Calculus Mid-term Exam', date: 'June 20, 2025', time: '10:00 AM', course: 'Calculus I' },
    { id: 3, title: 'DSA Live Session', date: 'June 12, 2025', time: '07:00 PM', course: 'Data Structures' },
];

// demo recommended course data
const recommendedCoursesData = [
    {
        id: 'rec1',
        title: 'Python for Data Science',
        description: 'Learn Python fundamentals for data analysis and machine learning.',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        difficulty: 'Intermediate',
        duration: '6 weeks',
    },
    {
        id: 'rec2',
        title: 'Introduction to UI/UX Design',
        description: 'Explore the principles of user interface and user experience design.',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        difficulty: 'Beginner',
        duration: '4 weeks',
    },
    {
        id: 'rec3',
        title: 'Cloud Computing Fundamentals',
        description: 'Understand the basics of cloud platforms like AWS, Azure, and GCP.',
        imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c9a8e6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        difficulty: 'Beginner',
        duration: '8 weeks',
    },
];

// QuickActions.jsx
function QuickActions() {
    const actions = [
        { id: 1, name: 'Start New Test', icon: <PlayCircle className="h-6 w-6" />, color: 'bg-blue-600', hoverColor: 'bg-blue-700' },
        { id: 2, name: 'Explore Courses', icon: <Search className="h-6 w-6" />, color: 'bg-indigo-600', hoverColor: 'bg-indigo-700' },
        { id: 3, name: 'View Resources', icon: <FolderOpen className="h-6 w-6" />, color: 'bg-green-600', hoverColor: 'bg-green-700' },
        { id: 4, name: 'Ask a Question', icon: <MessageSquare className="h-6 w-6" />, color: 'bg-purple-600', hoverColor: 'bg-purple-700' },
    ];

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="mb-10">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <PlusCircle className="mr-3 h-8 w-8 text-green-600" /> Quick Actions
            </h3>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {actions.map(action => (
                    <motion.button
                        key={action.id}
                        className={`p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center
                                    ${action.color} text-white transform hover:scale-105 transition-all duration-300`}
                        variants={itemVariants}
                    >
                        <div className="mb-4">{action.icon}</div>
                        <p className="text-lg font-semibold">{action.name}</p>
                    </motion.button>
                ))}
            </motion.div>
        </section>
    );
}

// UpcomingEvents.jsx
function UpcomingEvents({ events }) {
    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="mb-10">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <CalendarDays className="mr-3 h-8 w-8 text-orange-600" /> Upcoming Events & Deadlines
            </h3>
            <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {events.length > 0 ? (
                    <ul className="space-y-4">
                        {events.map(event => (
                            <motion.li key={event.id} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100" variants={itemVariants}>
                                <div className="flex-shrink-0 mr-4 text-blue-600">
                                    <CalendarDays className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{event.title}</p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">{event.date}</span> at {event.time}
                                    </p>
                                    <p className="text-xs text-gray-500">Course: {event.course}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center py-4">No upcoming events or deadlines.</p>
                )}
            </motion.div>
        </section>
    );
}

// LatestAnnouncements.jsx
function LatestAnnouncements({ announcements }) {
    const itemVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="mb-10">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <Megaphone className="mr-3 h-8 w-8 text-purple-600" /> Latest Announcements
            </h3>
            <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {announcements.length > 0 ? (
                    <ul className="space-y-4">
                        {announcements.map(announcement => (
                            <motion.li key={announcement.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100" variants={itemVariants}>
                                <p className="text-lg font-semibold text-gray-900 mb-1">{announcement.title}</p>
                                <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                                <p className="text-xs text-gray-500 text-right">{announcement.date}</p>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center py-4">No new announcements at this time.</p>
                )}
            </motion.div>
        </section>
    );
}

// RecommendedCourses.jsx
function RecommendedCourses({ courses }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="mb-10">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                <Lightbulb className="mr-3 h-8 w-8 text-yellow-600" /> Recommended for You
            </h3>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {courses.map(course => (
                    <motion.div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer
                                   hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
                        variants={itemVariants}
                    >
                        <div className="relative h-40 w-full overflow-hidden">
                            <img
                                src={course.imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image'}
                                alt={course.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                                <span className="flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1 text-gray-500" /> {course.difficulty}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-500" /> {course.duration}
                                </span>
                            </div>
                            <button
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl shadow-lg
                                           hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out
                                           flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95"
                            >
                                <PlayCircle className="mr-2 h-5 w-5" /> Enroll Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default function UserDashboardHome({ activeSection }) {
    return (
        <UserDashboardContainer>
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full"
            >


                <>
                    <WelcomeBanner userName="Alex" />
                    <KeyMetrics />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <UpcomingEvents events={upcomingEventsData} />
                        <LatestAnnouncements announcements={announcementsData} />
                    </div>

                    <QuickActions />
                    <RecommendedCourses courses={recommendedCoursesData} />
                </>

            </motion.div>
        </UserDashboardContainer>
    );
}
