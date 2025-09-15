import React, { useState, useEffect } from 'react';
import { IQuestion } from '../types';
import { generateSillyQuestions } from '../services/geminiService';

interface QuestionScreenProps {
  onFinished: () => void;
  playSound: (sound: 'click') => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ onFinished, playSound }) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await generateSillyQuestions();
        if (fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
        } else {
            throw new Error("No questions returned from API");
        }
      } catch (err) {
        console.error(err);
        setError('Could not load questions. Using fallbacks.');
        setQuestions([
            { question: "What is the meaning of life?", options: ["42", "Chocolate", "Who cares?"] },
            { question: "Choose your weapon:", options: ["Sarcasm", "Kindness", "A giant foam hand"] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = () => {
    playSound('click');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onFinished();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-stone-700">
        <p className="text-xl animate-pulse font-serif">Finding the perfect questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center text-stone-800">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <p className="text-lg mb-2 text-rose-600 font-serif">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-3xl font-bold mb-6 font-serif">{currentQuestion?.question}</h2>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={handleAnswer}
              className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
            >
              {option}
            </button>
          ))}
        </div>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default QuestionScreen;