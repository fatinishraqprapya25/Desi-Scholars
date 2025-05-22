import { FaRegStar, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const courses = [
    {
        id: 1,
        thumbnail: "https://picsum.photos/id/1011/400/300",
        name: "React for Beginners",
        instructor: "Alice Johnson",
        price: "$49",
        rating: 4,
    },
    {
        id: 2,
        thumbnail: "https://picsum.photos/id/1012/400/300",
        name: "Advanced JavaScript",
        instructor: "Michael Lee",
        price: "$59",
        rating: 5,
    },
    {
        id: 3,
        thumbnail: "https://picsum.photos/id/1013/400/300",
        name: "UI/UX Design Essentials",
        instructor: "Sara Kim",
        price: "$39",
        rating: 4,
    },
    {
        id: 4,
        thumbnail: "https://picsum.photos/id/1015/400/300",
        name: "Intro to Machine Learning",
        instructor: "James Carter",
        price: "$69",
        rating: 5,
    },
    {
        id: 5,
        thumbnail: "https://picsum.photos/id/1016/400/300",
        name: "Data Science Basics",
        instructor: "Alice Johnson",
        price: "$55",
        rating: 3,
    },
    {
        id: 6,
        thumbnail: "https://picsum.photos/id/1018/400/300",
        name: "Python Programming",
        instructor: "Michael Lee",
        price: "$45",
        rating: 4,
    },
];

function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            i <= rating ? (
                <FaStar key={i} className="text-yellow-400 inline-block" />
            ) : (
                <FaRegStar key={i} className="text-yellow-400 inline-block" />
            )
        );
    }
    return <div className="flex space-x-1">{stars}</div>;
}

export default function TopCourses() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Top Courses
                </h2>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 28 },
                        1280: { slidesPerView: 4, spaceBetween: 32 },
                    }}
                    className="pb-10 mt-8" // extra top margin for dots
                >
                    {courses.map(({ id, thumbnail, name, instructor, price, rating }) => (
                        <SwiperSlide key={id}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                <img
                                    src={thumbnail}
                                    alt={name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">By {instructor}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <StarRating rating={rating} />
                                        <span className="text-indigo-600 font-semibold">{price}</span>
                                    </div>
                                    <button className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
