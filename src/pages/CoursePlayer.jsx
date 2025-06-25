import { useState, useEffect } from 'react';
import Sidebar from '../components/coursePlayer/Sidebar';
import VideoPlayer from '../components/coursePlayer/VideoPlayer';
import Tabs from "../components/coursePlayer/Tabs";
import { useParams } from 'react-router-dom';
import Header from "../components/common/Header"

const App = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const { id } = useParams();

    const fetchCourseModules = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/modules/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json"
                }
            });
            const result = await response.json();
            if (result.success) {
                setVideos(result.data);
            } else {
                alert("failed to fetch course modules");
            }
        } catch (err) {
            console.log(err.message)
        }
    }

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

        <>
            <div className="flex bg-gray-50 min-h-screen" style={{ fontFamily: '"Inter", sans-serif' }}>
                <Sidebar videos={videos} currentVideoIndex={currentVideoIndex} setCurrentVideoIndex={setCurrentVideoIndex} />
                <main className="flex-1 ml-72 p-4 md:p-8">
                    <div className="bg-white rounded-xl shadow p-4 max-w-4xl mx-auto">
                        <VideoPlayer
                            videos={videos}
                            currentVideoIndex={currentVideoIndex}
                            setCurrentVideoIndex={setCurrentVideoIndex}
                        />
                        <Tabs
                            videos={videos}
                            currentVideoIndex={currentVideoIndex}
                        />
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;
