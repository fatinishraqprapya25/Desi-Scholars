import React from "react";
import ExamCard from "./ExamCard";
import { examsData } from "./Constants";

const ExamListSection = ({ onSelectExam }) => (
    <section id="exams-list-section" className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Available Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {examsData.map((exam, idx) => (
                <ExamCard
                    key={exam.id}
                    exam={exam}
                    onClick={onSelectExam}
                    index={idx}
                />
            ))}
        </div>
    </section>
);

export default ExamListSection;