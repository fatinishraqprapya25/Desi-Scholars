import { FileText } from 'lucide-react';

const CreateTestHeader = () => {
    return (
        <>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-5 flex items-center">
                <FileText className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-indigo-600" /> Create New Practice Test
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-7 max-w-3xl leading-relaxed">
                Design and build new practice tests with customizable questions and options.
            </p>
        </>
    );
};

export default CreateTestHeader;