export default function CalculatorWrapper({ source }) {
    return (
        <div className="w-full h-screen bg-gray-100" style={{ width: "400px" }}>
            <div className="w-full h-full mx-auto rounded-xl overflow-hidden border border-gray-300 shadow-lg">
                <iframe
                    src={source}
                    title="Calculator"
                    className="w-full h-full"
                    style={{ border: "none", height: "82%" }}
                />
            </div>
        </div>
    );
}
