import React, { useState, useEffect } from 'react';
import { generateCelebrationPoem } from '../services/geminiService';

interface CelebrationScreenProps {
  name: string;
  playSound: (sound: 'success') => void;
}

const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ name, playSound }) => {
    const [poem, setPoem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        playSound('success');
        const fetchPoem = async () => {
            setLoading(true);
            const generatedPoem = await generateCelebrationPoem(name);
            setPoem(generatedPoem);
            setLoading(false);
        };
        fetchPoem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center text-stone-800 overflow-hidden">
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-rose-300 animate-float-up"
                        style={{
                            fontSize: `${Math.random() * 20 + 10}px`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >♥</div>
                ))}
            </div>

            <div className="z-10 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-lg w-full">
                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4 text-rose-600 animate-pulse">YESSSS!</h1>
                <p className="text-2xl mb-6 font-serif">See you soon, {name}! ;)</p>

                <div className="bg-rose-100/80 p-6 rounded-lg">
                    {loading ? (
                        <p className="animate-pulse font-serif">Crafting a victory poem...</p>
                    ) : (
                        <p className="text-lg whitespace-pre-line font-serif">{poem}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CelebrationScreen;