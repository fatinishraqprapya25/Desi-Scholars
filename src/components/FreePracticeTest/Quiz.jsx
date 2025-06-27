import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";
import Footer from "./quiz/Footer";
import { useEffect, useState } from "react";
import NavigationSection from "./quiz/NavigationSection";
import validateToken from "../../utils/ValidateToken";

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

    useEffect(() => {
        setIsCorrct(null);
    }, [selectedOption]);

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

    const fetchTestHistory = async () => {
        const checkUser = await validateToken();
        if (checkUser) {
            const response = await fetch(`http://localhost:5000/api/test-history/${checkUser.id}`);
            const result = await response.json();
        }
    }

    useEffect(() => {
        fetchQuestions();
        fetchTestHistory();
    }, [query]);

    useEffect(() => {
        setSelectedOption(null);
    }, [currentIndex]);

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

    const saveHistory = async (question, isCorrect) => {
        const checkUser = await validateToken();
        if (checkUser && question) {
            const payload = {
                userId: checkUser.id,
                questionId: question._id,
                status: isCorrect ? "Correct" : "Incorrect"
            }

            const response = await fetch("http://localhost:5000/api/test-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            console.log(result);
        }
    }

    const handleCheck = () => {
        const question = questions[currentIndex];
        const writeAnswers = question.correctAnswers;
        const isCorrect = writeAnswers.includes(selectedOption);
        setIsCorrct(isCorrect);
        saveHistory(question, isCorrect);
    }

    const handleCross = () => {
        setCrossAble(!crossAble);
    }

    return (
        <>
            <Header />
            <div className="grid grid-cols-2" onMouseUp={handleTextSelection}>
                <LeftSide meta={showMeta} changeMeta={setShowMeta} length={questions.length} question={questions[currentIndex]} />
                <RightSide crossAble={crossAble} handleCross={handleCross} currentIndex={currentIndex} ansCorrect={ansCorrect} sOption={selectedOption} changeOption={setSelectedOption} meta={showMeta} question={questions[currentIndex]} markable={markable} onChangeMarkable={setMarkable} />

            </div>

            <br />
            <NavigationSection />
            <br />
            <br />
            <br />
            <br />

            <Footer currentIndex={currentIndex} totalQuestions={questions.length} selectedOption={selectedOption} handleCheck={handleCheck} handleNext={handleNext} handlePrev={handlePrev} />


        </>
    );
}
