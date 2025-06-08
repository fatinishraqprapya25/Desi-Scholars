import { Activity } from 'lucide-react';
import RecentActivityItem from './RecentActivityItem';

function RecentActivitiesSection() {
    const activities = [
        { id: 1, text: 'New user registered: ', highlight: 'Alice Johnson', time: '2 hours ago' },
        { id: 2, text: 'Course updated: ', highlight: 'React.js Advanced', time: 'Yesterday' },
        { id: 3, text: 'New order placed: ', highlight: '#ORD-2025001', time: '3 days ago' },
    ];

    return (
        <section className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="mr-2 h-6 w-6 text-indigo-500" /> Recent Activities
            </h3>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <ul className="divide-y divide-gray-200">
                    {activities.map(activity => (
                        <RecentActivityItem
                            key={activity.id}
                            activityText={<span>{activity.text}<span className="font-semibold">{activity.highlight}</span></span>}
                            timeAgo={activity.time}
                        />
                    ))}
                </ul>
                <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors">
                    View All Activities
                </button>
            </div>
        </section>
    );
}

export default RecentActivitiesSection;