import React, { useState, useCallback } from 'react';

// Main FilterBar component
export default function FilterBar() {
    // State for each filter category
    const [activeQuestions, setActiveQuestions] = useState('All');
    const [version, setVersion] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [scoreBand, setScoreBand] = useState('All');
    const [markedForReview, setMarkedForReview] = useState('All');
    const [answeredIncorrectly, setAnsweredIncorrectly] = useState('All');

    // Reusable component to render filter groups
    const FilterGroup = ({ title, options, selected, onSelect }) => {
        return (
            <div className="mb-">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
                <div className="flex flex-wrap gap-1">
                    {options.map((option) => {
                        const isSelected = selected === option.value;
                        let buttonClasses = `px-3 py-1 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium border`;

                        if (isSelected) {
                            buttonClasses += ` bg-blue-600 text-white border-blue-600 shadow-md`;
                        } else {
                            buttonClasses += ` bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200`;
                        }

                        return (
                            <button
                                key={option.value}
                                onClick={() => onSelect(option.value)}
                                className={buttonClasses}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Define options for each filter category (unchanged)
    const activeQuestionsOptions = [
        { label: 'All', value: 'All' },
        { label: 'Bluebook Only', value: 'Bluebook Only' },
        { label: 'Exclude Bluebook', value: 'Exclude Bluebook' },
    ];

    const versionOptions = [
        { label: 'All', value: 'All' },
        { label: '2023', value: '2023' },
        { label: '2024 October', value: '2024 October' },
        { label: '2025 March', value: '2025 March' },
    ];

    const difficultyOptions = [
        { label: 'All', value: 'All' },
        { label: 'Easy', value: 'Easy' },
        { label: 'Medium', 'value': 'Medium' },
        { label: 'Hard', value: 'Hard' },
    ];

    const scoreBandOptions = [
        { label: 'All', value: 'All' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
    ];

    const markedForReviewOptions = [
        { label: 'All', value: 'All' },
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    const answeredIncorrectlyOptions = [
        { label: 'All', value: 'All' },
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    // Reset all filters to their default 'All' state
    const handleResetAll = useCallback(() => {
        setActiveQuestions('All');
        setVersion('All');
        setDifficulty('All');
        setScoreBand('All');
        setMarkedForReview('All');
        setAnsweredIncorrectly('All');
        console.log('All filters reset.');
    }, []);

    // Handle Apply button click (e.g., for fetching data)
    const handleApply = useCallback(() => {
        const filters = {
            activeQuestions,
            version,
            difficulty,
            scoreBand,
            markedForReview,
            answeredIncorrectly,
        };
        console.log('Applying filters:', filters);
        alert(`Applying filters: ${JSON.stringify(filters, null, 2)}`);
    }, [activeQuestions, version, difficulty, scoreBand, markedForReview, answeredIncorrectly]);


    return (
        <div className="bg-white px-6 py-4 rounded-lg shadow-xl max-w-6xl mx-auto my-8 font-inter border border-gray-100">
            {/* Filters Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-0 pb-2">Refine Your Search</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-3">
                {/* Active Questions Filter */}
                <FilterGroup
                    title="Active Questions"
                    options={activeQuestionsOptions}
                    selected={activeQuestions}
                    onSelect={setActiveQuestions}
                />

                {/* Version Filter */}
                <FilterGroup
                    title="Version"
                    options={versionOptions}
                    selected={version}
                    onSelect={setVersion}
                />

                {/* Difficulty Filter */}
                <FilterGroup
                    title="Difficulty"
                    options={difficultyOptions}
                    selected={difficulty}
                    onSelect={setDifficulty}
                />

                {/* Score Band Filter */}
                <FilterGroup
                    title="Score Band"
                    options={scoreBandOptions}
                    selected={scoreBand}
                    onSelect={setScoreBand}
                />

                {/* Marked for Review Filter */}
                <FilterGroup
                    title="Marked for Review"
                    options={markedForReviewOptions}
                    selected={markedForReview}
                    onSelect={setMarkedForReview}
                />

                {/* Answered Incorrectly Filter */}
                <FilterGroup
                    title="Answered Incorrectly"
                    options={answeredIncorrectlyOptions}
                    selected={answeredIncorrectly}
                    onSelect={setAnsweredIncorrectly}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-2">
                <button
                    onClick={handleResetAll}
                    className="px-2 py- rounded-lg text-red-600 border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 font-semibold"
                >
                    Reset All
                </button>
                <button
                    onClick={handleApply}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 font-semibold"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}

// App component to render the FilterBar and load Tailwind CSS (unchanged)
export function App() {
    return (
        <>
            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Inter font for overall aesthetics */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <style>
                {`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Softer, lighter background for the page */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
        `}
            </style>
            <div className="container mx-auto p-4">
                <FilterBar />
            </div>
        </>
    );
}