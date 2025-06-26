import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";

export default function MockQuestion() {
    const { id } = useParams();
    const [mockQuestions, setMockQuestions] = useState();
    useEffect(() => {

    }, []);

    return (
        <div>
            <QuizHeader moduleName="English 1" initialMinutes={2} initialSeconds={0} />
        </div>
    )
}