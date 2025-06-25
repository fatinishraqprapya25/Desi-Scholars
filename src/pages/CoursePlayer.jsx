import { useState, useEffect } from 'react';
import Sidebar from '../components/coursePlayer/Sidebar';
import VideoPlayer from '../components/coursePlayer/VideoPlayer';
import Tabs from '../components/coursePlayer/Tabs';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import { Menu, X } from 'lucide-react';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { id } = useParams();

    const fetchCourseModules = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/modules/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                setVideos(result.data);
            } else {
                alert('Failed to fetch course modules');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        if (id) {
            fetchCourseModules();
        }
    }, [id]);

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen" style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-full shadow-lg"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed z-40 inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:flex md:w-72`}
            >
                <Sidebar
                    videos={videos}
                    currentVideoIndex={currentVideoIndex}
                    setCurrentVideoIndex={(index) => {
                        setCurrentVideoIndex(index);
                        setSidebarOpen(false); // Close on mobile after selection
                    }}
                />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full p-4 md:p-8 mt-16 md:mt-0">
                <div className="bg-white rounded-xl shadow p-4 max-w-4xl mx-auto w-full">
                    <VideoPlayer
                        videos={videos}
                        currentVideoIndex={currentVideoIndex}
                        setCurrentVideoIndex={setCurrentVideoIndex}
                    />
                    <Tabs videos={videos} currentVideoIndex={currentVideoIndex} />
                </div>
            </main>
        </div>
    );
};

export default App;
