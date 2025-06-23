import { useState } from "react";
import Container from "../components/common/Container";
import Header from "../components/common/Header";
import CourseGrid from "../components/courses/CourseGrid";
import FilterSidebar from "../components/courses/FilterSideBar";

const CourseListingPage = () => {
    const [searchQuery, setSearchQuery] = useState({});

    const applyFilter = (query) => {
        setSearchQuery(query);
    }
    return (
        <>
            <Header />
            <Container>
                <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
                    <div className="w-full md:w-1/5 p-4">
                        <FilterSidebar applyFilter={applyFilter} />
                    </div>
                    <div className="w-full md:w-4/5 p-4">
                        {/* <SearchBar /> */}
                        <CourseGrid searchQuery={searchQuery} />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CourseListingPage;