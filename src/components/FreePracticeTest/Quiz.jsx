import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";
import Footer from "./quiz/Footer";
import { useEffect, useState } from "react";

export default function Quiz() {
    const location = useLocation();
    const query = location.state;
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [markable, setMarkable] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/mcq?${new URLSearchParams(query)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch questions.");
                }
                const data = await response.json();
                setQuestions(data.data || []);
            } catch (err) {
                alert(err.message);
            }
        };

        fetchQuestions();
    }, [query]);

    const handleNext = () => {
        if (questions.length === currentIndex + 1) {
            alert("no more questions available");
        } else {
            setCurrentIndex(index => index + 1);
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

    return (
        <>
            <Header />
            <div className="grid grid-cols-2" onMouseUp={handleTextSelection}>
                <LeftSide length={questions.length} question={questions[currentIndex]} />
                <RightSide question={questions[currentIndex]} markable={markable} onChangeMarkable={setMarkable} />
                <Footer handleNext={handleNext} />
            </div>
        </>
    );
}
