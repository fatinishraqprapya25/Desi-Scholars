// components/Testimonials.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { FaStar } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Sarah Ahmed",
        review:
            "This platform really helped me master JavaScript and React. The tutorials are easy to follow and very practical. The community support is also amazing!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        location: "Dhaka, Bangladesh" 
    },
    {
        id: 2,
        name: "Raihan Islam",
        review:
            "As a Bangladeshi student, I truly appreciate the Bangla Node.js course. It's super helpful and very well structured. DSAT Scholars is a game-changer!",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        location: "Chattogram, Bangladesh" // Added location for more context
    },
    {
        id: 3,
        name: "Nabila Rahman",
        review:
            "I passed my frontend test after following the resources here. The practice tests are fantastic, and the instructors are very knowledgeable. Highly recommended!",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        location: "Rajshahi, Bangladesh" // Added location for more context
    },
    {
        id: 4,
        name: "Omar Faruk",
        review:
            "The Modern JavaScript series is incredibly up-to-date and practical. It filled in so many gaps in my understanding. A must-follow for any aspiring developer.",
        image: "https://randomuser.me/api/portraits/men/70.jpg",
        rating: 5,
        location: "Sylhet, Bangladesh"
    },
    {
        id: 5,
        name: "Faria Akter",
        review:
            "I love how accessible the content is. Learning Tailwind CSS was a breeze with their comprehensive guide. My projects look so much better now!",
        image: "https://randomuser.me/api/portraits/women/77.jpg",
        rating: 4,
        location: "Khulna, Bangladesh"
    }
];

const Testimonials = () => {
    // Animation variants for the section title and description
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
            {/* Background blobs for visual interest */}
            <div className="absolute top-1/4 left-0 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>


            <div className="max-w-6xl mx-auto px-6 text-center z-10 relative">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-sm"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={titleVariants}
                >
                    What Our <span className="text-indigo-600">Learners Say</span>
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={descriptionVariants}
                >
                    Discover how DSAT Scholars has empowered students and professionals in **Bangladesh**
                    to achieve their learning goals and advance their careers.
                </motion.p>

                <Swiper
                    className="mySwiper !pb-10" // !pb-10 to ensure pagination dots don't overlap content
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true, // Pause autoplay on hover
                    }}
                    pagination={{ clickable: true }}
                    loop
                    spaceBetween={30}
                    slidesPerView={1} // Default for mobile
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3, // Display 3 testimonials on larger screens
                            spaceBetween: 30,
                        },
                    }}
                >
                    {testimonials.map(({ id, name, review, image, rating, location }) => (
                        <SwiperSlide key={id}>
                            <motion.div
                                className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col items-center justify-between text-center border border-gray-100 transform hover:scale-105 transition-transform duration-300 ease-in-out group"
                                whileHover={{ y: -5 }} // Subtle lift on hover
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-24 h-24 rounded-full mb-5 object-cover border-4 border-indigo-500 shadow-md group-hover:border-indigo-700 transition-colors duration-300"
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{location}</p> {/* Added location */}
                                <div className="flex justify-center my-2">
                                    {Array(5) // Always render 5 stars for consistent spacing
                                        .fill()
                                        .map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300" // Color stars based on rating
                                                    }`}
                                            />
                                        ))}
                                </div>
                                <p className="text-base text-gray-700 mt-2 mb-4 italic leading-relaxed">
                                    "{review}"
                                </p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom styles for Swiper pagination dots */}
            <style jsx>{`
                .mySwiper :global(.swiper-pagination-bullet) {
                    background: #9ca3af; /* Default gray dot */
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                    margin: 0 6px;
                }
                .mySwiper :global(.swiper-pagination-bullet-active) {
                    background: #6366f1; /* Active indigo dot */
                    width: 12px;
                    height: 12px;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;