import React, { useState } from 'react';
import { HeartIcon, ClipboardIcon } from './Icons';

interface SetupViewProps {
  onCreate: (details: { question: string, recipient: string, sender: string }) => void;
}

const SetupView: React.FC<SetupViewProps> = ({ onCreate }) => {
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [question, setQuestion] = useState('Will you go on a date with me?');
    const [link, setLink] = useState('');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    const handleGenerateLink = () => {
        if (!sender || !recipient || !question) {
            alert("Please fill out all the fields!");
            return;
        }
        const params = new URLSearchParams({
            q: question,
            r: recipient,
            s: sender,
        });
        const generatedLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        setLink(generatedLink);
        onCreate({question, recipient, sender});
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    };

    if (link) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-800">Your Link is Ready!</h1>
                <p className="mt-4 text-lg text-gray-600">Send this to your special someone and cross your fingers!</p>
                <div className="mt-8 bg-white p-4 rounded-xl shadow-inner w-full max-w-lg flex items-center gap-4 border">
                    <input type="text" readOnly value={link} className="w-full bg-transparent outline-none text-gray-700"/>
                    <button onClick={handleCopy} className="px-4 py-2 bg-[#4DD0E1] text-white font-bold rounded-full hover:bg-cyan-500 flex-shrink-0 flex items-center gap-2">
                        <ClipboardIcon className="w-5 h-5"/>
                        {copyStatus === 'idle' ? 'Copy' : 'Copied!'}
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">*Note: For this demo, clicking the link won't work. The proposal page is shown immediately after creation.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <HeartIcon className="w-24 h-24 text-[#FF6B6B] mx-auto drop-shadow-lg" />
                <h1 className="text-5xl md:text-7xl font-display font-extrabold text-[#333333] tracking-tighter">
                    The Unrejectable Proposal
                </h1>
                <p className="mt-2 text-lg text-gray-600">Craft a proposal your partner can't refuse (literally).</p>
            </div>
            
            <div className="w-full max-w-md bg-white/70 p-8 rounded-2xl shadow-lg space-y-6 backdrop-blur-sm">
                <div>
                    <label htmlFor="sender" className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
                    <input type="text" id="sender" value={sender} onChange={e => setSender(e.target.value)} placeholder="e.g., Alex" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition" />
                </div>
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-600 mb-1">Their Name</label>
                    <input type="text" id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g., Jamie" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition" />
                </div>
                <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-600 mb-1">The Big Question</label>
                    <textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} rows={3} className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition" />
                </div>
                <button 
                    onClick={handleGenerateLink}
                    className="w-full px-8 py-4 bg-[#FF6B6B] text-white text-xl font-bold font-display rounded-full shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 btn-wiggle"
                    style={{'--scale': '1.05'} as React.CSSProperties}
                >
                    Create the Proposal!
                </button>
            </div>
        </div>
    );
};

export default SetupView;