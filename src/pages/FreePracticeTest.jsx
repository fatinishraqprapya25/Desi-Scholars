import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, examsData } from "../components/FreePracticeTest/Constants";
import ExamSelectionView from "../components/FreePracticeTest/ExamSelectionView";
import ExamTakingView from "../components/FreePracticeTest/ExamTakingView";

export default function FreeTestPage() {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const selectedExam = examsData.find((exam) => exam.id === selectedExamId);

  useEffect(() => {
    if (selectedExamId !== null) {
      setIsLoading(true);
      setAnswers({});
      setSubmitted(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [selectedExamId]);

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const allAnswered = selectedExam.questions.every((_, index) => answers[index] !== undefined);
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return; // Prevent submission if not all questions are answered
    }
    setSubmitted(true);
  };


  const handleRetakeOrNewTest = () => {
    setSelectedExamId(null);
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    if (!selectedExam) return 0;
    let score = 0;
    selectedExam.questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  const score = submitted ? calculateScore() : 0;
  const totalQuestions = selectedExam ? selectedExam.questions.length : 0;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(to bottom right, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
      }}
    >

      <AnimatePresence mode="wait">
        {!selectedExamId ? (
          <ExamSelectionView
            onSelectExam={setSelectedExamId}
            email={email}
            setEmail={setEmail}
            handleNewsletterSubmit={handleNewsletterSubmit}
          />
        ) : (
          <ExamTakingView
            selectedExam={selectedExam}
            answers={answers}
            submitted={submitted}
            isLoading={isLoading}
            handleAnswer={handleAnswer}
            handleSubmit={handleSubmit}
            handleRetakeOrNewTest={handleRetakeOrNewTest}
            score={score}
            totalQuestions={totalQuestions}
            percentage={percentage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}