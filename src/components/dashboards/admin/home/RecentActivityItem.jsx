function RecentActivityItem({ activityText, timeAgo }) {
    return (
        <li className="py-3 flex items-center justify-between">
            <span className="text-gray-700">{activityText}</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
        </li>
    );
}

export default RecentActivityItem;