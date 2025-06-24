import { Link } from 'react-router-dom';

export default function TestHeader() {
    return (
        <header className="flex items-center justify-between pt-3 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">SAT Suite Question Bank</h1>
            <Link to="/" className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Go To Mock
            </Link>
        </header>
    );
}