import CourseCard from "./CourseCard";

const CourseGrid = () => {
    const courses = [
        {
            id: 1,
            title: "React for Beginners",
            instructor: "John Doe",
            rating: 4.5,
            price: "$49",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            title: "Advanced CSS Techniques",
            instructor: "Jane Smith",
            rating: 4.7,
            price: "Free",
            image: "https://via.placeholder.com/300x200",
        },
        // Add more courses as needed
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
            ))}
        </div>
    );
};

export default CourseGrid;