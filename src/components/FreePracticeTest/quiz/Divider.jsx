// Divider.js
import React from 'react';

export default function Divider({ }) {
    return (
        <div className="relative w-2 bg-gray-200 cursor-ew-resize flex items-center justify-center">
            {/* This is the visual line */}
            <div className="absolute h-full w-0.5 bg-gray-400"></div>

            {/* Optional: Add collapse/expand arrows */}
            <div
                className="absolute bg-white border border-gray-400 rounded-full p-1 cursor-pointer"
                style={{ }}
            >

                {'<>'}
            </div>
        </div>
    );
}