// src/pages/MockQuestion.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader"; // Adjust path if necessary
import QuizFooter from "../components/mock/quiz/QuizFooter"; // Adjust path if necessary

// Import the new quiz body components
import QuizMetadataBar from "../components/mock/quiz/QuizMetabar";
import QuizActionButtons from "../components/mock/quiz/QuizActionButtons";
import QuizOption from "../components/mock/quiz/QuizOption";
import QuestionPromptAndPassage from "../components/mock/quiz/QuestionPromptAndPassage";


export default function MockQuestion() {
    const { id } = useParams();

    // --- Format Quiz Title from ID ---
    const quizTitle = id
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // --- State for Quiz Data (Mock Data) ---
    // In a real application, you would fetch this data based on 'id' and 'currentQuestionIndex'
    const [quizData, setQuizData] = useState({
        metadata: {
            questionId: '628e1305', // Example from screenshot
            domain: 'Information and Ideas',
            skill: 'Command of Evidence',
            difficulty: 'E',
            scoreBand: '1',
        },
        passageText: `“Valia” is a 1907 short story by Leonid Andreyev. In the story, the author emphasizes that the setting where the character Valia is reading is nearly silent: ________`,
        questionPrompt: `Which quotation from “Valia” most effectively illustrates the claim?`,
        options: [
            { id: 'A', text: `“The hand in which he carried his book was getting stiff with cold, but he would not ask his mother to take the book from him.”` },
            { id: 'B', text: `“Valia was reading a huge, very huge book, almost half as large as himself.”` },
            { id: 'C', text: `“He did not read very fast, and it might be said that he read quite slowly, but this did not bother him at all.”` },
            { id: 'D', text: `“Outside the window it was quiet, and only the rustling of the leaves in the bare maple trees could be heard at times.”` }, // Corrected spelling for example
        ],
        // You'd also have properties like:
        // isAttempted: false,
        // isMarkedForReview: false,
        // isPostDoubt: false,
        // selectedAnswerId: null, // To store the user's selected option
    });

    // --- State for Quiz UI Control ---
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const totalQuestions = 60; // Example total questions, replace with actual data
    const [selectedOptionId, setSelectedOptionId] = useState(null); // State for selected answer
    const [initialTime, setInitialTime] = useState(500); // Example: 500 seconds

    // --- Handlers for QuizHeader ---
    // Note: QuizHeader in its simplified version doesn't accept these props directly anymore
    // If you need functionality like info toggle, hint, dictionary, you'd add them back to QuizHeader
    // and manage their state/callbacks here.
    const handleQuizTimeUp = () => {
        console.log("Quiz Time is Up!");
        // Logic to automatically submit quiz or show results
    };

    // --- Handlers for QuizMetadataBar ---
    const handleChronologicalClick = () => {
        console.log("Chronological button clicked!");
        // Logic to open a chronological question list or sort options
    };

    // --- Handlers for QuizActionButtons ---
    const handleToggleAttempted = () => {
        console.log("Toggle Attempted/Unattempted clicked!");
        // Update quizData.isAttempted state
    };
    const handleToggleMarkForReview = () => {
        console.log("Toggle Mark for Review clicked!");
        // Update quizData.isMarkedForReview state
    };
    const handlePostDoubt = () => {
        console.log("Post Doubt clicked!");
        // Logic to open a post doubt modal
    };
    const handleReport = () => {
        console.log("Report button clicked!");
        // Logic to open a report issue modal
    };
    const handleEdit = () => {
        console.log("Edit button clicked!");
        // Logic to enable editing of the question (unlikely for a quiz taker)
    };

    // --- Handler for QuizOption selection ---
    const handleOptionSelect = (optionId) => {
        setSelectedOptionId(optionId);
        console.log(`Option ${optionId} selected.`);
        // In a real app, you'd save this to quizData or send to backend
    };

    // --- Handlers for QuizFooter ---
    const handleExit = () => {
        if (window.confirm("Are you sure you want to exit the quiz? Your progress might not be saved.")) {
            console.log("Exiting quiz...");
            // Implement navigation away or quiz end logic
        }
    };

    const handleQuestionNav = () => {
        console.log("Open question navigation/list modal!");
        // Implement logic to open a modal with all questions
    };

    const handleBack = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(prev => prev - 1);
            console.log("Navigating back...");
            setSelectedOptionId(null); // Clear selection for new question
            // Logic to load previous question data
        }
    };

    const handleCheck = () => {
        console.log("Checking answer for current question!");
        // Implement logic to check the current question's answer against correct one
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions) {
            setCurrentQIndex(prev => prev + 1);
            console.log("Navigating next...");
            setSelectedOptionId(null); // Clear selection for new question
            // Logic to load next question data
        } else {
            console.log("This is the last question! Consider submitting quiz.");
            // Implement logic for quiz submission
        }
    };

    // --- Determine button disabled states for Footer ---
    const isBackBtnDisabled = currentQuestionIndex === 1;
    const isNextBtnDisabled = currentQuestionIndex === totalQuestions;
    const isCheckBtnDisabled = !selectedOptionId; // Disable check if no option is selected


    return (
        <div className="flex flex-col min-h-screen bg-gray-50"> {/* Added a light background to the whole page */}
            <QuizHeader initialTime={initialTime} quizTitle={quizTitle} />

            {/* Quiz Body Section */}
            <main className="flex-grow flex flex-col pt-4 pb-2 px-4 md:px-6 lg:px-8">
                {/* Metadata Bar */}
                <QuizMetadataBar
                    questionId={quizData.metadata.questionId}
                    domain={quizData.metadata.domain}
                    skill={quizData.metadata.skill}
                    difficulty={quizData.metadata.difficulty}
                    scoreBand={quizData.metadata.scoreBand}
                    onChronologicalClick={handleChronologicalClick}
                />

                {/* Main Content Area: Passage/Prompt (Left) and Options/Actions (Right) */}
                <div className="flex flex-col lg:flex-row flex-grow mt-4 gap-6">
                    {/* Left Column: Passage and Question Prompt */}
                    <div className="lg:w-1/2 flex-shrink-0 relative bg-white rounded-lg shadow-sm p-6 overflow-hidden">
                        <QuestionPromptAndPassage
                            passageText={quizData.passageText}
                            questionPrompt={quizData.questionPrompt}
                            onArrowClick={() => console.log("Column toggle arrow clicked!")}
                            arrowDirection="right" // You can make this dynamic based on column state
                        />
                    </div>

                    {/* Right Column: Action Buttons and Options */}
                    <div className="lg:w-1/2 flex-shrink-0 bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-hidden">
                        {/* Action Buttons */}
                        <QuizActionButtons
                            isUnattempted={false} // Example state
                            isMarkedForReview={false}
                            isPostDoubt={false}
                            onToggleAttempted={handleToggleAttempted}
                            onToggleMarkForReview={handleToggleMarkForReview}
                            onPostDoubt={handlePostDoubt}
                            onReport={handleReport}
                            onEdit={handleEdit}
                        />

                        {/* Options */}
                        <div className="flex flex-col space-y-4">
                            {quizData.options.map((option) => (
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

            {/* Footer */}
            <QuizFooter
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                onExitClick={handleExit}
                onQuestionNavClick={handleQuestionNav}
                onBackClick={handleBack}
                onCheckClick={handleCheck}
                onNextClick={handleNext}
                isBackDisabled={isBackBtnDisabled}
                isNextDisabled={isNextBtnDisabled}
                isCheckDisabled={isCheckBtnDisabled}
            />
        </div>
    );
}