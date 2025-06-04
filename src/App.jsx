// external imports
import { Route, Routes } from "react-router-dom";

// common imports
import CourseListingPage from "./pages/Courses";
import Home from "./pages/Home";
import CourseDetailsPage from "./components/courses/CourseDetails";
import AuthPage from "./components/common/Auth";
import FreeResourcesPage from "./pages/Resources"
import FreePracticeTest from "./pages/FreePracticeTest";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AboutUs from "./pages/About";
import MockPage from "./pages/Mock";

// student dashboard imports
import UserDashboard from "./pages/UserDashboard";
import UserDashboardProfile from "./components/dashboards/student/pages/UserDashboardProfile";
import UserEnrolledCourses from "./components/dashboards/student/pages/UserEnrolledCourses";
import UserLeaderBoard from "./components/dashboards/student/pages/LeaderBoard";
import PracticeTests from "./components/dashboards/student/pages/PracticeTests";
import MyProgress from "./components/dashboards/student/pages/MyProgress";
import ResourcesPage from "./components/dashboards/student/pages/Resources";

// admin dashboard imports
import AdminHome from "./components/dashboards/admin/pages/AdminHome";

function App() {
  return (
    <>
      <Routes>
        {/* general routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses" element={<CourseListingPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/resources" element={<FreeResourcesPage />} />
        <Route path="/practice-test" element={<>
          <Header />
          <FreePracticeTest />
          <Footer />
        </>} />
        <Route path="/mock" element={<MockPage />} />

        {/* student dashboard routes */}
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/profile" element={<UserDashboardProfile />} />
        <Route path="/dashboard/mycourses" element={<UserEnrolledCourses />} />
        <Route path="/dashboard/leaderboard" element={<UserLeaderBoard />} />
        <Route path="/dashboard/practicetest" element={<PracticeTests />} />
        <Route path="/dashboard/progress" element={<MyProgress />} />
        <Route path="/dashboard/resources" element={<ResourcesPage />} />

        {/* admin dashboard routes */}
        <Route path="/admin/dashboard" element={<AdminHome />} />

      </Routes>
    </>
  )
}

export default App
