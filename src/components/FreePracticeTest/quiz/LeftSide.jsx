import { useNavigate } from "react-router-dom"

export default function LeftSide({ question, length, meta, changeMeta }) {
    return <div className="min-h-screen p-6">
        <div className="rounded-lg p-6">
            <p className="text-gray-700 text-lg">
                {question && question.explanation}
            </p>
        </div>
    </div>
}