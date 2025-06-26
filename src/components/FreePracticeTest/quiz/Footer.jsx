import React from "react";

const Footer = ({ handleNext }) => {
    return (
        <div className="w-full fixed bottom-0 bg-gray-100 py-4 px-6 flex items-center justify-between border-t border-gray-300">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Previous
            </button>

            <div className="text-gray-700 font-medium">
                <span>1/57</span>
            </div>

            <div className="flex gap-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Check
                </button>
                <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Footer;