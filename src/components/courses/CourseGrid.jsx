import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ searchQuery = {} }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);

        try {
            const params = new URLSearchParams();

            // Safely append query values
            if (searchQuery.search) {
                params.append("search", searchQuery.search.toLowerCase());
            }
            if (searchQuery.level) {
                params.append("level", searchQuery.level.toLowerCase());
            }
            if (searchQuery.price) {
                params.append("price", searchQuery.price.toLowerCase());
            }

            const url = `http://localhost:5000/api/courses?${params.toString()}`;
            const response = await fetch(url);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to fetch courses");
            }

            setCourses(result.data);
        } catch (err) {
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [searchQuery]);

    return (
        <div className="px-4 py-3">
            <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

            {loading ? (
                <p>Loading...</p>
            ) : courses.length === 0 ? (
                <p className="text-gray-500">No courses found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course._id} {...course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseGrid;
