import { motion } from "framer-motion";
import { Lightbulb, Clock, TrendingUp ,PlayCircle } from "lucide-react";

const courses = [
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

export default function RecommendedCourses() {
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