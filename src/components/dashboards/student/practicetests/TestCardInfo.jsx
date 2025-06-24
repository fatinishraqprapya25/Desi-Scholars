import { HelpCircle, BookOpen } from 'lucide-react';

function TestCardInfo({ difficulty, questions }) {
    return (
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4 gap-y-2">
            <span className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-1 text-gray-500" /> {difficulty}
            </span>
            <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-gray-500" /> {questions} Questions
            </span>
        </div>
    );
}

export default TestCardInfo;