import { useLocation } from "react-router-dom"
import Header from "../common/Header";
import LeftSide from "./quiz/LeftSide";
import RightSide from "./quiz/RightSide";

export default function Quiz({ navigateData }) {
    const localtion = useLocation();
    const query = location.state;
    return (
        <>
            <Header />
            <div className="grid grid-cols-2">
                <LeftSide />
                <RightSide />
            </div>
        </>
    )
}