// src/pages/MockQuestion.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizFooter from "../components/mock/quiz/QuizFooter";
import QuizMetadataBar from "../components/mock/quiz/QuizMetabar";
import QuizActionButtons from "../components/mock/quiz/QuizActionButtons";
import QuizOption from "../components/mock/quiz/QuizOption";
import QuestionPromptAndPassage from "../components/mock/quiz/QuestionPromptAndPassage";

export default function MockQuestion() {
    const { id } = useParams();

    const quizTitle = id
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const totalQuestions = 60;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [initialTime, setInitialTime] = useState(500);
    const [quizData, setQuizData] = useState({});

    // Mock function to simulate fetching question by index
    const fetchQuestionByIndex = (index) => {
        return {
            metadata: {
                questionId: `question-${index}`,
                domain: 'Information and Ideas',
                skill: 'Command of Evidence',
                difficulty: index % 2 === 0 ? 'M' : 'E',
                scoreBand: index <= 20 ? '1' : index <= 40 ? '2' : '3',
            },
            passageText: `"Valia" is a 1907 short story by Leonid Andreyev. The setting where Valia is reading is nearly silent: ________.`,
            questionPrompt: `Q${index}: Which quotation from “Valia” most effectively illustrates the claim?`,
            options: [
                { id: 'A', text: `Option A content for question ${index}` },
                { id: 'B', text: `Option B content for question ${index}` },
                { id: 'C', text: `Option C content for question ${index}` },
                { id: 'D', text: `Option D content for question ${index}` },
            ],
        };
    };

    useEffect(() => {
        const data = fetchQuestionByIndex(currentQuestionIndex);
        setQuizData(data);
        setSelectedOptionId(null); // Clear selection on question change
    }, [currentQuestionIndex]);

    const handleQuizTimeUp = () => {
        console.log("Quiz Time is Up!");
    };

    const handleChronologicalClick = () => {
        console.log("Chronological button clicked!");
    };

    const handleToggleAttempted = () => {
        console.log("Toggle Attempted/Unattempted clicked!");
    };

    const handleToggleMarkForReview = () => {
        console.log("Toggle Mark for Review clicked!");
    };

    const handlePostDoubt = () => {
        console.log("Post Doubt clicked!");
    };

    const handleReport = () => {
        console.log("Report button clicked!");
    };

    const handleEdit = () => {
        console.log("Edit button clicked!");
    };

    const handleOptionSelect = (optionId) => {
        setSelectedOptionId(optionId);
        console.log(`Option ${optionId} selected.`);
    };

    const handleExit = () => {
        if (window.confirm("Are you sure you want to exit the quiz? Your progress might not be saved.")) {
            console.log("Exiting quiz...");
        }
    };

    const handleQuestionNav = () => {
        console.log("Open question navigation/list modal!");
    };

    const handleBack = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            console.log("This is the last question! Consider submitting quiz.");
        }
    };

    const isBackBtnDisabled = currentQuestionIndex === 1;
    const isNextBtnDisabled = currentQuestionIndex === totalQuestions;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <QuizHeader initialTime={initialTime} quizTitle={quizTitle} />

            <main className="flex-grow flex flex-col pt-4 pb-2 px-4 md:px-6 lg:px-8">
                <QuizMetadataBar
                    questionId={quizData.metadata?.questionId}
                    domain={quizData.metadata?.domain}
                    skill={quizData.metadata?.skill}
                    difficulty={quizData.metadata?.difficulty}
                    scoreBand={quizData.metadata?.scoreBand}
                    onChronologicalClick={handleChronologicalClick}
                />

                <div className="flex flex-col lg:flex-row flex-grow mt-4 gap-6">
                    <div className="lg:w-1/2 flex-shrink-0 relative bg-white rounded-lg shadow-sm p-6 overflow-hidden">
                        <QuestionPromptAndPassage
                            passageText={quizData.passageText}
                            questionPrompt={quizData.questionPrompt}
                            onArrowClick={() => console.log("Column toggle arrow clicked!")}
                            arrowDirection="right"
                        />
                    </div>

                    <div className="lg:w-1/2 flex-shrink-0 bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-hidden">
                        <QuizActionButtons
                            isUnattempted={false}
                            isMarkedForReview={false}
                            isPostDoubt={false}
                            onToggleAttempted={handleToggleAttempted}
                            onToggleMarkForReview={handleToggleMarkForReview}
                            onPostDoubt={handlePostDoubt}
                            onReport={handleReport}
                            onEdit={handleEdit}
                        />

                        <div className="flex flex-col space-y-4">
                            {quizData.options?.map((option) => (
                                <QuizOption
                                    key={option.id}
                                    optionLetter={option.id}
                                    optionText={option.text}
                                    isSelected={selectedOptionId === option.id}
                                    onSelect={() => handleOptionSelect(option.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <QuizFooter
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                onExitClick={handleExit}
                onQuestionNavClick={handleQuestionNav}
                onBackClick={handleBack}
                onNextClick={handleNext}
                isBackDisabled={isBackBtnDisabled}
                isNextDisabled={isNextBtnDisabled}
            />
        </div>
    );
}
