import { motion } from "framer-motion";

export default function WelcomeBanner({ userName = 'Student' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 sm:p-10 rounded-2xl shadow-xl mb-10 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}></div>
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
                    Welcome back, <span className="text-blue-200">{userName}!</span>
                </h2>
                <p className="text-blue-100 text-lg sm:text-xl">
                    Ready to achieve your learning goals today? Let's make progress!
                </p>
            </div>
        </motion.div>
    );
}
