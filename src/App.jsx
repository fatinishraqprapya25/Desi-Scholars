import { Route, Routes } from "react-router-dom";
import CourseListingPage from "./pages/Courses";
import Home from "./pages/Home";
import CourseDetailsPage from "./components/courses/CourseDetails";
import AuthPage from "./components/common/Auth";
import FreeResourcesPage from "./pages/Resources"
import FreePracticeTest from "./pages/FreePracticeTest";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AboutUs from "./pages/About";
import QuizPage from "./components/FreePracticeTest/Quiz";
import MockPage from "./pages/Mock";

function App() {
  return (
    <>
      <Routes>
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
      </Routes>
    </>
  )
}

export default App
