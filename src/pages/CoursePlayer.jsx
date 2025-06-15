import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import Tabs from './Tabs';

const App = () => {
    const videos = [
        { id: '1', title: 'HTML Introduction', url: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
        { id: '2', title: 'HTML Elements', url: 'https://www.youtube.com/embed/qz0aGYrrlhU' },
        { id: '3', title: 'CSS Introduction', url: 'https://www.youtube.com/embed/yfoY53QXEnI' },
        { id: '4', title: 'Flexbox Guide', url: 'https://www.youtube.com/embed/JJSoEo8JSnc' },
        { id: '5', title: 'CSS Grid', url: 'https://www.youtube.com/embed/jV8B24rSN5o' },
        { id: '6', title: 'JavaScript Basics', url: 'https://www.youtube.com/embed/W6NZfCO5SIk' },
        { id: '7', title: 'DOM Manipulation', url: 'https://www.youtube.com/embed/0ik6X4DJKCc' },
        { id: '8', title: 'ES6 Features', url: 'https://www.youtube.com/embed/NCwa_xi0Uuc' },
        { id: '9', title: 'Async JS & Fetch', url: 'https://www.youtube.com/embed/PoRJizFvM7s' },
        { id: '10', title: 'React Basics', url: 'https://www.youtube.com/embed/bMknfKXIFA8' },
        { id: '11', title: 'React Hooks', url: 'https://www.youtube.com/embed/f687hBjwFcM' },
        { id: '12', title: 'Deploy React App', url: 'https://www.youtube.com/embed/DPnqb74Smug' },
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
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
    );
};

export default App;
