import UserDashboardHome from "../student/pages/UserDashboardHome";
import Profile from "../student/Profile";
import { useState } from "react";
import Sidebar from "./Sidebar";
import UserDashboardHeader from "./UserDashboardHeader";

export default function UserDashboardContainer({ admin, children }) {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    }

    return (
        <>
            <UserDashboardHeader toggleSidebar={toggleSidebar} />
            <div className="min-h-screen font-sans antialiased flex flex-col lg:flex-row lg:ml-64">
                {/* Sidebar Component */}

                <Sidebar admin={admin} toggleSidebar={toggleSidebar} isOpenSideBar={isOpenSideBar} />

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 mt-[50px]">
                    {children}
                </div>
            </div>
        </>
    );
}