import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ searchQuery }) => {
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        const response = await fetch("http://localhost:5000/api/courses");
        if (!response.ok) {
            alert("failed to fetch courses!");
            return;
        }
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        setCourses(result.data);
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    const applyFilter = (query) => {
        console.log(query);
    }

    return (
        <div className="px-4 py-3">
            <h2 className="text-2xl font-bold mb-6">Available Courses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course._id} {...course} />
                ))}
            </div>
        </div>
    );
};

export default CourseGrid;