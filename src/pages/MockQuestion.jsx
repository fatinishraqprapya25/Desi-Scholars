import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader";
import QuizLeftSide from "../components/mock/quiz/QuizLeftSide";

export default function MockQuestion() {
    const { id } = useParams();
    const [mockQuestions, setMockQuestions] = useState();
    const fetchMockQuestions = async () => {

    }
    useEffect(() => {
        fetchMockQuestions();
    }, []);

    return (
        <div>
            <QuizHeader moduleName="English 1" initialMinutes={2} initialSeconds={0} />
            <div className="grid grid-cols-2 ps-0 md:ps-15 mt-0 md:mt-15">
                <QuizLeftSide />
            </div>
        </div>
    )
}