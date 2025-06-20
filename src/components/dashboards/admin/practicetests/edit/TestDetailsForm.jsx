const TestDetailsForm = ({ testDetails, handleChange, handleSave }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Test Information</h3>

            {/* Test Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={testDetails.title || ''}
                    onChange={handleChange}
                    placeholder="e.g., React Hooks Deep Dive"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={testDetails.description || ''}
                    onChange={handleChange}
                    placeholder="A brief overview of the test content..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                ></textarea>
            </div>

            {/* Duration */}
            <div>
                <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={testDetails.duration || ''}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900"
                    required
                />
            </div>

            {/* Save Button */}
            <div>
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md
                        hover:bg-indigo-700 focus:outline-none focus:ring-2
                        focus:ring-indigo-500 focus:ring-offset-2
                        active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default TestDetailsForm;
