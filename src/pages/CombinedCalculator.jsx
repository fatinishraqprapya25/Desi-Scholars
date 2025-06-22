import { useState } from "react";
import Desmos3DCalculator from "../components/calculator/3dGraphingCalculator";
import FourFunctionCalculator from "../components/calculator/FourFunctionCalculator";
import GeometryCalculator from "../components/calculator/GeometryCalculator";
import GraphingCalculator from "../components/calculator/GraphingCalculator";
import MatrixCalculator from "../components/calculator/MatrixCalculator";
import ScientificCalculator from "../components/calculator/ScientificCalculator";

// Import Lucide Icons
import {
    Calculator,
    Sigma,
    LineChart,
    Grid,
    Square,
    Box,
} from "lucide-react";

const calculators = {
    "Four Function": {
        component: FourFunctionCalculator,
        icon: Calculator,
    },
    Scientific: {
        component: ScientificCalculator,
        icon: Sigma, // Represents summation, often associated with scientific calculators
    },
    Graphing: {
        component: GraphingCalculator,
        icon: LineChart,
    },
    Matrix: {
        component: MatrixCalculator,
        icon: Grid,
    },
    Geometry: {
        component: GeometryCalculator,
        icon: Square,
    },
    "3D Graphing": {
        component: Desmos3DCalculator,
        icon: Box,
    },
};

const CombinedCalculator = () => {
    const [activeTab, setActiveTab] = useState("Four Function");
    const ActiveCalculatorComponent = calculators[activeTab].component;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Tab Buttons with Icons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {Object.entries(calculators).map(([name, { icon: Icon }]) => (
                    <button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        className={`flex items-center justify-center px-4 py-2 rounded-full font-medium border transition-colors
                            ${activeTab === name
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        title={name} // Add title for hover tooltip
                    >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{name} Calculator</span> {/* For accessibility */}
                    </button>
                ))}
            </div>

            {/* Active Calculator Component */}
            <div className="bg-white p-4 rounded-xl shadow-md">
                <ActiveCalculatorComponent />
            </div>
        </div>
    );
};

const DragableCalculator = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="fixed z-50"
            style={{
                top: position.y,
                left: position.x,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Top bar */}
            <div
                className="bg-gray-800 text-white p-2 text-sm cursor-move rounded-t-lg flex justify-between items-center"
                onMouseDown={handleMouseDown}
            >
                <span>Mobile Calculator</span>
                <button
                    className="bg-red-600 text-white rounded px-2"
                    onClick={() => document.getElementById("iframe-window").style.display = "none"}
                >
                    X
                </button>
            </div>

            {/* Iframe */}
            <div className="w-[700] h-[667px] overflow-hidden border border-gray-300 rounded-b-lg shadow-lg">
                <CombinedCalculator />
            </div>
        </div>
    );
};

export default DragableCalculator;