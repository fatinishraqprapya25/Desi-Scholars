// components/Testimonials.jsx
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
            "This platform really helped me master JavaScript and React. The tutorials are easy to follow and very practical.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Raihan Islam",
        review:
            "As a Bangladeshi student, I appreciate the Bangla Node.js course. Super helpful and very well structured.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
    },
    {
        id: 3,
        name: "Nabila Rahman",
        review:
            "I passed my frontend test after following the resources here. Highly recommended!",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    What Our Students Say
                </h2>
                <p className="text-gray-600 mb-10">
                    Hear from learners who’ve improved their skills with our tutorials.
                </p>

                <Swiper
                    className="mySwiper"
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                    }}
                >
                    {testimonials.map(({ id, name, review, image, rating }) => (
                        <SwiperSlide key={id}>
                            <div className="bg-gray-100 rounded-xl shadow-md p-6 h-full flex flex-col items-center justify-between text-center">
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-indigo-500"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                                <div className="flex justify-center my-2">
                                    {Array(rating)
                                        .fill()
                                        .map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-lg" />
                                        ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{review}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Inline styles for pagination dots spacing */}
            <style jsx>{`
                .mySwiper :global(.swiper-pagination) {
                    margin-top: 1.5rem;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
