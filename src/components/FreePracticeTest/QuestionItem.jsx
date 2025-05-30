import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "./Constants";

const questionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const QuestionItem = ({ q, index, answers, submitted, handleAnswer }) => {
    return (
        <motion.div
            key={index}
            className={`bg-slate-50 p-5 sm:p-6 rounded-xl shadow-sm border border-${COLORS.border.replace("#", "")}`}
            variants={questionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.08, ease: "easeOut" }}
        >
            <p
                className={`font-semibold text-lg sm:text-xl mb-5`}
                style={{ color: COLORS.text }}
            >
                {index + 1}. {q.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {q.options.map((option, oIndex) => {
                    const isCorrect = submitted && oIndex === q.correct;
                    const isSelectedAndWrong = submitted && answers[index] === oIndex && oIndex !== q.correct;
                    const isSelected = answers[index] === oIndex;

                    return (
                        <label
                            key={oIndex}
                            htmlFor={`question-${index}-option-${oIndex}`}
                            className={`flex items-center p-3.5 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                ${submitted
                                    ? isCorrect
                                        ? "bg-green-100 border-green-500 shadow-md"
                                        : isSelectedAndWrong
                                            ? "bg-red-100 border-red-500 shadow-md"
                                            : "bg-white border-gray-200"
                                    : isSelected
                                        ? `border-${COLORS.primary.replace("#", "")} shadow-sm`
                                        : `bg-white hover:border-${COLORS.primary.replace("#", "")}/50 border-${COLORS.border.replace("#", "")}`
                                }
              `}
                            style={{
                                backgroundColor:
                                    !submitted && isSelected
                                        ? COLORS.primaryLight
                                        : undefined,
                            }}
                        >
                            <input
                                type="radio"
                                id={`question-${index}-option-${oIndex}`}
                                name={`question-${index}`}
                                disabled={submitted}
                                checked={isSelected}
                                onChange={() => handleAnswer(index, oIndex)}
                                className={`mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-1 border-gray-300`}
                                style={{ color: COLORS.primary }}
                            />
                            <span
                                className={`text-sm sm:text-base
                  ${isCorrect ? "font-semibold text-green-700" : ""}
                  ${isSelectedAndWrong ? "font-semibold text-red-700" : ""}
                  ${isSelected && !submitted
                                        ? `font-semibold text-${COLORS.primary.replace("#", "")}`
                                        : `text-${COLORS.textLight.replace("#", "")}`
                                    }`}
                                // The style prop below will override Tailwind classes, consider conditional classes or careful merging
                                style={{
                                    color: isSelected && !submitted ? COLORS.primary : (isCorrect ? undefined : (isSelectedAndWrong ? undefined : COLORS.textLight)),
                                }}
                            >
                                {option}
                            </span>
                        </label>
                    );
                })}
            </div>
            {submitted && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: "easeOut" }}
                    className={`mt-4 text-sm p-3 rounded-md
            ${answers[index] === q.correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
          `}
                >
                    <strong>Explanation:</strong> {q.explanation}
                </motion.p>
            )}
        </motion.div>
    );
};

export default QuestionItem;