import { motion } from "framer-motion";
import { PlusCircle, PlayCircle, Search, FolderOpen, MessageSquare } from "lucide-react";

export default function QuickActions() {
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