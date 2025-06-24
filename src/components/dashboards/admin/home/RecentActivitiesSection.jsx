import { Activity } from 'lucide-react';
import RecentActivityItem from './RecentActivityItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecentActivitiesSection() {
    const [lastUserRegistered, setLastUserRegistered] = useState({ name: "", time: "" });
    const [lastCourseCreated, setLastCourseCreated] = useState({ name: "", time: "" });
    const [lastOrderCreated, setLastOrderCreated] = useState({
        name: "",
        time: ""
    });

    const activities = [
        { id: 1, text: 'New user registered: ', highlight: lastUserRegistered.name, time: lastUserRegistered.time },
        { id: 2, text: 'Course created: ', highlight: lastCourseCreated.name, time: lastCourseCreated.time },
        { id: 3, text: 'New order placed: ', highlight: lastOrderCreated.name, time: lastOrderCreated.time },
    ];

    const adminToken = localStorage.getItem("ASDFDKFFJF");

    useEffect(() => {
        const fetchRecentActivities = async () => {
            const response = await fetch("http://localhost:5000/api/admin/activities", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });
            const result = await response.json();

            setLastUserRegistered({ name: result.data.lastAccountCreated.name, time: result.data.lastAccountCreated.createdAt });

            setLastCourseCreated({ name: result.data.lastCourseCreated.courseName, time: result.data.lastCourseCreated.createdAt });

            setLastOrderCreated({ name: result.data.lastPaymentMade._id, time: result.data.lastPaymentMade.createdAt })

        }
        fetchRecentActivities();

    }, []);

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
                <Link to="/admin/payments">
                    <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors">
                        Browse All Orders
                    </button>
                </Link>
            </div>
        </section>
    );
}

export default RecentActivitiesSection;