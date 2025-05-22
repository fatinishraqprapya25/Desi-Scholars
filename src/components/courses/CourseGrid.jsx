import CourseCard from "./CourseCard";

const CourseGrid = () => {
    const courses = [
        {
            id: 1,
            title: "React for Beginners",
            instructor: "John Doe",
            rating: 4.5,
            price: "$49",
            image: "https://images.unsplash.com/photo-1584697964154-94363a7b219e?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 2,
            title: "Advanced CSS Techniques",
            instructor: "Jane Smith",
            rating: 4.7,
            price: "Free",
            image: "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            title: "JavaScript Mastery",
            instructor: "Alice Johnson",
            rating: 4.8,
            price: "$79",
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 4,
            title: "Fullstack Web Development",
            instructor: "Bob Williams",
            rating: 4.6,
            price: "$99",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 5,
            title: "Intro to UI/UX Design",
            instructor: "Emily Brown",
            rating: 4.3,
            price: "Free",
            image: "https://images.unsplash.com/photo-1603974501520-42e3d2a3d4d6?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 6,
            title: "Node.js Essentials",
            instructor: "Daniel Lee",
            rating: 4.4,
            price: "$59",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        },
    ];

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </div>
    );
};

export default CourseGrid;
