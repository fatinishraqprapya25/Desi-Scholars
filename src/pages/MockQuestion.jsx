import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizLeftSide from "../components/mock/quiz/QuizLeftSide";
import QuizRightSide from "../components/mock/quiz/QuizRightSide";
import QuizFooter from "../components/mock/quiz/QuizFooter";
import App from "../components/mock/Break";

export default function MockQuestion() {
    const { id } = useParams();
    const [mockQuestions, setMockQuestions] = useState();
    const [breakStatus, setBreakStatus] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMarking, setIsMarking] = useState(false);

    const fetchMockQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/mockquestions/${id}`);
            const result = await response.json();

            // Sort the questions in the desired order
            const sorted = result.data.sort((a, b) => {
                const order = ["English 1", "English 2", "Math 1", "Math 2"];
                return order.indexOf(a.moduleName) - order.indexOf(b.moduleName);
            });

            setMockQuestions(sorted);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchMockQuestions();
    }, []);

    const handleNext = () => {
        if (mockQuestions.length === currentIndex + 1) {
            alert("no more questions");
        } else {
            const englishModule = mockQuestions[currentIndex].moduleName;
            const mathModule = mockQuestions[currentIndex + 1].moduleName;
            if (englishModule === "English 2" && mathModule === "Math 1") {
                setBreakStatus(true);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    const highlightText = (event) => {
        if (isMarking) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.style.backgroundColor = 'yellow';
                range.surroundContents(span);
                selection.removeAllRanges();
            }
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            alert("no more previous questions");
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleResumeFromBreak = () => {
        setBreakStatus(false);
        setCurrentIndex(currentIndex + 1);
    };

    return (
        breakStatus ? (
            <App handleResumeFromBreak={handleResumeFromBreak} />
        ) : (
            <div>
                <QuizHeader moduleName="English 1" initialMinutes={2} initialSeconds={0} />
                <div onMouseUp={highlightText} className="grid grid-cols-2 ps-0 md:ps-15 mt-42 space-x-3">
                    {/* Adjust the grid column span for QuizLeftSide and QuizRightSide */}
                    <div className="col-span-1">
                        <QuizLeftSide />
                    </div>
                    <div className="">
                        {mockQuestions && (
                            <QuizRightSide setIsMarking={setIsMarking} isMarking={isMarking} currentIndex={currentIndex} question={mockQuestions[currentIndex]} />
                        )}
                    </div>
                </div>
                <br />
                <br />
                <QuizFooter handleNext={handleNext} handlePrev={handlePrev} currentIndex={currentIndex} length={mockQuestions ? mockQuestions.length : 0} />
            </div>
        )
    );
}
