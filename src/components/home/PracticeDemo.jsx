export default function PracticeTestPromo() {
    return (
        <section className="bg-indigo-600 py-16 mt-10">
            <div className="max-w-5xl mx-auto px-6 text-center text-white">
                <div className="bg-indigo-700/30 backdrop-blur-md rounded-2xl p-10 shadow-lg border border-indigo-500/30">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Test Your Knowledge?
                    </h2>
                    <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto text-indigo-100">
                        Take a free practice test and assess your skills in JavaScript, React, or any core topic. It’s fast, fun, and totally free!
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition duration-200"
                    >
                        Take a Free Test
                    </a>
                </div>
            </div>
        </section>
    );
}
