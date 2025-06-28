import { useLocation } from "react-router-dom";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";
import Footer from "./quiz/Footer";
import { useEffect, useState, useRef, useCallback } from "react";
import NavigationSection from "./quiz/NavigationSection";
import validateToken from "../../utils/ValidateToken";
import QuizHeader from "./quiz/QuizHeader";
import App from "./quiz/PopUp";
import FinishStatus from "./quiz/FinishStatus";

export default function Quiz() {
    const location = useLocation();
    const query = location.state;
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [markable, setMarkable] = useState(false);
    const [showMeta, setShowMeta] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [ansCorrect, setIsCorrct] = useState(null);
    const [crossAble, setCrossAble] = useState(false);

    const [showMetaBar, setShowMetaBar] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const [leftPanelWidth, setLeftPanelWidth] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);

    const [localHistory, setLocalHistory] = useState({
        totalQuestionsSolved: 0,
        questionsSolvedFirstAttempt: 0,
        questionsSolvedAfterMistake: 0,
        incorrectButUncorrected: 0, // New field to track
        totalTimeNeeded: 0,
        questionAttempts: {}, // Tracks attempts and correctness for each question ID
    });

    const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        setIsCorrct(null);
    }, [selectedOption]);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/mcq?${new URLSearchParams(query)}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch questions.");
            }
            const data = await response.json();
            setQuestions(data.data || []);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [query]);

    useEffect(() => {
        setSelectedOption(null);
        setIsRunning(true);
        setTime(0);
    }, [currentIndex]);

    const handleNext = () => {
        if (questions.length === currentIndex + 1) {
            setFinished(true);
        } else {
            setIsCorrct(null);
            setCurrentIndex((index) => index + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            console.log("No previous questions.");
        } else {
            setIsCorrct(null);
            setCurrentIndex((index) => index - 1);
        }
    };

    const handleTextSelection = () => {
        if (!markable) return;

        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.className = "highlight";
            span.textContent = selectedText;

            range.deleteContents();
            range.insertNode(span);

            selection.removeAllRanges();
        }
    };

    const updateLocalHistory = useCallback(
        (questionId, isCorrect, timeSpent) => {
            setLocalHistory((prev) => {
                const currentQuestionAttempt = prev.questionAttempts[questionId] || {
                    attempts: 0,
                    correct: false,
                    firstAttemptCorrect: false,
                    wasIncorrect: false, // Track if it was ever answered incorrectly
                };

                const newQuestionAttempts = {
                    ...prev.questionAttempts,
                    [questionId]: {
                        ...currentQuestionAttempt,
                        attempts: currentQuestionAttempt.attempts + 1,
                        correct: isCorrect || currentQuestionAttempt.correct,
                        firstAttemptCorrect:
                            currentQuestionAttempt.attempts === 0 && isCorrect
                                ? true
                                : currentQuestionAttempt.firstAttemptCorrect,
                        wasIncorrect: currentQuestionAttempt.wasIncorrect || !isCorrect, // Mark as incorrect if current attempt is incorrect
                    },
                };

                const totalQuestionsSolved = Object.values(newQuestionAttempts).filter(
                    (q) => q.correct
                ).length;
                const questionsSolvedFirstAttempt = Object.values(
                    newQuestionAttempts
                ).filter((q) => q.firstAttemptCorrect).length;
                const questionsSolvedAfterMistake = Object.values(
                    newQuestionAttempts
                ).filter((q) => q.correct && !q.firstAttemptCorrect).length;

                // Calculate incorrect but uncorrected
                const incorrectButUncorrected = Object.values(newQuestionAttempts).filter(
                    (q) => q.wasIncorrect && !q.correct
                ).length;

                return {
                    ...prev,
                    totalQuestionsSolved,
                    questionsSolvedFirstAttempt,
                    questionsSolvedAfterMistake,
                    incorrectButUncorrected, // Update the new field
                    totalTimeNeeded: prev.totalTimeNeeded + timeSpent,
                    questionAttempts: newQuestionAttempts,
                };
            });
        },
        []
    );

    const handleCheck = () => {
        const question = questions[currentIndex];
        const writeAnswers = question.correctAnswers;
        const isCorrect = writeAnswers.includes(selectedOption);
        setIsCorrct(isCorrect);
        setIsRunning(false);
        updateLocalHistory(question._id, isCorrect, time);
    };

    const handleCross = () => {
        setCrossAble(!crossAble);
    };

    const handleHistoryQuestionIndex = (id) => {
        const findIndex = questions.findIndex((question) => question._id === id);
        if (findIndex !== -1) {
            setCurrentIndex(findIndex);
        }
    };

    const handleMouseDown = useCallback(() => {
        setIsResizing(true);
        document.body.style.userSelect = "none";
        document.body.style.cursor = "ew-resize";
    }, []);

    const handleMouseMove = useCallback(
        (e) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const newLeftPanelWidth =
                ((e.clientX - containerRect.left) / containerRect.width) * 100;

            if (newLeftPanelWidth > 10 && newLeftPanelWidth < 90) {
                setLeftPanelWidth(newLeftPanelWidth);
                setIsLeftPanelCollapsed(false);
            }
        },
        [isResizing]
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const handleToggleCollapse = () => {
        if (isLeftPanelCollapsed) {
            setLeftPanelWidth(50);
            setIsLeftPanelCollapsed(false);
        } else {
            setLeftPanelWidth(0);
            setIsLeftPanelCollapsed(true);
        }
    };

    const leftWidth = isLeftPanelCollapsed ? "0%" : `${leftPanelWidth}%`;
    const rightWidth = isLeftPanelCollapsed ? "100%" : `${100 - leftPanelWidth}%`;

    if (finished) {
        return <FinishStatus localHistory={localHistory} />;
    }

    return (
        <>
            {showPopUp && (
                <App
                    questions={questions}
                    handleHistoryQuestionIndex={handleHistoryQuestionIndex}
                    setShowPopUp={setShowPopUp}
                />
            )}
            <QuizHeader
                moduleName={questions?.[currentIndex]?.subject}
                showMetaBar={showMetaBar}
                setShowMetaBar={setShowMetaBar}
                time={time}
                chapterName={questions?.[currentIndex]?.chapter}
            />

            <div
                ref={containerRef}
                className="flex bg-white noto mt-18 overflow-hidden"
                onMouseUp={handleTextSelection}
                style={{ height: "calc(100vh - 200px)" }}
            >
                <div
                    style={{
                        width: leftWidth,
                        minWidth: isLeftPanelCollapsed ? "0" : "10%",
                        transition: isResizing ? "none" : "width 0.3s ease",
                    }}
                    className={`relative ${isLeftPanelCollapsed ? "hidden" : "block"
                        } no-scrollbar`}
                >
                    <div className="h-full overflow-y-auto no-scrollbar pr-2">
                        <LeftSide
                            meta={showMeta}
                            changeMeta={setShowMeta}
                            length={questions.length}
                            question={questions[currentIndex]}
                        />
                    </div>
                </div>

                <div
                    className="relative w-2 bg-gray-200 cursor-ew-resize flex items-center justify-center flex-shrink-0"
                    onMouseDown={handleMouseDown}
                >
                    <div className="absolute h-full w-0.5 bg-gray-400"></div>
                </div>

                <div
                    style={{
                        width: rightWidth,
                        minWidth: isLeftPanelCollapsed ? "100%" : "10%",
                        transition: isResizing ? "none" : "width 0.3s ease",
                    }}
                    className="relative no-scrollbar"
                >
                    <div className="h-full overflow-y-auto no-scrollbar pr-2">
                        <RightSide
                            crossAble={crossAble}
                            handleCross={handleCross}
                            currentIndex={currentIndex}
                            ansCorrect={ansCorrect}
                            sOption={selectedOption}
                            changeOption={setSelectedOption}
                            meta={showMeta}
                            question={questions[currentIndex]}
                            markable={markable}
                            onChangeMarkable={setMarkable}
                        />
                    </div>
                </div>
            </div>

            <Footer
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOption={selectedOption}
                handleCheck={handleCheck}
                handleNext={handleNext}
                handlePrev={handlePrev}
                showPopUp={showPopUp}
                setShowPopUp={setShowPopUp}
            />
        </>
    );
}