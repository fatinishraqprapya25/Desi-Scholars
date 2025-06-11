import { motion } from 'framer-motion';
import { SquarePen, ArrowRight } from 'lucide-react';

export default function QuickActionsSection({ actions, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <SquarePen className="h-5 w-5 mr-2 text-indigo-600" /> Quick Actions
            </h3>
            <div className="space-y-3">
                {actions.map((action, index) => (
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
    );
}
