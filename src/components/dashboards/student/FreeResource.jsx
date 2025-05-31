import { BookOpen, FolderOpen } from 'lucide-react';

export default function FreeResources() {
    return (
        <>
            <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-200">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FolderOpen className="mr-3 text-purple-600" /> Free Resources
                </h3>
                <p className="text-gray-700 mb-4">Access a library of free study materials, tutorials, and guides.</p>
                <button className="w-full bg-purple-600 text-white py-3 px-5 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center">
                    <BookOpen className="mr-2 h-5 w-5" /> Explore Resources
                </button>
            </div>

        </>
    )


}