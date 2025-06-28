import React, { useState, useCallback } from 'react';

export default function FilterBar({ callFilter }) {
    const [filters, setFilters] = useState({});

    const DropdownFilter = ({ title, options, selected, onSelect }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => setIsOpen(!isOpen);

        const handleOptionClick = (value) => {
            onSelect(value);
            setIsOpen(false);
        };

        const selectedOptionLabel = options.find(option => option.value === selected)?.label || 'All';

        return (
            <div className="mb-4 relative">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
                <button
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 text-left bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex justify-between items-center"
                >
                    <span className="text-gray-700 font-medium">{selectedOptionLabel}</span>
                    <svg
                        className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ease-in-out ${selected === option.value
                                    ? 'bg-blue-600 text-white font-semibold'
                                    : 'text-gray-800 hover:bg-gray-100'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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
            // IMPORTANT: Call callFilter here to update parent's state immediately
            callFilter(updatedFilters);
            return updatedFilters;
        });
    }, [callFilter]); // callFilter must be in dependency array

    const handleResetAll = useCallback(() => {
        setFilters({});
        callFilter({});
    }, [callFilter]);

    // Remove handleApply if using immediate application.
    // If you still want an "Apply" button, you'd keep handleApply and remove the callFilter from handleFilterChange.

    return (
        <div className="bg-white px-6 py-4 rounded-lg shadow-xl max-w-6xl mx-auto my-8 font-inter border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-0 pb-2">Refine Your Search</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
                <DropdownFilter
                    title="Active Questions"
                    options={activeQuestionsOptions}
                    selected={filters.activeQuestions || 'All'}
                    onSelect={(value) => handleFilterChange('activeQuestions', value)}
                />

                <DropdownFilter
                    title="Version"
                    options={versionOptions}
                    selected={filters.version || 'All'}
                    onSelect={(value) => handleFilterChange('version', value)}
                />

                <DropdownFilter
                    title="Difficulty"
                    options={difficultyOptions}
                    selected={filters.difficulty || 'All'}
                    onSelect={(value) => handleFilterChange('difficulty', value)}
                />

                <DropdownFilter
                    title="Score Band"
                    options={scoreBandOptions}
                    selected={filters.scoreBand || 'All'}
                    onSelect={(value) => handleFilterChange('scoreBand', value)}
                />

                <DropdownFilter
                    title="Marked for Review"
                    options={markedForReviewOptions}
                    selected={filters.markedForReview || 'All'}
                    onSelect={(value) => handleFilterChange('markedForReview', value)}
                />

                <DropdownFilter
                    title="Answered Incorrectly"
                    options={answeredIncorrectlyOptions}
                    selected={filters.answeredIncorrectly || 'All'}
                    onSelect={(value) => handleFilterChange('answeredIncorrectly', value)}
                />
            </div>

            <div className="flex justify-end gap-4 pt-2 mt-4 border-t border-gray-200">
                <button
                    onClick={handleResetAll}
                    className="px-4 py-2 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 font-semibold"
                >
                    Reset All
                </button>
                {/* If you implement immediate filter application, the "Apply Filters" button might be redundant */}
                {/* <button
                    onClick={handleApply}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 font-semibold"
                >
                    Apply Filters
                </button> */}
            </div>
        </div>
    );
}