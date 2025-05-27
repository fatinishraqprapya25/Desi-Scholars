import { Route, Routes } from "react-router-dom";
import CourseListingPage from "./pages/Courses";
import Home from "./pages/Home";
import CourseDetailsPage from "./components/courses/CourseDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseListingPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage/>}/>
      </Routes>
    </>
  )
}

export default App
