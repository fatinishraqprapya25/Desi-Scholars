import UserDashboardHome from "./pages/UserDashboardHome";
import Profile from "../../dashboards/student/Profile";
import { useState } from "react";
import Sidebar from "../../dashboards/common/Sidebar";
import UserDashboardHeader from "../../dashboards/common/UserDashboardHeader";

export default function UserDashboardContainer({ children }) {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    }

    return (
        <>
            <UserDashboardHeader toggleSidebar={toggleSidebar} />
            <div className="min-h-screen font-sans antialiased flex flex-col lg:flex-row lg:ml-64 m">
                {/* Sidebar Component */}

                <Sidebar toggleSidebar={toggleSidebar} isOpenSideBar={isOpenSideBar} />

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </>
    );
}