import { useParams } from "react-router-dom";
import QuizHeader from "../components/mock/quiz/QuizHeader"; // Assuming this is the correct path

export default function MockQuestion() {
    const { id } = useParams();

    // Correct way to format the title from the ID
    const formattedTitle = id
        .split("-")
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    const initialTime = 120;

    return (
        <>
            <QuizHeader initialTime={initialTime} quizTitle={formattedTitle} />

        </>
    );
}