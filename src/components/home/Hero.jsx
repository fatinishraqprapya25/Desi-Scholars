import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Container from "../common/Container";

export default function Hero() {
    return (
        <section className="bg-white py-16">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-10 px-4 md:px-0">
                    {/* Left content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Unlock{" "}
                            <span className="text-indigo-600">
                                <Typewriter
                                    words={["Your Potential", "Your Skills", "Your Career", "Your Future"]}
                                    loop={0} // 0 = infinite
                                    cursor
                                    cursorStyle=""
                                    typeSpeed={110}
                                    deleteSpeed={110}
                                    delaySpeed={2500}
                                />
                            </span>{" "}
                            with DESH Scholar
                        </h1>

                        <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto md:mx-0">
                            Join thousands of learners mastering new skills and advancing their careers with our top courses, resources, and practice tests.
                        </p>

                        <div className="flex justify-center md:justify-start gap-4">
                            <Link
                                to="/webinar"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
                            >
                                Join Free Webinar
                            </Link>
                            <Link
                                to="/courses"
                                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="flex-1 max-w-md md:max-w-lg mx-auto">
                        <img
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                            alt="Learning illustration"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
