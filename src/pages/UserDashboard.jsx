import UserDashboardHome from "../components/dashboards/student/pages/UserDashboardHome";
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
            <UserDashboardHome />
        </>
    );
}