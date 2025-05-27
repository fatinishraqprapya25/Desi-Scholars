import CourseCard from "./CourseCard";

const CourseGrid = () => {
    const courses = [
        {
            id: 1,
            title: "WordPress Customization Mastery | Build Your First...",
            imageUrl: "https://images.unsplash.com/photo-1627398436449-3665518b5b77?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image resembling the provided screenshot
            instructorName: "Ali Hossain",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=68", // Avatar for Ali Hossain (similar to "Atik Vai" in screenshot)
            ratingValue: 5.0,
            reviewCount: 18,
            studentCount: 1177,
            durationText: "10h",
            tags: "No Code, WordPress",
            priceText: "999.00৳",
        },
        {
            id: 2,
            title: "Advanced React Patterns for Modern Web Apps",
            imageUrl: "https://images.unsplash.com/photo-1633356122544-cd360822d13b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            instructorName: "Sarah Connor",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=47",
            ratingValue: 4.7,
            reviewCount: 75,
            studentCount: 1500,
            durationText: "18h 00m",
            tags: "Web Development, React",
            priceText: "$89",
        },
        {
            id: 3,
            title: "Mastering Python for Data Science & AI",
            imageUrl: "https://images.unsplash.com/photo-1579547621453-60bdc5415392?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            instructorName: "Dr. Anya Sharma",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=49",
            ratingValue: 4.9,
            reviewCount: 190,
            studentCount: 4200,
            durationText: "25h 10m",
            tags: "Data Science, AI, Python",
            priceText: "$129",
        },
        {
            id: 4,
            title: "Mobile App Development with Flutter & Dart",
            imageUrl: "https://images.unsplash.com/photo-1596541223130-cf2bc6895377?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            instructorName: "Michael Chang",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=50",
            ratingValue: 4.6,
            reviewCount: 110,
            studentCount: 2800,
            durationText: "22h 00m",
            tags: "Mobile Development, Flutter",
            priceText: "$109",
        },
        {
            id: 5,
            title: "UI/UX Design Fundamentals: Figma Masterclass",
            imageUrl: "https://images.unsplash.com/photo-1616428751508-fd204278b27c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            instructorName: "Olivia Davis",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=51",
            ratingValue: 4.7,
            reviewCount: 140,
            studentCount: 3100,
            durationText: "14h 45m",
            tags: "Design, UI/UX",
            priceText: "$75",
        },
        {
            id: 6,
            title: "Digital Marketing Strategy for Entrepreneurs",
            imageUrl: "https://images.unsplash.com/photo-1557804506-66779b5aa81e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            instructorName: "David Kim",
            instructorAvatarUrl: "https://i.pravatar.cc/40?img=52",
            ratingValue: 4.5,
            reviewCount: 60,
            studentCount: 1200,
            durationText: "9h 30m",
            tags: "Marketing, Business",
            priceText: "$65",
        },
    ];

    return (
        <div className="px-4 py-3">
            <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
            {/* Grid layout adjusted for 3 columns on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </div>
    );
};

export default CourseGrid;