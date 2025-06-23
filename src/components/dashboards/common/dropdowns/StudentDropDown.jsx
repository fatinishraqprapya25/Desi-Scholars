import { Link } from "react-router-dom"

export default function StudentDropDown() {
    return <>
        <Link
            to="/dashboard/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Profile
        </Link>
        <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Dashboard
        </Link>
        <Link
            to="/dashboard/practicetest"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Practice Tests
        </Link>
        <Link
            to="/dashboard/progress"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"     >
            Progress
        </Link>
        <Link
            to="/dashboard/resources"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Resources
        </Link>
    </>
}