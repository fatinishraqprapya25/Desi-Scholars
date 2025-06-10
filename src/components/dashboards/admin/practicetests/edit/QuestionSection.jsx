import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import { Lightbulb, PlusCircle } from "lucide-react";

const QuestionsSection = ({
    questions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionTextChange,
    handleAddOption,
    handleRemoveOption,
    handleOptionTextChange,
    handleCorrectAnswerChange,
}) => {
    const formItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    return (
        <div className="space-y-6 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Questions</h3>

            {questions.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                    <Lightbulb className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-base">No questions added yet.</p>
                    <p className="text-sm">Click "Add Question" to start building your test.</p>
                </div>
            )}

            <AnimatePresence>
                {questions.map((question, qIndex) => (
                    <QuestionCard
                        key={qIndex} // Consider unique IDs for questions in a real app
                        question={question}
                        qIndex={qIndex}
                        handleRemoveQuestion={handleRemoveQuestion}
                        handleQuestionTextChange={handleQuestionTextChange}
                        handleAddOption={handleAddOption}
                        handleRemoveOption={handleRemoveOption}
                        handleOptionTextChange={handleOptionTextChange}
                        handleCorrectAnswerChange={handleCorrectAnswerChange}
                        variants={formItemVariants}
                    />
                ))}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={handleAddQuestion}
                className="w-full flex items-center justify-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md font-medium text-base mt-6"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <PlusCircle className="h-5 w-5 mr-2" /> Add Question
            </motion.button>
        </div>
    );
};

export default QuestionsSection;