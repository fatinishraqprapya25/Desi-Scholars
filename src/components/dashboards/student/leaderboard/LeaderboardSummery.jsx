import {
    Users,
    Brain,
    Sparkles,
    Timer,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function StudentLeaderboardSummary() {
    const [leaderboardSummery, setLeaderboardSummery] = useState({});
    useEffect(() => {
        const fetchStudentSummery = async () => {
            const response = await fetch("http://localhost:5000/api/leaderboard-test/a/summery");
            const result = await response.json();
            setLeaderboardSummery(result.data);
        }
        fetchStudentSummery();
    }, []);

    const stats = [
        {
            label: "Total Students",
            value: leaderboardSummery ? leaderboardSummery.totalStudents : 0,
            icon: <Users className="h-5 w-5 text-purple-500" />,
        },
        {
            label: "Avg. Solved",
            value: leaderboardSummery ? leaderboardSummery.avgSolved : 0,
            icon: <Brain className="h-5 w-5 text-purple-500" />,
        },
        {
            label: "Avg. Success Rate",
            value: leaderboardSummery ? leaderboardSummery.avgSuccessRate : 0,
            icon: <Sparkles className="h-5 w-5 text-purple-500" />,
        },
        {
            label: "Avg. Time",
            value: leaderboardSummery ? leaderboardSummery.avgTime : 0,
            icon: <Timer className="h-5 w-5 text-purple-500" />,
        },
    ];

    return (
        <div className="max-w-5xl mx-auto bg-white mb-7 rounded-xl p-6 shadow-sm font-inter">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                    <Sparkles className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Student Leaderboard
                    </h2>
                    <p className="text-sm text-gray-500">
                        {leaderboardSummery ? leaderboardSummery.totalStudents : 0} students ranked by performance
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg p-4 shadow-sm text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {item.icon}
                            <span className="text-sm text-gray-500">{item.label}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
