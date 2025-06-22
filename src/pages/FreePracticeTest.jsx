import TestHeader from '../components/FreePracticeTest/TestHeader';
import FilterBar from "../components/FreePracticeTest/FilterBar";
import QuestionsSection from '../components/FreePracticeTest/QuestionsSection';

function PracticeTests() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800">
      <TestHeader />
      <FilterBar />
      <QuestionsSection />
    </div>
  );
}

export default PracticeTests;
