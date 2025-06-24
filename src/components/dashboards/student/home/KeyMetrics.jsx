import { motion } from "framer-motion";
import { BookOpen, Trophy, CalendarDays, Award, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import validateToken from "../../../../utils/ValidateToken";

export default function KeyMetrics() {
    const [enrolledCourses, setEnrolledCourses] = useState(0);
    const [tests, setTests] = useState(0);
    const [resources, setResources] = useState(0);

    const fetchEnrolledCourses = async () => {
        const userInfo = await validateToken();
        const response = await fetch(`http://localhost:5000/api/courses/user/${userInfo.id}`);
        if (!response.ok) {
            alert('error occured fetching course count');
            return;
        }
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        setEnrolledCourses(result.data.length);
    }

    const fetchPracticeTests = async () => {
        const response = await fetch(`http://localhost:5000/api/tests/`);
        if (!response.ok) {
            alert('error occured fetching resources');
            return;
        }
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        setTests(result.data.length);
    }

    const fetchResources = async () => {
        const response = await fetch(`http://localhost:5000/api/resource/`);
        if (!response.ok) {
            alert('error occured fetching course count');
            return;
        }
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        setResources(result.data.length);
    }

    useEffect(() => {
        fetchEnrolledCourses();
        fetchPracticeTests();
        fetchResources();
    }, []);

    const metrics = [
        { id: 1, name: 'Enrolled Courses', value: enrolledCourses, icon: <BookOpen className="h-8 w-8 text-blue-600" />, color: 'from-blue-100 to-blue-200' },
        { id: 2, name: 'Courses Completed', value: 0, icon: <Trophy className="h-8 w-8 text-green-600" />, color: 'from-green-100 to-green-200' },
        { id: 3, name: 'Practice Tests', value: tests, icon: <CalendarDays className="h-8 w-8 text-orange-600" />, color: 'from-orange-100 to-orange-200' },
        { id: 4, name: 'Resources', value: resources, icon: <Award className="h-8 w-8 text-purple-600" />, color: 'from-purple-100 to-purple-200' },
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
                <BarChart2 className="mr-3 h-8 w-8 text-indigo-600" /> Your Progress at a Glance
            </h3>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {metrics.map(metric => (
                    <motion.div
                        key={metric.id}
                        className={`p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center
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
    );
}