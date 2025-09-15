import React, { useState, useRef } from 'react';

interface ProposalScreenProps {
  name: string;
  onYes: () => void;
  onNo: () => void;
  playSound: (sound: 'swoosh' | 'fail') => void;
}

const messages = [
    "Nope.",
    "Are you sure?",
    "Really?",
    "Think again!",
    "My heart...",
    "This is the wrong button!",
    "You're breaking my code!",
    "Okay, last chance!",
    "Pretty please?",
    "I'm just gonna...",
    "Don't do it!",
    "C'mon, be nice!",
    "Is that your final answer?",
    "You're persistent!",
    "Almost... not!"
];

const ProposalScreen: React.FC<ProposalScreenProps> = ({ name, onYes, onNo, playSound }) => {
    const [noClickCount, setNoClickCount] = useState(0);
    const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const noButtonRef = useRef<HTMLButtonElement>(null);

    const handleNoInteraction = () => {
        if (!containerRef.current || !noButtonRef.current) return;

        const newCount = noClickCount + 1;
        
        // After 10 tries, the button gives up and disappears.
        if (newCount > 10) {
            playSound('fail'); 
            setIsNoButtonVisible(false);
            return;
        }
        
        playSound('swoosh');
        setNoClickCount(newCount);

        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = noButtonRef.current.getBoundingClientRect();
        
        const newTop = Math.random() * (containerRect.height - buttonRect.height);
        const newLeft = Math.random() * (containerRect.width - buttonRect.width);

        noButtonRef.current.style.position = 'absolute';
        noButtonRef.current.style.top = `${newTop}px`;
        noButtonRef.current.style.left = `${newLeft}px`;
    };

    const yesButtonSize = 1 + noClickCount * 0.5;
    const yesButtonPaddingY = 1 + noClickCount * 0.2;
    const yesButtonPaddingX = 2 + noClickCount * 0.4;

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-center items-center p-4 text-center text-stone-800 relative overflow-hidden">
      <div className="z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto mb-6 text-rose-500 drop-shadow-lg">
          <path d="m11.645 20.91-1.106-1.106-1.106 1.106a1.25 1.25 0 0 0 1.768 0l.534-.533.534.533a1.25 1.25 0 0 0 1.768 0l-1.106-1.106-1.106 1.106Z" />
          <path fillRule="evenodd" d="M12 21.875c-6.833 0-11.419-5.232-12-10.456C.571 5.232 5.167 0 12 0c6.833 0 11.42 5.232 12 11.42 0 1.44-.234 2.822-.66 4.108a.75.75 0 0 1-1.432-.458A11.25 11.25 0 0 0 12 2.25C6.075 2.25 2.25 6.075 2.25 12S6.075 21.75 12 21.75c1.44 0 2.822-.234 4.108-.66a.75.75 0 0 1 .458 1.432C15.26 21.43 13.68 21.875 12 21.875Z" clipRule="evenodd" />
        </svg>

        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8 drop-shadow-lg">
          {name}, will you go out with me?
        </h1>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={onYes}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg transition-all duration-300 ease-in-out shadow-xl"
            style={{ 
                fontSize: `${Math.min(10, yesButtonSize)}rem`, 
                padding: `${yesButtonPaddingY}rem ${yesButtonPaddingX}rem` 
            }}
          >
            Yes
          </button>
        </div>
      </div>
      <button
        ref={noButtonRef}
        onMouseEnter={handleNoInteraction}
        onClick={handleNoInteraction}
        className={`bg-stone-500 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 z-20 shadow-lg ${!isNoButtonVisible ? 'opacity-0 pointer-events-none' : ''}`}
        style={{ position: 'absolute', top: '65%', left: 'calc(50% + 100px)'}}
      >
        {messages[noClickCount % messages.length]}
      </button>
    </div>
  );
};

export default ProposalScreen;