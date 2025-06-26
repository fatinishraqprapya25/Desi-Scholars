import { useLocation } from "react-router-dom"
import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";
import Footer from "./quiz/Footer";
import { useState } from "react";

export default function Quiz({ navigateData }) {
    const localtion = useLocation();
    const query = location.state;

    const [markable, setMarkable] = useState(false);

    const handleTextSelection = () => {
        if (!markable) return;

        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.className = "highlight"; // Add highlight class
            span.textContent = selectedText;

            // Replace the selected text with the highlighted span
            range.deleteContents();
            range.insertNode(span);

            // Clear the selection after marking
            selection.removeAllRanges();
        }
    };
    return (
        <>
            <Header />
            <div className="grid grid-cols-2" onMouseUp={handleTextSelection}>
                <LeftSide />
                <RightSide markable={markable} onChangeMarkable={setMarkable} />
                <Footer />
            </div>
        </>
    )
}