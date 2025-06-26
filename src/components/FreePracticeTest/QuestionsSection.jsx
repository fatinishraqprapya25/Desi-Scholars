import React, { useEffect, useState } from "react";

export default function QuestionsSection({ filters }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/mcq/questions/aggregated");
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        );
    }

    const { bySubject, byChapter } = data;

    // Normalize and merge chapters
    const chapterNameMapping = {
        calulas: "calculas",
        calculas: "calculas",
    };

    const normalizedChapters = {};
    byChapter.forEach((chapter) => {
        const normalizedId = chapterNameMapping[chapter._id.trim().toLowerCase()] || chapter._id.trim().toLowerCase();

        if (!normalizedChapters[normalizedId]) {
            normalizedChapters[normalizedId] = {
                ...chapter,
                _id: chapterNameMapping[chapter._id.trim().toLowerCase()] || chapter._id.trim(),
                questions: [...chapter.questions],
            };
        } else {
            normalizedChapters[normalizedId].questions.push(...chapter.questions);
        }
    });

    const uniqueChapters = Object.values(normalizedChapters);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {bySubject.map((subject, subjectIndex) => (
                <div
                    key={subject._id}
                    className="bg-gray-100 rounded-lg shadow-lg p-6"
                >
                    {/* Subject Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-lg font-bold">
                                {subjectIndex + 1}.
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {subject._id}
                            </h2>
                        </div>
                        <span className="bg-purple-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                            {subject.count}
                        </span>
                    </div>

                    {/* Chapters of the Subject */}
                    <div className="ml-4">
                        {uniqueChapters
                            .filter((chapter) =>
                                subject.questions.some((q) => q.chapter.trim().toLowerCase() === chapter._id.trim().toLowerCase())
                            )
                            .map((chapter, chapterIndex) => (
                                <div
                                    key={chapter._id}
                                    className="bg-gray-50 rounded-lg shadow p-4 mb-4"
                                >
                                    {/* Chapter Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-md font-bold">
                                                {chapterIndex + 1}.
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-700">
                                                {chapter._id}
                                            </h3>
                                        </div>
                                        <span className="bg-pink-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                                            {chapter.count}
                                        </span>
                                    </div>

                                    {/* Topics of the Chapter */}
                                    <div className="ml-4">
                                        {chapter.questions.map((question, questionIndex) => (
                                            <div
                                                key={question._id}
                                                className="flex items-center justify-between bg-white rounded-lg shadow p-3 mb-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 text-sm font-bold">
                                                        {questionIndex + 1}.
                                                    </span>
                                                    <h4 className="text-gray-800 text-sm font-medium">
                                                        {question.topic}
                                                    </h4>
                                                </div>
                                                <span className="bg-teal-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                    {question.difficulty}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
