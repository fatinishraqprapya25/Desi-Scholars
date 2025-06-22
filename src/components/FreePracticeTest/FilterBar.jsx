import React, { useState, useCallback, useEffect } from 'react';

// Main FilterBar component
export default function FilterBar() {
    // State for each filter category
    const [activeQuestions, setActiveQuestions] = useState('All');
    const [version, setVersion] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [scoreBand, setScoreBand] = useState('All');
    const [markedForReview, setMarkedForReview] = useState('All');
    const [answeredIncorrectly, setAnsweredIncorrectly] = useState('All');

    // Function to handle filter selection
    // This is a reusable component to render filter groups
    const FilterGroup = ({ title, options, selected, onSelect, colorMap = {} }) => {
        return (
            // Changed mb-6 to mb-4 to decrease vertical distance
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => {
                        const isSelected = selected === option.value;
                        // Determine button styling based on selection and colorMap
                        let buttonClasses = `px-4 py-2 rounded-md transition-all duration-200 ease-in-out border border-gray-300`;

                        if (isSelected) {
                            buttonClasses += ` bg-blue-600 text-white shadow-md`;
                            if (colorMap[option.value]) {
                                buttonClasses = `px-4 py-2 rounded-md shadow-md text-white ${colorMap[option.value]} transition-all duration-200 ease-in-out`;
                            }
                        } else {
                            buttonClasses += ` bg-gray-100 text-gray-700 hover:bg-gray-200`;
                        }

                        // Apply specific colors for Difficulty and Score Band when not selected too
                        if (!isSelected && colorMap[option.value]) {
                            buttonClasses = `px-4 py-2 rounded-md transition-all duration-200 ease-in-out ${colorMap[option.value].replace('bg-', 'bg-').replace('text-white', 'text-gray-800')} border border-gray-300`;
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

    // Define options for each filter category
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
        { label: 'Medium', value: 'Medium' },
        { label: 'Hard', value: 'Hard' },
    ];

    // Define color mapping for Difficulty and Score Band based on the screenshot
    const difficultyColorMap = {
        'Easy': 'bg-green-500',
        'Medium': 'bg-yellow-500',
        'Hard': 'bg-red-500',
    };

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

    const scoreBandColorMap = {
        '1': 'bg-gray-700', // Dark for 1
        '2': 'bg-green-500', // Green for 2, 3
        '3': 'bg-green-500',
        '4': 'bg-yellow-500', // Yellow for 4, 5
        '5': 'bg-yellow-500',
        '6': 'bg-red-500', // Red for 6, 7
        '7': 'bg-red-500',
    };


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
        // In a real application, you would typically pass these filters to a parent component
        // or a data fetching function.
        alert(`Applying filters: ${JSON.stringify(filters, null, 2)}`); // Using alert for demo, replace with custom modal
    }, [activeQuestions, version, difficulty, scoreBand, markedForReview, answeredIncorrectly]);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto my-8 font-inter">
            {/* Filters Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Filters</h2>

            {/* Changed gap-y-6 to gap-y-4 to decrease vertical distance between grid rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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
                    colorMap={difficultyColorMap}
                />

                {/* Score Band Filter */}
                <FilterGroup
                    title="Score Band"
                    options={scoreBandOptions}
                    selected={scoreBand}
                    onSelect={setScoreBand}
                    colorMap={scoreBandColorMap}
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
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={handleResetAll}
                    className="px-6 py-3 rounded-md text-red-600 border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                    Reset All
                </button>
                <button
                    onClick={handleApply}
                    className="px-6 py-3 rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}

// App component to render the FilterBar and load Tailwind CSS
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
            background-color: #f0f2f5; /* Light background for the page */
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
