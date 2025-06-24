import UserDashboardContainer from "../../common/UserDashboardContainer";
import EnrolledCourses from '../mycourses/EnrolledCourses';
import PracticeTest from '../mycourses/PracticeTest';
import FreeResources from '../mycourses/FreeResource';

export default function UserEnrolledCourses() {
    return <>
        < UserDashboardContainer >
            <main className="bg-white p-6">
                {/* Enrolled Courses Section */}
                <EnrolledCourses />

                {/* Practice Tests & Resources Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <PracticeTest />

                    <FreeResources />
                </section>
            </main>
        </UserDashboardContainer >
    </>
}