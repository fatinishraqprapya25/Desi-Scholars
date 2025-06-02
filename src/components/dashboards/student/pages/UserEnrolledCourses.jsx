import UserDashboardContainer from "../UserDashboardContainer";
import EnrolledCourses from '../EnrolledCourses';
import PracticeTest from '../PracticeTest';
import FreeResources from '../FreeResource';
import RecentTestScores from "../RecentTestScores"

export default function UserEnrolledCourses() {
    return <>
        < UserDashboardContainer >
            <main className="bg-white p-6">
                {/* Enrolled Courses Section */}
                <EnrolledCourses />

                {/* Practice Tests & Resources Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <PracticeTest />

                    <FreeResources />
                </section>

                {/* Recent Test Scores Section */}
                <RecentTestScores />
            </main>
        </UserDashboardContainer >
    </>
}