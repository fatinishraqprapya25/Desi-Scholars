import { motion } from 'framer-motion';
import {
    BookOpen, BarChart2, Clock, Zap, Target, Award,
    GraduationCap, Activity, Trophy
} from 'lucide-react';
import UserDashboardContainer from '../../common/UserDashboardContainer';
import SectionHeader from '../progress/SectionHeader';
import ProgressOverviewCard from '../progress/ProgressOverviewCard';
import DetailedCourseCard from '../progress/DetailedCourseCard';
import SkillProgressBar from '../progress/SkillProgressBar';
import AchievementCard from '../progress/AchievementCard';

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
                    <SectionHeader icon={<Zap className="h-8 w-8 text-yellow-600" />} title="Overview" />
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {progressOverviewData.map(metric => (
                            <ProgressOverviewCard key={metric.id} metric={metric} />
                        ))}
                    </motion.div>
                </section>

                {/* Detailed Course Progress */}
                <section className="mb-10">
                    <SectionHeader icon={<BookOpen className="h-8 w-8 text-blue-600" />} title="Course Progress" />
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    >
                        {detailedCourseProgressData.map((course) => (
                            <DetailedCourseCard key={course.id} course={course} />
                        ))}
                    </motion.div>
                </section>

                {/* Skills Development */}
                <section className="mb-10">
                    <SectionHeader icon={<Target className="mr-3 h-8 w-8 text-green-600" />} title="Skills Development" />
                    <motion.div
                        className="bg-white rounded-md shadow-md border border-gray-100 p-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <ul className="space-y-5">
                            {skillsProgressData.map(skill => (
                                <SkillProgressBar key={skill.id} skill={skill} />
                            ))}
                        </ul>
                    </motion.div>
                </section>

                {/* Achievements & Badges */}
                <section className="mb-10">
                    <SectionHeader icon={<Award className="mr-3 h-8 w-8 text-yellow-600" />} title="Your Achievements" />
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {achievementsData.map(achievement => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </motion.div>
                </section>
            </motion.div>
        </UserDashboardContainer>
    );
}

export default MyProgressPage;