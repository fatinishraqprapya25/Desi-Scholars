import { useLocation } from "react-router-dom";
// Assuming these are standard imports from your project structure
// import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";
import Footer from "./quiz/Footer";
import { useEffect, useState, useRef, useCallback } from "react";
import NavigationSection from "./quiz/NavigationSection";
import validateToken from "../../utils/ValidateToken"; // Assuming validateToken is correctly implemented
import QuizHeader from "./quiz/QuizHeader";

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
    const [testHistory, setTestHistory] = useState([]);

    const [showMetaBar, setShowMetaBar] = useState(true);
    // console.log(showMetaBar);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    // State for controlling the layout with the divider
    const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Initial percentage width for left panel
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);

    // This state will manage if the left panel is fully collapsed
    const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);


    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        setIsCorrct(null);
    }, [selectedOption]);

    const fetchQuestions = async () => {
        try {
            // Updated to reflect the current date and location context, if this data is time-sensitive.
            // If the questions are static, no change is needed here.
            const response = await fetch(`http://localhost:5000/api/mcq?${new URLSearchParams(query)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch questions.");
            }
            const data = await response.json();
            // console.log(data);
            setQuestions(data.data || []);
        } catch (err) {
            // Using a custom message box instead of alert()
            console.error(err.message);
            // You would typically show a custom modal or message here
        }
    };

    const fetchTestHistory = async () => {
        const checkUser = await validateToken();
        if (checkUser) {
            const response = await fetch(`http://localhost:5000/api/test-history/${checkUser.id}`);
            const result = await response.json();
            if (result.success) {
                setTestHistory(result.data);
            }
        }
    }

    useEffect(() => {
        fetchQuestions();
        fetchTestHistory();
    }, [query]);

    useEffect(() => {
        setSelectedOption(null);
        setIsRunning(true);
        setTime(0);
    }, [currentIndex]);

    const handleNext = () => {
        if (questions.length === currentIndex + 1) {
            // Using a custom message box instead of alert()
            console.log("No more questions available.");
            // You would typically show a custom modal or message here
        } else {
            setIsCorrct(null);
            setCurrentIndex(index => index + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            // Using a custom message box instead of alert()
            console.log("No previous questions.");
            // You would typically show a custom modal or message here
        } else {
            setIsCorrct(null);
            setCurrentIndex(index => index - 1);
        }
    }

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

    const saveHistory = async (question, isCorrect) => {
        const checkUser = await validateToken();
        if (checkUser && question) {
            const payload = {
                userId: checkUser.id,
                questionId: question._id,
                status: isCorrect ? "Correct" : "Incorrect",
                time
            }

            const response = await fetch("http://localhost:5000/api/test-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            // const result = await response.json();
            // Handle response if needed, e.g., check for success.
        }
    }

    const handleCheck = () => {
        const question = questions[currentIndex];
        const writeAnswers = question.correctAnswers;
        const isCorrect = writeAnswers.includes(selectedOption);
        setIsCorrct(isCorrect);
        setIsRunning(false);
        saveHistory(question, isCorrect);
    }

    const handleCross = () => {
        setCrossAble(!crossAble);
    }

    const handleHistoryQuestionIndex = (id) => {
        const findIndex = questions.findIndex(question => question._id === id);
        if (findIndex !== -1) {
            setCurrentIndex(findIndex);
        }
    }

    // Resizing logic for the panels
    const handleMouseDown = useCallback(() => {
        setIsResizing(true);
        // Add a class to body to prevent text selection during drag
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize'; // Set cursor to resize
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isResizing || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        // Calculate new width based on mouse X position relative to container's left edge
        const newLeftPanelWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Prevent panels from becoming too small
        if (newLeftPanelWidth > 10 && newLeftPanelWidth < 90) {
            setLeftPanelWidth(newLeftPanelWidth);
            setIsLeftPanelCollapsed(false); // Uncollapse if user is resizing
        }
    }, [isResizing]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.userSelect = ''; // Reset user-select
        document.body.style.cursor = ''; // Reset cursor
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    // Function to toggle collapse/expand (kept for completeness, but buttons removed)
    const handleToggleCollapse = () => {
        if (isLeftPanelCollapsed) {
            // Restore to 50% or a sensible default
            setLeftPanelWidth(50);
            setIsLeftPanelCollapsed(false);
        } else {
            // Collapse left panel (make its width 0)
            setLeftPanelWidth(0);
            setIsLeftPanelCollapsed(true);
        }
    };

    // Calculate dynamic widths for the panels
    const leftWidth = isLeftPanelCollapsed ? '0%' : `${leftPanelWidth}%`;
    const rightWidth = isLeftPanelCollapsed ? '100%' : `${100 - leftPanelWidth}%`;


    return (
        <>
            {/* QuizHeader displays module and chapter name from the current question */}
            <QuizHeader
                moduleName={questions?.[currentIndex]?.subject}
                showMetaBar={showMetaBar}
                setShowMetaBar={setShowMetaBar}
                time={time}
                chapterName={questions?.[currentIndex]?.chapter}
            />

            <div
                ref={containerRef}
                // Use 'flex' for layout, 'overflow-hidden' on the container to prevent any main scrollbars
                className="flex bg-white noto mt-10 overflow-hidden"
                onMouseUp={handleTextSelection} // This is for highlighting text, not resizing
                // A fixed height is often necessary for inner scrolling to work correctly
                style={{ height: 'calc(100vh - 200px)' }}
            >
                {/* Left Side Panel */}
                <div
                    style={{
                        width: leftWidth,
                        minWidth: isLeftPanelCollapsed ? '0' : '10%', // Min width to prevent collapsing during drag
                        transition: isResizing ? 'none' : 'width 0.3s ease' // No transition during drag, smooth otherwise
                    }}
                    className={`relative ${isLeftPanelCollapsed ? 'hidden' : 'block'} no-scrollbar`} // Hide content if collapsed, apply no-scrollbar class
                >
                    {/* Inner wrapper to apply scrollbar hiding for vertical content */}
                    <div className="h-full overflow-y-auto no-scrollbar pr-2"> {/* Add padding-right to account for hidden scrollbar area */}
                        <LeftSide
                            meta={showMeta}
                            changeMeta={setShowMeta}
                            length={questions.length}
                            question={questions[currentIndex]}
                        />
                    </div>
                </div>

                {/* Divider - This is the key part for dragging */}
                <div
                    className="relative w-2 bg-gray-200 cursor-ew-resize flex items-center justify-center flex-shrink-0"
                    onMouseDown={handleMouseDown} // Attach onMouseDown here to enable dragging
                >
                    {/* Visual line in the middle */}
                    <div className="absolute h-full w-0.5 bg-gray-400"></div>
                </div>


                {/* Right Side Panel */}
                <div
                    style={{
                        width: rightWidth,
                        minWidth: isLeftPanelCollapsed ? '100%' : '10%', 
                        transition: isResizing ? 'none' : 'width 0.3s ease'
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

            <br />
            <NavigationSection
                history={testHistory}
                handleHistoryQuestionIndex={handleHistoryQuestionIndex}
                questions={questions}
            />
            <br />
            <br />
            <br />
            <br />

            <Footer
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOption={selectedOption}
                handleCheck={handleCheck}
                handleNext={handleNext}
                handlePrev={handlePrev}
            />
        </>
    );
}
