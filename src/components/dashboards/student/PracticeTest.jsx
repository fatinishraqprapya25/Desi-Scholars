import { FileText, Award } from 'lucide-react';

export default function PracticeTest() {
    return (
        <>
            <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                    <FileText className="mr-3 text-green-600" /> Practice Tests
                </h3>
                <p className="text-gray-700 mb-4">Sharpen your skills with our extensive collection of practice tests.</p>
                <button className="w-full bg-green-600 text-white py-3 px-5 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-medium flex items-center justify-center">
                    <Award className="mr-2 h-5 w-5" /> Attempt a Test
                </button>
            </div>

        </>
    )
}