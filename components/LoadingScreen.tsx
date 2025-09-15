import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 1);
      }, 40); // Slower loading for dramatic effect
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(onFinished, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onFinished]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-stone-700">
      <div className="w-3/4 max-w-md text-center">
        <h1 className="text-2xl font-serif mb-4">Warming things up...</h1>
        <div className="w-full bg-rose-200 rounded-full h-4">
          <div
            className="bg-rose-400 h-4 rounded-full transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm font-mono">{progress}% Complete</p>
        <p className="mt-8 text-xs text-stone-400">Please wait. Good things are on their way.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;