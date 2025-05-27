import { Route, Routes } from "react-router-dom";
import CourseListingPage from "./pages/Courses";
import Home from "./pages/Home";
import CourseDetailsPage from "./components/courses/CourseDetails";
import AuthPage from "./components/common/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseListingPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage/>}/>
        <Route path="/login" element={<AuthPage/>}/>
        <Route path="/signup" element={<AuthPage/>}/>
      </Routes>
    </>
  )
}

export default App
