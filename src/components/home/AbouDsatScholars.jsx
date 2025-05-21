// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Container from "../common/Container";

export default function AboutDSATScholars() {
    return (
        <section className="bg-gray-50 py-16">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left - Animated Image */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                            alt="About DSAT Scholars"
                            className="rounded-lg shadow-lg w-full h-auto"
                        />
                    </motion.div>

                    {/* Right - Text content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            About DSAT Scholars
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            DSAT Scholars is a cutting-edge platform designed to empower students
                            and professionals alike by providing high-quality courses, resources,
                            and practice tests. Our mission is to make learning accessible and
                            engaging for everyone, fostering growth and success in a fast-paced world.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
