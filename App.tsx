import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { AppState } from './types';
import LoadingScreen from './components/LoadingScreen';
import QuestionScreen from './components/QuestionScreen';
import ProposalScreen from './components/ProposalScreen';
import CelebrationScreen from './components/CelebrationScreen';

type SoundType = 'click' | 'swoosh' | 'success' | 'fail';

const soundUrls = {
  click: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf32363.mp3',
  swoosh: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_133872953e.mp3',
  success: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_755a11e60f.mp3',
  fail: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_25299b921d.mp3',
  background: 'https://cdn.pixabay.com/download/audio/2022/11/21/audio_a1bf890666.mp3',
};

const NameInput: React.FC<{ onSubmit: (name: string) => void }> = ({ onSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 text-stone-800">
            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
                <label htmlFor="name" className="block text-3xl font-serif font-bold mb-6">
                    Your name please....?
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter their name"
                    className="w-full px-4 py-3 rounded-lg bg-white/70 text-stone-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-stone-500 shadow-inner"
                    aria-label="Crush's name"
                />
                <button
                    type="submit"
                    className="mt-6 w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-stone-400 disabled:cursor-not-allowed shadow-md"
                    disabled={!name.trim()}
                >
                    Continue
                </button>
            </form>
        </div>
    );
};


const RejectedScreen: React.FC = () => (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center text-slate-300">
        <h1 className="text-6xl mb-4">( T_T)</h1>
        <p className="text-2xl">Oh. Well, this is awkward.</p>
        <p className="mt-4 text-slate-400">I guess you can just... close the tab now.</p>
    </div>
);


function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [crushName, setCrushName] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);

  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({});
  const hasStartedMusic = useRef(false);

  useEffect(() => {
    // Preload audio
    Object.keys(soundUrls).forEach(key => {
        const url = soundUrls[key as keyof typeof soundUrls];
        audioRefs.current[key] = new Audio(url);
    });
    audioRefs.current.background.loop = true;
    audioRefs.current.background.volume = 0.3;
  }, []);

  const playSound = useCallback((sound: SoundType) => {
    if (!isMuted) {
      const audio = audioRefs.current[sound];
      if(audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Error playing sound:", e));
      }
    }
  }, [isMuted]);

  const handleNameSubmit = useCallback((name: string) => {
    playSound('click');
    setCrushName(name);
    setAppState(AppState.QUESTIONS);
    if (!isMuted && !hasStartedMusic.current) {
        audioRefs.current.background.play().catch(e => console.error("Error playing background music:", e));
        hasStartedMusic.current = true;
    }
  }, [isMuted, playSound]);
  
  const handleProposalYes = useCallback(() => {
      setAppState(AppState.CELEBRATION)
  }, []);

  const handleProposalNo = useCallback(() => {
      setAppState(AppState.REJECTED);
  }, []);

  const backgroundClass = useMemo(() => {
    switch (appState) {
      case AppState.LOADING:
        return 'bg-amber-50';
      case AppState.NAME_INPUT:
      case AppState.QUESTIONS:
        return 'bg-gradient-to-br from-amber-100 to-orange-200';
      case AppState.PROPOSAL:
        return 'bg-gradient-to-br from-rose-200 via-red-300 to-orange-300';
      case AppState.CELEBRATION:
        return 'bg-gradient-to-br from-rose-300 via-pink-300 to-purple-300';
      case AppState.REJECTED:
        return 'bg-slate-800 filter grayscale';
      default:
        return 'bg-stone-200';
    }
  }, [appState]);

  const toggleMute = () => {
    setIsMuted(prev => {
        const newMutedState = !prev;
        if (newMutedState) {
            audioRefs.current.background.pause();
        } else {
            if(hasStartedMusic.current) {
               audioRefs.current.background.play().catch(e => console.error("Error playing background music:", e));
            }
        }
        return newMutedState;
    });
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingScreen onFinished={() => setAppState(AppState.NAME_INPUT)} />;
      case AppState.NAME_INPUT:
        return <NameInput onSubmit={handleNameSubmit} />;
      case AppState.QUESTIONS:
        return <QuestionScreen onFinished={() => setAppState(AppState.PROPOSAL)} playSound={playSound} />;
      case AppState.PROPOSAL:
        return <ProposalScreen name={crushName} onYes={handleProposalYes} onNo={handleProposalNo} playSound={playSound} />;
      case AppState.CELEBRATION:
        return <CelebrationScreen name={crushName} playSound={playSound} />;
      case AppState.REJECTED:
        return <RejectedScreen />;
      default:
        return <div>Something went wrong.</div>;
    }
  };

  return (
    <main className={`w-screen h-screen transition-all duration-1000 ${backgroundClass}`}>
      <div key={appState} className="animate-fade-scale-in w-full h-full">
        {renderContent()}
      </div>
      <button 
        onClick={toggleMute}
        className="fixed bottom-4 right-4 bg-white/50 backdrop-blur-sm text-stone-700 p-3 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75v.008h.008v-.008Zm.008 0v.008h.008v-.008Zm-3.75 0v.008h.008v-.008Zm0 0h.008v.008h-.008Zm-3.75 0v.008h.008v-.008Zm0 0h.008v.008h-.008Z" /></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>
        )}
      </button>
    </main>
  );
}

export default App;