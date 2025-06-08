import { motion } from "framer-motion";

export default function WhyUs({ features }) {
    return (
        <section className="mb-12 sm:mb-16 py-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 sm:mb-14 leading-tight">
                Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
                    >
                        <div className="mb-5 text-6xl transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-center flex-grow">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}