import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizLeftSide from "../components/mock/quiz/QuizLeftSide";
import QuizRightSide from "../components/mock/quiz/QuizRightSide";
import QuizFooter from "../components/mock/quiz/QuizFooter";

export default function MockQuestion() {
    const { id } = useParams();
    const [mockQuestions, setMockQuestions] = useState();
    const fetchMockQuestions = async () => {
        const response = await fetch("http://localhost:5000/api/mockquestions");
        const result = await response.json();

    }
    useEffect(() => {
        fetchMockQuestions();
    }, []);

    return (
        <div>
            <QuizHeader moduleName="English 1" initialMinutes={2} initialSeconds={0} />
            <div className="grid grid-cols-2 ps-0 md:ps-15 mt-42 space-x-3">
                <QuizLeftSide />
                <QuizRightSide />
            </div>
            <br />
            <br />
            <QuizFooter />
        </div>
    )
}