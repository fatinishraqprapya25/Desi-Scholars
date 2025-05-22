import Header from "../components/common/Header";
import AboutDSATScholars from "../components/home/AbouDsatScholars";
import Hero from "../components/home/Hero";
import OurTeam from "../components/home/OurTeam";
import TopCoursesCarousel from "../components/home/TopCourses";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <AboutDSATScholars />
            <OurTeam />
            <TopCoursesCarousel />
        </>
    );
}