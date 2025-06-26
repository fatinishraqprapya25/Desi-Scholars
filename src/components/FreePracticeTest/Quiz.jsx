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
    const [showMeta, setShowMeta] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [ansCorrect, setIsCorrct] = useState(null);

    useEffect(() => {
        setIsCorrct(null);
    }, [selectedOption]);

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
            setIsCorrct(null);
            setCurrentIndex(index => index + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            alert("no prev questions");
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

    const handleCheck = () => {
        const writeAnswers = questions[currentIndex].correctAnswers;
        if (writeAnswers.includes(selectedOption)) {
            setIsCorrct(true);
        } else {
            setIsCorrct(false);
        }
    }

    return (
        <>
            <Header />
            <div className="grid grid-cols-2" onMouseUp={handleTextSelection}>
                <LeftSide meta={showMeta} changeMeta={setShowMeta} length={questions.length} question={questions[currentIndex]} />
                <RightSide ansCorrect={ansCorrect} sOption={selectedOption} changeOption={setSelectedOption} meta={showMeta} question={questions[currentIndex]} markable={markable} onChangeMarkable={setMarkable} />
                <Footer currentIndex={currentIndex} totalQuestions={questions.length} selectedOption={selectedOption} handleCheck={handleCheck} handleNext={handleNext} handlePrev={handlePrev} />
            </div>
        </>
    );
}
