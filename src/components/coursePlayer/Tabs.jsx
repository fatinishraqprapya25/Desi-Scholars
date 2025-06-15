import React, { useState } from 'react';
import TabContent from './TabContent';

const Tabs = ({ videos, currentVideoIndex }) => {
    const [activeTab, setActiveTab] = useState('Description');

    const tabs = ['Description', 'Reference', 'Links', 'Social', 'Comments'];

    return (
        <div className="mt-6">
            <div className="flex space-x-4 border-b">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 font-medium rounded-t-md transition-colors duration-200
              ${activeTab === tab
                                ? 'border-b-2 border-indigo-500 text-indigo-600 bg-gray-50'
                                : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-100'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <TabContent activeTab={activeTab} videoTitle={videos[currentVideoIndex].title} />
        </div>
    );
};

export default Tabs;
