import React, { useState, useCallback } from 'react';

export default function FilterBar({ callFilter }) {
    const [filters, setFilters] = useState({});

    // Reusable component to render filter groups
    const FilterGroup = ({ title, options, selected, onSelect }) => {
        return (
            <div className="mb-4">
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

    const handleFilterChange = useCallback((key, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (value === 'All') {
                delete updatedFilters[key];
            } else {
                updatedFilters[key] = value;
            }
            return updatedFilters;
        });
    }, []);

    // Reset all filters to their default state
    const handleResetAll = useCallback(() => {
        callFilter({});
    }, []);

    // Handle Apply button click (e.g., for fetching data)
    const handleApply = useCallback(() => {
        console.log('Filters applied:', filters);
        callFilter(filters); // Send filters to the parent component
    }, [filters, callFilter]);

    return (
        <div className="bg-white px-6 py-4 rounded-lg shadow-xl max-w-6xl mx-auto my-8 font-inter border border-gray-100">
            {/* Filters Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-0 pb-2">Refine Your Search</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-3">
                {/* Active Questions Filter */}
                <FilterGroup
                    title="Active Questions"
                    options={activeQuestionsOptions}
                    selected={filters.activeQuestions || 'All'}
                    onSelect={(value) => handleFilterChange('activeQuestions', value)}
                />

                {/* Version Filter */}
                <FilterGroup
                    title="Version"
                    options={versionOptions}
                    selected={filters.version || 'All'}
                    onSelect={(value) => handleFilterChange('version', value)}
                />

                {/* Difficulty Filter */}
                <FilterGroup
                    title="Difficulty"
                    options={difficultyOptions}
                    selected={filters.difficulty || 'All'}
                    onSelect={(value) => handleFilterChange('difficulty', value)}
                />

                {/* Score Band Filter */}
                <FilterGroup
                    title="Score Band"
                    options={scoreBandOptions}
                    selected={filters.scoreBand || 'All'}
                    onSelect={(value) => handleFilterChange('scoreBand', value)}
                />

                {/* Marked for Review Filter */}
                <FilterGroup
                    title="Marked for Review"
                    options={markedForReviewOptions}
                    selected={filters.markedForReview || 'All'}
                    onSelect={(value) => handleFilterChange('markedForReview', value)}
                />

                {/* Answered Incorrectly Filter */}
                <FilterGroup
                    title="Answered Incorrectly"
                    options={answeredIncorrectlyOptions}
                    selected={filters.answeredIncorrectly || 'All'}
                    onSelect={(value) => handleFilterChange('answeredIncorrectly', value)}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-2">
                <button
                    onClick={handleResetAll}
                    className="px-2 py-1 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 font-semibold"
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
