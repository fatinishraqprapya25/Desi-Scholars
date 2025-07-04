import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionsSection({ filters }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetch
            setError(null);   // Clear any previous errors
            try {
                // Log filters to debug if they are changing on remount
                console.log("Fetching data with filters:", filters);

                const response = await fetch("http://localhost:5000/api/mcq/questions/aggregated", {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(filters)
                });

                if (!response.ok) {
                    // Handle HTTP errors
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const result = await response.json();
                console.log("Fetched data result:", result); // Log the raw result

                if (result.data) {
                    setData(result.data);
                } else {
                    // If backend returns data: null, consider it no questions
                    setData({ bySubject: [], byChapter: [] }); // Set to empty arrays to prevent crashes
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load questions. Please try again. " + error.message); // Set error message
                setData(null); // Clear data on error
            } finally {
                setLoading(false); // Set loading to false after fetch completes (success or error)
            }
        };

        fetchData();
    }, [filters]); // Dependency array: re-run useEffect when 'filters' changes

    if (loading) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium text-gray-600">Loading questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
        );
    }

    // After loading and no error, check if data is available and has questions
    const hasQuestions = data && data.bySubject && data.bySubject.some(subject => subject.questions.length > 0);

    if (!data || !hasQuestions) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-medium text-gray-600">No questions available for the selected filters.</p>
            </div>
        );
    }

    const { bySubject, byChapter } = data;

    // Normalize and merge chapters (keep this logic as it seems intentional)
    const chapterNameMapping = {
        calulas: "calculas",
        calculas: "calculas",
        // Add more mappings here if needed
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

    const handleNavigate = (navigateData) => {
        navigate("/test", { state: navigateData });
    };

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
                            <button onClick={() => handleNavigate({ subject: subject._id })}>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {subject._id}
                                </h2>
                            </button>
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
                                            <button onClick={() => handleNavigate({ subject: subject._id, chapter: chapter._id })}>
                                                <h3 className="text-lg font-semibold text-gray-700">
                                                    {chapter._id}
                                                </h3>
                                            </button>
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
                                                    <button onClick={() => handleNavigate({ subject: subject._id, chapter: chapter._id, topic: question.topic })}>
                                                        <h4 className="text-gray-800 text-sm font-medium">
                                                            {question.topic}
                                                        </h4>
                                                    </button>
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