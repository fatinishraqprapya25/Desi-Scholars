import { FaBookOpen, FaBroadcastTower, FaClock, FaVideo } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const courses = [
    {
        id: 1,
        thumbnail: "https://picsum.photos/id/1011/400/300",
        name: "React for Beginners",
        instructor: "Alice Johnson",
        duration: "12h",
        liveClasses: "Yes",
        recorded: "Yes",
        sessions: "8",
        description: "Kickstart your front-end journey with React fundamentals. Build dynamic and responsive user interfaces.",
    },
    {
        id: 2,
        thumbnail: "https://picsum.photos/id/1012/400/300",
        name: "Advanced JavaScript",
        instructor: "Michael Lee",
        duration: "15h",
        liveClasses: "Yes",
        recorded: "Yes",
        sessions: "10",
        description: "Master complex JS concepts like async/await, closures, and ES6+ features for robust applications.",
    },
    {
        id: 3,
        thumbnail: "https://picsum.photos/id/1013/400/300",
        name: "UI/UX Design Essentials",
        instructor: "Sara Kim",
        duration: "10h",
        liveClasses: "No",
        recorded: "Yes",
        sessions: "6",
        description: "Learn to create intuitive and engaging user experiences from wireframes to high-fidelity prototypes.",
    },
    {
        id: 4,
        thumbnail: "https://picsum.photos/id/1015/400/300",
        name: "Intro to Machine Learning",
        instructor: "James Carter",
        duration: "20h",
        liveClasses: "Yes",
        recorded: "Yes",
        sessions: "12",
        description: "Discover the basics of AI and machine learning. Understand algorithms, data preprocessing, and model building.",
    },
    {
        id: 5,
        thumbnail: "https://picsum.photos/id/1016/400/300",
        name: "Data Science Basics",
        instructor: "Alice Johnson",
        duration: "14h",
        liveClasses: "No",
        recorded: "Yes",
        sessions: "7",
        description: "Grasp fundamental data science concepts: analysis, visualization, and statistical reasoning for insights.",
    },
    {
        id: 6,
        thumbnail: "https://picsum.photos/id/1018/400/300",
        name: "Python Programming",
        instructor: "Michael Lee",
        duration: "18h",
        liveClasses: "Yes",
        recorded: "Yes",
        sessions: "10",
        description: "Become proficient in Python, from core syntax to advanced scripting and object-oriented practices.",
    },
];

export default function TopCourses() {
    return (
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-sm">
                    Explore Our <span className="text-indigo-600">Top Courses</span>
                </h2>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + ' custom-pagination-bullet"></span>';
                        },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    className="mySwiper"
                    effect="slide"
                >
                    {courses.map(
                        ({ id, thumbnail, name, instructor, duration, liveClasses, recorded, sessions, description }) => (
                            <SwiperSlide key={id}>
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
                                    <img
                                        src={thumbnail}
                                        alt={name}
                                        className="w-full h-48 object-cover object-center transform transition-transform duration-300 hover:scale-105"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/400x300/E0E0E0/333333?text=Image+Error`; }}
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{name}</h3>
                                        <p className="text-sm text-indigo-700 font-medium mb-3">Instructor: {instructor}</p>
                                        <p className="text-gray-700 text-base mb-5 flex-grow line-clamp-3">{description}</p>

                                        <div className="space-y-3 text-base text-gray-800 mb-6">
                                            <p className="flex items-center gap-3">
                                                <FaClock className="text-purple-600 text-lg" /> Duration: <span className="font-semibold">{duration}</span>
                                            </p>
                                            <p className="flex items-center gap-3">
                                                <FaBroadcastTower className="text-green-600 text-lg" /> Live Classes: <span className="font-semibold">{liveClasses}</span>
                                            </p>
                                            <p className="flex items-center gap-3">
                                                <FaVideo className="text-blue-600 text-lg" /> Recorded: <span className="font-semibold">{recorded}</span>
                                            </p>
                                            <p className="flex items-center gap-3">
                                                <FaBookOpen className="text-red-500 text-lg" /> Sessions: <span className="font-semibold">{sessions}</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-auto">
                                            <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer">
                                                Enroll Now
                                            </button>
                                            <button className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer">
                                                Course Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
            <style jsx>{`
                .swiper-pagination.swiper-pagination-bullets {
                    padding-top: 3rem;
                    position: relative;
                }
                .custom-pagination-bullet {
                    width: 12px !important;
                    height: 12px !important;
                    background: #bdbdbd !important;
                    opacity: 1 !important;
                    transition: background-color 0.3s ease;
                }
                .custom-pagination-bullet.swiper-pagination-bullet-active {
                    background: #6366f1 !important;
                    transform: scale(1.2);
                }
            `}</style>
        </section>
    );
}