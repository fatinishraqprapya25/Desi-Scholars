import { useLocation } from "react-router-dom"
import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";

export default function Quiz({ navigateData }) {
    const localtion = useLocation();
    const query = location.state;
    return (
        <>
            <Header />
            <div className="grid grid-cols-2">
                {/* left side quiz section */}
                <LeftSide />
            </div>
        </>
    )
}