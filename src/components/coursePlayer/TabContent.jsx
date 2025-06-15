const TabContent = ({ activeTab, videoTitle }) => {
    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-b-xl rounded-tr-xl text-gray-700 shadow-inner">
            {activeTab === 'Description' && (
                <p>
                    Detailed explanation about <strong>{videoTitle}</strong>. Watch carefully and follow along with hands-on exercises.
                </p>
            )}
            {activeTab === 'Reference' && (
                <ul className="list-disc pl-5">
                    <li>MDN Web Docs - Your go-to for web development references.</li>
                    <li>W3Schools - Comprehensive tutorials and examples.</li>
                    <li>JavaScript.info - In-depth JavaScript guide.</li>
                </ul>
            )}
            {activeTab === 'Links' && (
                <ul className="list-disc pl-5">
                    <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">MDN Web Docs</a></li>
                    <li><a href="https://w3schools.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">W3Schools</a></li>
                    <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">React Docs</a></li>
                </ul>
            )}
            {activeTab === 'Social' && (
                <div className="space-x-4">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-black">GitHub</a>
                    <p className="mt-2 text-sm text-gray-500">Connect with us on social media for updates!</p>
                </div>
            )}
            {activeTab === 'Comments' && (
                <p className="text-gray-600">
                    Comments functionality coming soon! This section can integrate a comment system (Disqus, Firebase, etc.).
                </p>
            )}
        </div>
    );
};

export default TabContent;
