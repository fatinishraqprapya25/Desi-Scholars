import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Compass, Clock, UserSquare2,
    BarChart2, CalendarDays, Megaphone, Lightbulb, TrendingUp, Trophy, GraduationCap,
    PlayCircle, PlusCircle, Search, Award,
    CheckCircle, Users, Star, Target, Zap, Activity
} from 'lucide-react';
import UserDashboardContainer from '../UserDashboardContainer';

// Mock Data for MyProgressPage
const progressOverviewData = [
    { id: 1, name: 'Courses Enrolled', value: 3, icon: <BookOpen className="h-8 w-8 text-blue-600" />, color: 'from-blue-100 to-blue-200' },
    { id: 2, name: 'Courses Completed', value: 1, icon: <GraduationCap className="h-8 w-8 text-green-600" />, color: 'from-green-100 to-green-200' },
    { id: 3, name: 'Average Score', value: '82%', icon: <BarChart2 className="h-8 w-8 text-indigo-600" />, color: 'from-indigo-100 to-indigo-200' },
    { id: 4, name: 'Hours Spent', value: '75h', icon: <Clock className="h-8 w-8 text-purple-600" />, color: 'from-purple-100 to-purple-200' },
];

const detailedCourseProgressData = [
    {
        id: 1,
        title: 'Introduction to Web Development',
        progress: 75,
        lessonsCompleted: 15,
        totalLessons: 20,
        lastActivity: 'Lesson 16: CSS Grid Layout',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9d91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 2,
        title: 'Calculus I',
        progress: 40,
        lessonsCompleted: 8,
        totalLessons: 20,
        lastActivity: 'Chapter 5: Derivatives',
        imageUrl: 'https://images.unsplash.com/photo-1554460586-e0094025170d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 3,
        title: 'Data Structures and Algorithms',
        progress: 90,
        lessonsCompleted: 18,
        totalLessons: 20,
        lastActivity: 'Module 9: Graph Traversal',
        imageUrl: 'https://images.unsplash.com/photo-1617470701193-276949b2-32b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
];

const skillsProgressData = [
    { id: 1, name: 'JavaScript', proficiency: 70, color: 'bg-yellow-500' },
    { id: 2, name: 'React.js', proficiency: 65, color: 'bg-cyan-500' },
    { id: 3, name: 'HTML/CSS', proficiency: 85, color: 'bg-orange-500' },
    { id: 4, name: 'Algorithms', proficiency: 55, color: 'bg-red-500' },
    { id: 5, name: 'Python', proficiency: 40, color: 'bg-green-500' },
];

const achievementsData = [
    { id: 1, name: 'First Course Completed', icon: <Trophy className="h-12 w-12 text-yellow-500 fill-yellow-500" />, description: 'Completed your first course!', date: 'May 20, 2025' },
    { id: 2, name: 'Top Scorer: Web Dev Basics', icon: <Award className="h-12 w-12 text-blue-500 fill-blue-500" />, description: 'Scored 90%+ on Web Dev Basics Quiz.', date: 'May 22, 2025' },
    { id: 3, name: 'Consistent Learner', icon: <Activity className="h-12 w-12 text-green-500 fill-green-500" />, description: 'Logged in for 7 consecutive days.', date: 'May 25, 2025' },
];


function MyProgressPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    };

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

    const progressBarVariants = {
        hidden: { width: 0 },
        visible: {
            width: 'var(--progress-width)',
            transition: {
                duration: 1.5,
                ease: 'easeOut'
            }
        }
    };

    return (
        <UserDashboardContainer>
            <motion.div
                className="w-full font-sans mt-3"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Progress Overview Cards */}
                <section className="mb-10">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                        <Zap className="mr-3 h-8 w-8 text-yellow-600" /> Overview
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {progressOverviewData.map(metric => (
                            <motion.div
                                key={metric.id}
                                className={`p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center
                                        bg-gradient-to-br ${metric.color}`}
                                variants={itemVariants}
                            >
                                <div className="mb-4">{metric.icon}</div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">{metric.name}</p>
                                <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Detailed Course Progress */}
                <section className="mb-10">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                        <BookOpen className="mr-3 h-8 w-8 text-blue-600" /> Course Progress
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    >
                        {detailedCourseProgressData.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer
                                       hover:shadow-md hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
                                variants={itemVariants}
                            >
                                <div className="relative h-40 w-full overflow-hidden">
                                    <img
                                        src={course.imageUrl || 'https://via.placeholder.co/400x200?text=Course+Image'}
                                        alt={course.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h4>
                                    <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                        <motion.div
                                            className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700"
                                            style={{ '--progress-width': `${course.progress}%` }}
                                            variants={progressBarVariants}
                                            initial="hidden"
                                            animate="visible"
                                        ></motion.div>
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium mb-4">Progress: {course.progress}% Complete ({course.lessonsCompleted}/{course.totalLessons} Lessons)</p>

                                    <div className="flex items-center text-sm text-gray-700 mb-4">
                                        <Compass className="mr-2 h-4 w-4 text-blue-500" />
                                        <span>Last Activity: <span className="font-semibold">{course.lastActivity}</span></span>
                                    </div>

                                    <button
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl shadow-md
                                               hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 ease-in-out
                                               flex items-center justify-center text-lg font-medium transform hover:scale-105 active:scale-95"
                                    >
                                        <PlayCircle className="mr-2 h-5 w-5" /> Resume Course
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Skills Development */}
                <section className="mb-10">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                        <Target className="mr-3 h-8 w-8 text-green-600" /> Skills Development
                    </h3>
                    <motion.div
                        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <ul className="space-y-5">
                            {skillsProgressData.map(skill => (
                                <motion.li key={skill.id} variants={itemVariants}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-medium text-gray-800">{skill.name}</span>
                                        <span className="text-md font-semibold text-gray-700">{skill.proficiency}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <motion.div
                                            className={`h-3 rounded-full ${skill.color}`}
                                            style={{ '--progress-width': `${skill.proficiency}%` }}
                                            variants={progressBarVariants}
                                            initial="hidden"
                                            animate="visible"
                                        ></motion.div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </section>

                {/* Achievements & Badges */}
                <section className="mb-10">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center">
                        <Award className="mr-3 h-8 w-8 text-yellow-600" /> Your Achievements
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {achievementsData.map(achievement => (
                            <motion.div
                                key={achievement.id}
                                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center
                                       transform hover:scale-105 transition-all duration-300"
                                variants={itemVariants}
                            >
                                <div className="mb-4">{achievement.icon}</div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{achievement.name}</h4>
                                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                                <p className="text-xs text-gray-500">Earned: {achievement.date}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </motion.div>
        </UserDashboardContainer>
    );
}

export default MyProgressPage;
