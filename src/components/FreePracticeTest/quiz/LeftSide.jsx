export default function LeftSide({ question, length, meta, changeMeta }) {
    return <div className="min-h-screen p-6">
        <div className="rounded-lg p-6">
            <p className="text-gray-700 text-xl">
                {question && question.explanation}
            </p>
        </div>
    </div>
}