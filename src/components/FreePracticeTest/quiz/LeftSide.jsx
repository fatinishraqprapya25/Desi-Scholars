export default function LeftSide() {
    return <div className="min-h-screen p-6">
        {/* Header Section */}
        <div className=" rounded-lg p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">SAT Suite Question Bank</h1>
            <div className="flex items-center mt-[-10px]">
                <button className="text-purple-700 font-medium hover:underline">
                    Back to Question Bank
                </button>
                <div className="flex gap-2 ms-5">
                    <button className="text-purple-700 font-medium hover:underline">Hide Metadata</button>
                    <button className="bg-purple-700 text-white px-1 text-sm rounded-lg hover:bg-purple-800">
                        Stats
                    </button>
                </div>
            </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white mt-3 rounded-lg p-4 mb-6">
            {/* Scrollable Container */}
            <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-custom">
                {/* Left Section */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Total Questions:</span>
                        <span>375</span>
                    </div>
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Set Section:</span>
                        <span>English</span>
                    </div>
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Set Difficulty:</span>
                        <span>All</span>
                    </div>
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Set Active:</span>
                        <span>All</span>
                    </div>
                    <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                        <span className="font-bold text-gray-800">Set Score Band:</span>
                        <span>All</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col text-gray-600 font-medium whitespace-nowrap">
                    <span className="font-bold text-gray-800">Set Domain:</span>
                    <span>Craft and St</span>
                </div>
            </div>
        </div>

        {/* Question Section */}
        <div className="rounded-lg p-6">
            <p className="text-gray-700">
                Following a Gullah technique that originated in West Africa, Dingle
                skillfully winds a thin palm frond around a bunch of sweetgrass with
                the help of a “sewing bone” to create the basket’s signature look that
                no factory can reproduce.
            </p>
        </div>
    </div>
}