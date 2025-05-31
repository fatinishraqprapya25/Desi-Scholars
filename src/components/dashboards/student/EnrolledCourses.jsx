import { BookOpen, Compass } from 'lucide-react';

const enrolledCourses = [
    {
        id: 1,
        title: 'Introduction to Web Development',
        progress: 75,
        nextLesson: 'CSS Flexbox',
        instructor: 'Dr. Alice Smith',
        lastAccessed: '2 days ago',
    },
    {
        id: 2,
        title: 'Calculus I',
        progress: 40,
        nextLesson: 'Derivatives',
        instructor: 'Prof. John Doe',
        lastAccessed: '5 days ago',
    },
    {
        id: 3,
        title: 'Data Structures and Algorithms',
        progress: 90,
        nextLesson: 'Graph Traversal',
        instructor: 'Ms. Emily White',
        lastAccessed: '1 day ago',
    },
];


export default function EnrolledCourses() {
    return <>
        <section className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                <BookOpen className="mr-3 text-blue-600" /> Enrolled Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-blue-50 p-5 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                        <h4 className="text-xl font-bold text-blue-800 mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">Progress: {course.progress}% Complete</p>
                        <p className="text-sm text-gray-700 mb-4">Next Lesson: <span className="font-medium">{course.nextLesson}</span></p>
                        <p className="text-xs text-gray-500 mb-4">Last Accessed: {course.lastAccessed}</p>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                            <Compass className="mr-2 h-4 w-4" /> Continue Course
                        </button>
                    </div>
                ))}
            </div>
        </section>
    </>
}