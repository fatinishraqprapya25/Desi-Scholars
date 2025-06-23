export default function AdminDropDown() {
    return <>
        <Link
            to="/admin/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Dashboard
        </Link>
        <Link
            to="/admin/teachers"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Manage Teachers
        </Link>
        <Link
            to="/admin/courses"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Our Courses
        </Link>
        <Link
            to="/admin/resources"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Resources
        </Link>
        <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Logout
        </button>
    </>
}