import { CheckCircle } from 'lucide-react';

export default function recentTestScores() {
    return (
        <>
            <section>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                    <CheckCircle className="mr-3 text-red-600" /> Recent Test Scores
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Test Name</th>
                                <th className="py-3 px-6 text-left">Score</th>
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {recentTestScores.map((score) => (
                                <tr key={score.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{score.testName}</td>
                                    <td className="py-3 px-6 text-left">
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${score.score >= 80 ? 'bg-green-200 text-green-800' : score.score >= 60 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                                            {score.score}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-left">{score.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </>
    )
}