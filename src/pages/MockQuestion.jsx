import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizLeftSide from "../components/mock/quiz/QuizLeftSide";
import QuizRightSide from "../components/mock/quiz/QuizRightSide";
import QuizFooter from "../components/mock/quiz/QuizFooter";

export default function MockQuestion() {
    const { id } = useParams();
    const [mockQuestions, setMockQuestions] = useState(); // Initially undefined
    const [currentIndex, setCurrentIndex] = useState(0);

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
    useEffect(() => {
        if (mockQuestions) {
            console.log("Updated Mock Questions:", mockQuestions);
        }
    }, [mockQuestions]);

    return (
        <div>
            <QuizHeader moduleName="English 1" initialMinutes={2} initialSeconds={0} />
            <div className="grid grid-cols-2 ps-0 md:ps-15 mt-42 space-x-3">
                <QuizLeftSide />
                {/* Pass the current question to QuizRightSide */}
                {mockQuestions && (
                    <QuizRightSide question={mockQuestions[currentIndex]} currentIndex={currentIndex} />
                )}
            </div>
            <br />
            <br />
            <QuizFooter />
        </div>
    );
}
