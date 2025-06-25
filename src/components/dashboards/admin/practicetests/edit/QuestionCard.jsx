import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, MinusCircle, PlusCircle } from "lucide-react";

const QuestionCard = ({
    question,
    qIndex,
    handleRemoveQuestion,
    handleRemoveOption,
    handleOptionTextChange,
    handleQuestionTextChange,
    handleCorrectAnswerChange,
    variants,
}) => {
    const [questionText, setQuestionText] = useState(question.question || "");
    const [options, setOptions] = useState(question.options || ["", ""]);
    const [topicName, setTopicName] = useState(question.topic || "");
    const [subjectName, setSubjectName] = useState(question.subject || "");
    const [chapterName, setChapterName] = useState(question.chapter || "");
    const [explanation, setExplanation] = useState(question.explanation || "");
    const [difficulty, setDifficulty] = useState(question.difficulty || "medium");
    const [scoreBond, setScoreBond] = useState(question.scoreBond || "1");
    const [tags, setTags] = useState(question.tags?.[0] || "bluebook only");
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
        question.correctAnswers?.[0] ?? 0
    );

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    useEffect(() => {
        setQuestionText(question.question || "");
        setOptions(question.options || ["", ""]);
        setTopicName(question.topic || "");
        setSubjectName(question.subject || "");
        setChapterName(question.chapter || "");
        setExplanation(question.explanation || "");
        setDifficulty(question.difficulty || "medium");
        setScoreBond(question.scoreBond || "1");
        setTags(question.tags?.[0] || "bluebook only");
        setCorrectAnswerIndex(question.correctAnswers?.[0] ?? 0);
    }, [question]);

    const handleOptionChangeLocal = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
        if (handleOptionTextChange) {
            handleOptionTextChange(qIndex, index, value);
        }
    };

    const handleRemoveOptionLocal = (index) => {
        if (options.length <= 2) return;
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);

        if (correctAnswerIndex === index) {
            setCorrectAnswerIndex(0);
            if (handleCorrectAnswerChange) handleCorrectAnswerChange(qIndex, 0);
        } else if (correctAnswerIndex > index) {
            setCorrectAnswerIndex(correctAnswerIndex - 1);
            if (handleCorrectAnswerChange)
                handleCorrectAnswerChange(qIndex, correctAnswerIndex - 1);
        }
        if (handleRemoveOption) {
            handleRemoveOption(qIndex, index);
        }
    };

    const handleQuestionUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/mcq/${question._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({
                    question: questionText.trim(),
                    options: options.map((opt) => opt.trim()),
                    correctAnswers: [correctAnswerIndex],
                    topic: topicName.trim(),
                    subject: subjectName.trim(),
                    chapter: chapterName.trim(),
                    explanation: explanation.trim(),
                    difficulty,
                    scoreBond,
                    tags: [tags],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Update failed:", data?.message || response.statusText);
                alert("Failed to update the question.");
            } else {
                alert("Question updated successfully.");
            }
        } catch (error) {
            console.error("Error updating question:", error);
            alert("An error occurred while updating the question.");
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative"
        >
            <button
                type="button"
                onClick={() => handleRemoveQuestion(qIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                title="Remove Question"
                aria-label={`Remove question ${qIndex + 1}`}
            >
                <XCircle className="h-6 w-6" />
            </button>

            <h4 className="text-md font-semibold text-gray-800 mb-3">Question {qIndex + 1}</h4>

            {/* Question Text */}
            <div className="mb-4">
                <label
                    htmlFor={`question-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Question Text
                </label>
                <textarea
                    id={`question-${qIndex}`}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter your question here..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Topic */}
            <div className="mb-4">
                <label
                    htmlFor={`topic-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Topic
                </label>
                <input
                    id={`topic-${qIndex}`}
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="Enter topic"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Subject */}
            <div className="mb-4">
                <label
                    htmlFor={`subject-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Subject
                </label>
                <input
                    id={`subject-${qIndex}`}
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Enter subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Chapter */}
            <div className="mb-4">
                <label
                    htmlFor={`chapter-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Chapter
                </label>
                <input
                    id={`chapter-${qIndex}`}
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    placeholder="Enter chapter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Explanation */}
            <div className="mb-4">
                <label
                    htmlFor={`explanation-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Explanation
                </label>
                <textarea
                    id={`explanation-${qIndex}`}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explanation (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                />
            </div>

            {/* Difficulty */}
            <div className="mb-4">
                <label
                    htmlFor={`difficulty-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Difficulty
                </label>
                <select
                    id={`difficulty-${qIndex}`}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* Score Bond */}
            <div className="mb-4">
                <label
                    htmlFor={`scoreBond-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Score Value
                </label>
                <select
                    id={`scoreBond-${qIndex}`}
                    value={scoreBond}
                    onChange={(e) => setScoreBond(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                        <option key={score} value={score.toString()}>
                            {score}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tags (single select) */}
            <div className="mb-4">
                <label
                    htmlFor={`tags-${qIndex}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Tags
                </label>
                <select
                    id={`tags-${qIndex}`}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                >
                    <option value="bluebook only">bluebook only</option>
                    <option value="exclude bluebook">exclude bluebook</option>
                </select>
            </div>

            {/* Options */}
            <div className="space-y-3 pl-4 border-l-2 border-indigo-200 mb-4">
                <h5 className="text-sm font-medium text-gray-700">Options (Select one correct answer)</h5>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="radio"
                            id={`q${qIndex}-option${index}`}
                            name={`q${qIndex}-correct-answer`}
                            checked={correctAnswerIndex === index}
                            onChange={() => setCorrectAnswerIndex(index)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor={`q${qIndex}-option${index}`} className="sr-only">
                            Option {index + 1}
                        </label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChangeLocal(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                            required
                        />
                        {options.length > 2 && (
                            <motion.button
                                type="button"
                                onClick={() => handleRemoveOptionLocal(index)}
                                className="p-1 text-red-500 hover:text-red-700 rounded-full transition-colors"
                                title="Remove Option"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Remove option ${index + 1}`}
                            >
                                <MinusCircle className="h-5 w-5" />
                            </motion.button>
                        )}
                    </div>
                ))}
            </div>

            {/* Update button */}
            <motion.button
                type="button"
                onClick={handleQuestionUpdate}
                className="flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <PlusCircle className="h-4 w-4 mr-1.5" /> Update Question
            </motion.button>
        </motion.div>
    );
};

export default QuestionCard;
