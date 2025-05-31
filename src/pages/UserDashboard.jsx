import UserDashboardHome from "../components/dashboards/student/UserDashboardHome";
import Profile from "../components/dashboards/student/Profile";
import { useState } from "react";
import Sidebar from "../components/dashboards/common/Sidebar";
import UserDashboardHeader from "../components/dashboards/common/UserDashboardHeader";

export default function UserDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');

    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    }

    return (
        <>
            <UserDashboardHeader toggleSidebar={toggleSidebar} />
            <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col lg:flex-row">
                {/* Sidebar Component */}

                <Sidebar toggleSidebar={toggleSidebar} isOpenSideBar={isOpenSideBar} setActiveSection={setActiveSection} />

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    {activeSection === 'dashboard' ? (
                        <UserDashboardHome />
                    ) : (
                        <Profile />
                    )}
                </div>
            </div>
        </>
    );
}