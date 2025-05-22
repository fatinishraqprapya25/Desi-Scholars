const CourseCard = ({ title, instructor, rating, price, image }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 mb-1">By {instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>⭐ {rating}</span>
                    <span className="font-semibold text-indigo-600">{price}</span>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default CourseCard;