import { Lightbulb } from 'lucide-react';

const NoTestsFoundMessage = () => {
    return (
        <div className="text-center py-10 text-gray-500 text-base">
            <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No practice tests found</h3>
            <p className="mt-1 text-sm text-gray-500">
                Adjust your search or create a new practice test!
            </p>
        </div>
    );
};

export default NoTestsFoundMessage;