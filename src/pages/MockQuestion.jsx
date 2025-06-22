import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizFooter from "../components/mock/quiz/QuizFooter";
import QuizMetadataBar from "../components/mock/quiz/QuizMetabar";
import QuizActionButtons from "../components/mock/quiz/QuizActionButtons";
import QuizOption from "../components/mock/quiz/QuizOption";
import QuestionPromptAndPassage from "../components/mock/quiz/QuestionPromptAndPassage";
import CombinedCalculator from "./CombinedCalculator";
import BreakQuiz from "../components/mock/Break";

export default function MockQuestion() {
    const { id } = useParams();

    const quizTitle = id
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const totalQuestions = 10;
    const breakAt = totalQuestions / 2 + 1;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [initialTime] = useState(500);
    const [quizData, setQuizData] = useState({});
    const [showCal, setShowCal] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);

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

    const navigate = useNavigate();

    useEffect(() => {
        if (currentQuestionIndex === breakAt) {
            setIsOnBreak(true);
        } else {
            const data = fetchQuestionByIndex(currentQuestionIndex);
            setQuizData(data);
            setSelectedOptionId(null);
        }
    }, [currentQuestionIndex]);

    const handleExit = () => navigate("/mock");

    const handleBack = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (isOnBreak) return;
        if (currentQuestionIndex < totalQuestions) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            console.log("End of quiz.");
        }
    };

    const handleResumeFromBreak = () => {
        setIsOnBreak(false);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const showCalculator = () => setShowCal(!showCal);

    const isBackBtnDisabled = currentQuestionIndex === 1 || isOnBreak;
    const isNextBtnDisabled = currentQuestionIndex === totalQuestions || isOnBreak;

    if (isOnBreak) {
        return (
            <BreakQuiz handleResumeFromBreak={handleResumeFromBreak} />
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {showCal && <CombinedCalculator />}
            <QuizHeader initialTime={initialTime} quizTitle={quizTitle} showCalculator={showCalculator} />

            <main className="flex-grow flex flex-col pt-4 pb-2 px-4 md:px-6 lg:px-8">
                <QuizMetadataBar
                    questionId={quizData.metadata?.questionId}
                    domain={quizData.metadata?.domain}
                    skill={quizData.metadata?.skill}
                    difficulty={quizData.metadata?.difficulty}
                    scoreBand={quizData.metadata?.scoreBand}
                    onChronologicalClick={() => console.log("Chronological clicked")}
                />

                <div className="flex flex-col lg:flex-row flex-grow mt-4 gap-6">
                    <div className="lg:w-1/2 bg-white rounded-lg shadow-sm p-6 overflow-hidden">
                        <QuestionPromptAndPassage
                            passageText={quizData.passageText}
                            questionPrompt={quizData.questionPrompt}
                            onArrowClick={() => console.log("Column toggle arrow clicked!")}
                            arrowDirection="right"
                        />
                    </div>

                    <div className="lg:w-1/2 bg-white rounded-lg shadow-sm p-6 flex flex-col overflow-hidden">
                        <QuizActionButtons
                            isUnattempted={false}
                            isMarkedForReview={false}
                            isPostDoubt={false}
                            onToggleAttempted={() => console.log("Attempted toggled")}
                            onToggleMarkForReview={() => console.log("Mark for review toggled")}
                            onPostDoubt={() => console.log("Post doubt")}
                            onReport={() => console.log("Report")}
                            onEdit={() => console.log("Edit")}
                        />
                        <div className="flex flex-col space-y-4">
                            {quizData.options?.map((option) => (
                                <QuizOption
                                    key={option.id}
                                    optionLetter={option.id}
                                    optionText={option.text}
                                    isSelected={selectedOptionId === option.id}
                                    onSelect={() => setSelectedOptionId(option.id)}
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
                onQuestionNavClick={() => console.log("Open question navigation/list modal")}
                onBackClick={handleBack}
                onNextClick={handleNext}
                isBackDisabled={isBackBtnDisabled}
                isNextDisabled={isNextBtnDisabled}
            />
        </div>
    );
}
