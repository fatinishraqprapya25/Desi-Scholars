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
import VideoPlayer from "./pages/CoursePlayer";

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
import StudentsPage from "./components/dashboards/admin/pages/Students";
import TeachersPage from "./components/dashboards/admin/pages/Teachers";
import CoursesPage from "./components/dashboards/admin/pages/Courses";
import PracticeTest from "./components/dashboards/admin/pages/PracticeTests";
import ManageResourcesPage from "./components/dashboards/admin/pages/Resources";
import ManageBroadcastsPage from "./components/dashboards/admin/pages/Notifications";
import MockQuestion from "./pages/MockQuestion";
import CourseEditor from "./components/dashboards/admin/pages/CourseEditor";
import MessagePage from "./components/dashboards/student/pages/Message";
import CreateCoursePage from "./components/dashboards/admin/course/CreateCourse";
import CreatePracticeTestPage from "./components/dashboards/admin/practicetests/create/CreatePracticeTestPage";
import EditPracticeTestPage from "./components/dashboards/admin/practicetests/edit/EditPracticePage";
import CreateResourcePage from "./components/dashboards/admin/resources/create/CreateResourcePage";
import EditResourcePage from "./components/dashboards/admin/resources/create/EditResource";
import CreateBroadcastPage from "./components/dashboards/admin/notifications/CreateBroadcast";
import EditBroadcastPage from "./components/dashboards/admin/notifications/EditBroadcast";
import SystemPage from "./components/dashboards/admin/pages/SystemSettings";
import TeacherHome from "./components/dashboards/teacher/pages/TeacherDashboardHome";
import MyCourses from "./components/dashboards/teacher/pages/MyCourses";
import EditCourse from "./components/dashboards/teacher/courses/EditCourse";
import CreateCourse from "./components/dashboards/teacher/courses/CreateCourse";
import MyStudents from "./components/dashboards/teacher/pages/MyStudents";
import GradeAssignmentsPage from "./components/dashboards/teacher/pages/GradeAssignments";
import MyMessages from "./components/dashboards/teacher/pages/MyMessages";
import MyProfile from "./components/dashboards/teacher/pages/Profile";
import CheckoutPage from "./pages/CheckOut";
import PaymentApprovalPage from "./components/dashboards/admin/pages/Payments";
import NotFound from "./pages/NotFound";
import Admins from "./components/dashboards/admin/pages/Admin";
import CreateAdminPage from "./components/dashboards/admin/admins/CreateAdmin";
import Login from "./components/dashboards/admin/pages/Login";
import ProtectedAdmin from "./components/dashboards/admin/pages/ProtectedAdmin";
import CombinedCalculator from "./pages/CombinedCalculator";
function App() {
  return (
    <>
      <Routes>
        {/* general routes */}
        <Route path="/calculator" element={<CombinedCalculator />} />
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
        <Route path="/mock/:id" element={<MockQuestion />} />
        <Route path="/video/c" element={<VideoPlayer />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* student dashboard routes */}
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/profile" element={<UserDashboardProfile />} />
        <Route path="/dashboard/mycourses" element={<UserEnrolledCourses />} />
        <Route path="/dashboard/leaderboard" element={<UserLeaderBoard />} />
        <Route path="/dashboard/practicetest" element={<PracticeTests />} />
        <Route path="/dashboard/progress" element={<MyProgress />} />
        <Route path="/dashboard/resources" element={<ResourcesPage />} />
        <Route path="/dashboard/messages" element={<MessagePage />} />

        {/* admin dashboard routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <AdminHome />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedAdmin>
              <StudentsPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedAdmin>
              <TeachersPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedAdmin>
              <CoursesPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/courses/edit/:id"
          element={
            <ProtectedAdmin>
              <CourseEditor />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/courses/create"
          element={
            <ProtectedAdmin>
              <CreateCoursePage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/practicetests"
          element={
            <ProtectedAdmin>
              <PracticeTest />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/practicetests/create"
          element={
            <ProtectedAdmin>
              <CreatePracticeTestPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/practicetests/edit/:testId"
          element={
            <ProtectedAdmin>
              <EditPracticeTestPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/resources"
          element={
            <ProtectedAdmin>
              <ManageResourcesPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/resources/create"
          element={
            <ProtectedAdmin>
              <CreateResourcePage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/resources/edit/:id"
          element={
            <ProtectedAdmin>
              <EditResourcePage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedAdmin>
              <PaymentApprovalPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedAdmin>
              <ManageBroadcastsPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/notifications/create"
          element={
            <ProtectedAdmin>
              <CreateBroadcastPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/notifications/edit/:id"
          element={
            <ProtectedAdmin>
              <EditBroadcastPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdmin>
              <SystemPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <ProtectedAdmin>
              <Admins />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/admins/create-admin"
          element={
            <ProtectedAdmin>
              <CreateAdminPage />
            </ProtectedAdmin>
          }
        />


        {/* teachers dashboard routess */}
        <Route path="/teacher/dashboard" element={<TeacherHome />} />
        <Route path="/teacher/courses" element={<MyCourses />} />
        <Route path="/teacher/courses/edit" element={<EditCourse />} />
        <Route path="/teacher/courses/create" element={<CreateCourse />} />
        <Route path="/teacher/students" element={<MyStudents />} />
        <Route path="/teacher/assignments/grade" element={<GradeAssignmentsPage />} />
        <Route path="/teacher/messages" element={<MyMessages />} />
        <Route path="/teacher/profile" element={<MyProfile />} />


        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
