import React, { useState, useEffect } from 'react';
import { HeartIcon, FingerprintIcon } from './Icons';

interface ProposalViewProps {
  question: string;
  recipient: string;
  sender: string;
  onAccept: () => void;
}

const noButtonResponses = [
  "No", "Really?", "Are you sure?", "Think again!", "Last chance?", "My heart...", "Please?", "Don't do this", "Maybe yes?", "Error: Try Yes", "So close!", "Haha, nope!", "You can't catch me!", "Try again!", "Just give up"
];

const HeartShower: React.FC<{ heartKey: number }> = ({ heartKey }) => {
    if (heartKey === 0) return null;
    return (
        <div key={heartKey} className="absolute inset-0 pointer-events-none z-30">
            {Array.from({ length: 20 }).map((_, i) => (
                <div 
                    key={i} 
                    className="heart-shower-piece"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationDuration: `${2 + Math.random()}s`,
                    }}
                >
                    <HeartIcon className="w-8 h-8 md:w-12 md:h-12" style={{ color: `rgba(255, 107, 107, ${Math.random() * 0.5 + 0.3})`}} />
                </div>
            ))}
        </div>
    );
};

const Modal: React.FC<{onClose: () => void}> = ({onClose}) => {
    const [confirmPos, setConfirmPos] = useState<React.CSSProperties>({ position: 'relative' });

    const handleConfirmHover = () => {
        setConfirmPos({
            position: 'absolute',
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 50}%`,
            transition: 'all 0.2s ease',
        })
    }

    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full modal-fade-in relative overflow-hidden" style={{ minHeight: '220px' }}>
            <h2 className="text-3xl font-display font-bold text-gray-800">Wait, really?</h2>
            <p className="mt-2 text-gray-600">Are you absolutely sure? This could be the start of something amazing!</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <button 
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-[#4DD0E1] text-white font-bold font-display rounded-full shadow-lg transform transition-transform hover:scale-105"
                >
                    You're right, I'll reconsider!
                </button>
                <div className="h-10 w-full flex items-center justify-center">
                    <button 
                        onMouseEnter={handleConfirmHover}
                        onClick={onClose}
                        style={confirmPos as React.CSSProperties}
                        className="text-sm text-gray-500 hover:underline px-3 py-1"
                    >
                        Confirm heartbreak
                    </button>
                </div>
            </div>
        </div>
    </div>
)};

type IntroStage = 'verify' | 'syncing' | 'decrypting' | 'countdown' | 'done';

const ProposalView: React.FC<ProposalViewProps> = ({ question, recipient, sender, onAccept }) => {
  const [noButtonIndex, setNoButtonIndex] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noPosition, setNoPosition] = useState<React.CSSProperties>({ position: 'relative' });
  const [hoverCount, setHoverCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pageTilt, setPageTilt] = useState('');
  const [heartKey, setHeartKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // New Intro State
  const [introStage, setIntroStage] = useState<IntroStage>('verify');
  const [countdown, setCountdown] = useState(3);
  
  // Effect for managing intro transitions
  useEffect(() => {
    if (introStage === 'syncing') {
        const timer = setTimeout(() => setIntroStage('decrypting'), 4000);
        return () => clearTimeout(timer);
    }
    if (introStage === 'decrypting') {
        const timer = setTimeout(() => setIntroStage('countdown'), 2000);
        return () => clearTimeout(timer);
    }
    if (introStage === 'countdown' && countdown > 0) {
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }
    if (introStage === 'countdown' && countdown === 0) {
        const transitionTimer = setTimeout(() => setIntroStage('done'), 1000);
        return () => clearTimeout(transitionTimer);
    }
  }, [introStage, countdown]);


  const handleNoInteraction = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const tilt = (Math.random() - 0.5) * 15;
    setPageTilt(`rotate(${tilt}deg) scale(1.1)`);
    setTimeout(() => setPageTilt(''), 300);

    setHeartKey(prev => prev + 1);
    
    setHoverCount(prev => prev + 1);
    if(hoverCount > 3 && !isModalVisible) {
        setModalVisible(true);
        setHoverCount(0);
        return;
    }

    setYesButtonScale((prev) => prev + 0.2);
    setNoScale(prev => Math.max(0.1, prev - 0.1));
    setNoButtonIndex((prev) => (prev + 1) % noButtonResponses.length);

    const padding = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const buttonWidth = 120 * noScale; 
    const buttonHeight = 50 * noScale;

    const newTop = padding + Math.random() * (vh - buttonHeight - padding * 2);
    const newLeft = padding + Math.random() * (vw - buttonWidth - padding * 2);

    setNoPosition({
      position: 'absolute',
      top: `${newTop}px`,
      left: `${newLeft}px`,
      transition: 'top 0.4s ease, left 0.4s ease',
    });
  };

  const handleModalClose = () => {
      setModalVisible(false);
  }

  const handleAcceptClick = () => {
      setIsLoading(true);
      setTimeout(() => {
          onAccept();
      }, 2500);
  }

  const renderIntro = () => {
    switch(introStage) {
        case 'verify':
            return (
                <div className="text-center fade-in-up">
                    <p className="text-xl md:text-2xl text-cyan-200 mb-6 font-mono">&gt; Identity Verification Required</p>
                    <button onClick={() => setIntroStage('syncing')} className="p-4 rounded-full" style={{ animation: `pulsate 2s infinite ease-in-out` }}>
                        <FingerprintIcon className="w-32 h-32 text-cyan-300"/>
                    </button>
                    <p className="mt-6 text-lg text-cyan-200 animate-pulse">Place Finger to Continue</p>
                </div>
            );
        case 'syncing':
            return (
                <div className="w-full max-w-2xl flex flex-col items-center fade-in-up">
                    <p className="text-xl md:text-2xl text-cyan-200 font-mono mb-4">&gt; Syncing Heartbeat...</p>
                    <HeartIcon className="w-24 h-24 text-[#FF6B6B] mb-4" style={{ animation: `heart-beat 1.2s infinite`}}/>
                    <svg width="250" height="60" viewBox="0 0 250 60" className="mb-4">
                        <path d="M0 30 L50 30 L60 10 L80 50 L100 20 L120 40 L130 30 L250 30" stroke="#FF6B6B" strokeWidth="3" fill="none" className="ekg-path" />
                    </svg>
                    <p className="text-lg md:text-xl text-white font-mono animate-pulse">Verdict: PERFECT MATCH</p>
                </div>
            );
        case 'decrypting':
            return (
                 <div className="text-center fade-in-up">
                    <p className="text-2xl md:text-3xl text-cyan-200 font-mono mb-4 text-scramble"></p>
                </div>
            );
        case 'countdown':
             return (
                <div className="fade-in-up text-center">
                    <p className="text-xl md:text-2xl mb-4 text-gray-400">Message Unsealed. Initiating Protocol...</p>
                    <p className="text-8xl md:text-9xl font-bold text-white">{countdown > 0 ? countdown : '...'}</p>
                </div>
            );
        default:
            return null;
    }
  }


  if (introStage !== 'done') {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-[#1D2B64] to-[#0f172a] text-white">
            {renderIntro()}
        </div>
    );
  }

  if(isLoading) {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-[#FFF8F0] to-[#FDF6E3]">
              <h2 className="text-4xl font-display font-bold text-gray-700">Processing Love...</h2>
              <div className="w-full max-w-md mt-4 bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] h-4 rounded-full loading-progress"></div>
              </div>
          </div>
      );
  }

  return (
    <div 
        className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-[#FFF8F0] to-[#FDF6E3] overflow-hidden relative transition-transform duration-300 ease-out"
        style={{ transform: pageTilt }}
    >
      {isModalVisible && <Modal onClose={handleModalClose} />}
      <HeartShower heartKey={heartKey} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <HeartIcon className="w-96 h-96 text-red-100 opacity-50" />
      </div>

      <div className="z-10 flex flex-col items-center">
        <p className="text-2xl md:text-4xl text-gray-700 font-display">
          Dearest {recipient},
        </p>
        <p className="text-xl md:text-2xl text-gray-500 mt-2 mb-8">
          {sender} has a very important question for you...
        </p>

        <h1 className="text-4xl md:text-7xl font-display font-extrabold text-[#333333] tracking-tighter drop-shadow-lg mb-12 max-w-4xl">
          {question}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6" style={{ minHeight: '200px' }}>
          <button
            onClick={handleAcceptClick}
            className="px-10 py-5 bg-[#FF6B6B] text-white font-bold font-display rounded-full shadow-lg transform transition-all duration-300 ease-in-out btn-wiggle"
            style={{ 
              '--scale': '1.1',
              transform: `scale(${yesButtonScale})`,
              fontSize: `${1.5 + yesButtonScale * 0.15}rem`,
              padding: `${yesButtonScale * 0.7}rem ${yesButtonScale * 1.6}rem`,
              zIndex: 10,
              animation: 'heart-beat 1.5s ease-in-out infinite'
            } as React.CSSProperties}
          >
            YES!
          </button>
          
          <button
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-400 transition-all duration-300 ease-in-out"
            style={{ 
              ...noPosition,
              transform: `scale(${noScale})`,
              fontSize: `1rem`,
              zIndex: 20
            } as React.CSSProperties}
          >
            {noButtonResponses[noButtonIndex]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalView;