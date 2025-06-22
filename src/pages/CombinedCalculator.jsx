import Desmos3DCalculator from "../components/calculator/3dGraphingCalculator";
import ThreeDCalculatorEmbed from "../components/calculator/3dGraphingCalculator";
import FourFunctionCalculator from "../components/calculator/FourFunctionCalculator";
import GeometryCalculator from "../components/calculator/GeometryCalculator";
import GraphingCalculator from "../components/calculator/GraphingCalculator";
import MatrixCalculator from "../components/calculator/MatrixCalculator";
import ScientificCalculator from "../components/calculator/ScientificCalculator";

const App = () => {
    return (
        <div className="app-container">
            <h1>Desmos-Based Calculators</h1>

            <div className="calculator-grid">
                {/* <FourFunctionCalculator /> */}
                {/* <ScientificCalculator /> */}
                {/* <GraphingCalculator /> */}
                {/* <MatrixCalculator /> */}
                {/* <GeometryCalculator /> */}
                <Desmos3DCalculator />
            </div>
        </div>
    );
};

export default App;
