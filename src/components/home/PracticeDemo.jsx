// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PracticeTestPromo() {
    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-700 to-purple-800">
            {/* Background decorative elements for a richer feel */}
            <div className="absolute inset-0 z-0 opacity-20">
                <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="300" fill="url(#pattern0)" transform="translate(100 50)" />
                    <circle cx="100%" cy="100%" r="250" fill="url(#pattern1)" transform="translate(-100 -50)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_0_0" transform="scale(0.0001 0.0001)" />
                        </pattern>
                        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image1_0_0" transform="scale(0.0001 0.0001)" />
                        </pattern>
                        <image id="image0_0_0" width="10000" height="10000" xlinkHref="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjggMjAwIDIwMCAxNTUuMjI4IDIwMCAxMDBDMjAwIDQ0Ljc3MTUgMTU1LjIyOCAwIDEwMCAwQzQ0Ljc3MTUgMCAwIDQ0Ljc3MTUgMCAxMDBDMCAxNTUuMjI4IDQ0Ljc3MTUgMjAwIDEwMCAyMDBZMTAwIDIwQzE0NC4xODcgMjAgMTgwIDU1LjgxMyAxODAgMTAwQzE4MCAxNDQuMTg3IDE0NC4xODcgMTgwIDEwMCAxODBDNTUuODEzIDE4MCAyMCAxNDQuMTg3IDIwIDEwMEMyMCA1NS44MTMgNTUuODEzIDIwIDEwMCAyMFoiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==" />
                        <image id="image1_0_0" width="10000" height="10000" xlinkHref="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDEwMEMwIDQ0Ljc3MTUgNDQuNzcxNSAwIDEwMCAwTDEwMCAyMEM1NS44MTMgMjAgMjAgNTUuODEzIDIwIDEwMEwyMCAxODBDNTUuODEzIDE4MCAxNDQuMTg3IDE4MCAxODAgMTAwTDIwMCAxMDBDMjAwIDE1NS4yMjggMTU1LjIyOCAyMDAgMTAwIDIwMEM0NC43NzE1IDIwMCAwIDE1NS4yMjggMCAxMDBaIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=" />
                    </defs>
                </svg>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10"> {/* Ensure content is above background */}
                <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 text-center text-white"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Ready to <span className="text-yellow-300">Ace Your Exams</span>?
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-indigo-100/90"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        In today’s world, opportunities like full scholarships to top U.S. colleges should not be limited to students from elite institutions in Dhaka or those who can afford private coaching.
                    </motion.p>
                    <motion.a
                        href="/practice-tests" // Changed to a more meaningful link
                        className="inline-flex items-center justify-center bg-white text-indigo-700 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out transform"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        whileHover={{ y: -3, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} // Subtle lift and shadow on hover
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Start a Free Test
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}