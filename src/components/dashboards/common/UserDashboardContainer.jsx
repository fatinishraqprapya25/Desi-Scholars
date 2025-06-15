import { useState } from "react";
import Sidebar from "./Sidebar";
import UserDashboardHeader from "./UserDashboardHeader";

export default function UserDashboardContainer({ role, children }) {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    }

    return (
        <>
            <UserDashboardHeader role={role} toggleSidebar={toggleSidebar} />
            <div className="font-sans antialiased flex flex-col lg:flex-row">
                {/* Sidebar is fixed, so no margin on lg */}
                <Sidebar role={role} toggleSidebar={toggleSidebar} isOpenSideBar={isOpenSideBar} />

                {/* Main content area with left margin on large screens */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-18 lg:ml-64">
                    {children}
                </main>
            </div>
        </>
    );
}