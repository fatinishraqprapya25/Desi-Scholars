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

// All available calculators with icons
const calculators = {
    "Four Function": {
        component: FourFunctionCalculator,
        icon: Calculator,
    },
    Scientific: {
        component: ScientificCalculator,
        icon: Sigma,
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

// Calculator Tab Interface
const CombinedCalculator = () => {
    const [activeTab, setActiveTab] = useState("Four Function");
    const ActiveCalculatorComponent = calculators[activeTab].component;

    return (
        <div className="bg-gray-100 p-2">
            {/* Calculator Tabs */}
            {/* <div className="flex flex-wrap justify-center gap-2 mb-6">
                {Object.entries(calculators).map(([name, { icon: Icon }]) => (
                    <button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        style={{ fontSize: "10px" }}
                        className={`flex items-center justify-center px-3  py-2 rounded-full font-medium border transition-colors
                            ${activeTab === name
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        title={name}
                    >
                        <Icon className="h-4 w-4 font-bold" />
                        <span className="sr-only">{name} Calculator</span>
                    </button>
                ))}
            </div> */}

            {/* Render Active Calculator */}
            <div className="bg-white shadow-md">
                {/* <ActiveCalculatorComponent /> */}
                <GraphingCalculator />
            </div>
        </div>
    );
};

// Dragable Floating Calculator Window
const DragableCalculator = () => {
    const [x, setX] = useState(40);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX - x);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setX(e.clientX - startX);
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (!isVisible) return null;

    return (
        <div
            className="fixed top-0 z-50"
            style={{ left: x }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Draggable Top Bar */}
            <div className="flex flex-col w-fit bg-white border border-gray-300 rounded-lg shadow-2xl">
                <div
                    className="bg-purple-700 text-white p-2 text-sm cursor-ew-resize rounded-t-lg flex justify-between items-center"
                    onMouseDown={handleMouseDown}
                >
                    <span className="font-medium">Desmos Calculator</span>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold rounded px-2"
                        onClick={() => setIsVisible(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* Calculator Body - Responsive */}
                <div className="max-h-screen">
                    <CombinedCalculator />
                </div>
            </div>
        </div>
    );
};

export default DragableCalculator;
