import React from 'react';
import { ScrollIcon } from './Icons';

interface AcceptedViewProps {
  recipientName: string;
  senderName: string;
}

const AcceptedView: React.FC<AcceptedViewProps> = ({ recipientName, senderName }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#FFF8F0] to-[#FDF6E3]">
        <div className="relative w-full max-w-2xl bg-white/90 shadow-2xl rounded-2xl border-4 border-gray-200 p-8 font-serif text-gray-800">
            <div className="absolute top-4 right-4 text-gray-300">
                <ScrollIcon className="w-16 h-16"/>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-center border-b-2 pb-4 mb-6">
                Binding Love Contract
            </h1>
            
            <p className="mb-4">
                This contract, executed on this glorious day, hereby binds <strong className="font-sans font-bold">{recipientName}</strong> (hereafter "The Wise One") and <strong className="font-sans font-bold">{senderName}</strong> (hereafter "The Lucky One").
            </p>

            <h2 className="text-xl font-display font-bold mt-6 mb-2">Terms & Conditions:</h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>The Lucky One is entitled to an unreasonable number of hugs, effective immediately.</li>
                <li>The Wise One is hereby designated as the official decider of all movie nights. This decision is final.</li>
                <li>Both parties agree to the mandatory sharing of fries, unless explicitly declared "sacred fries".</li>
                <li>Spontaneous serenading, while not required, is highly encouraged. Quality is optional.</li>
                <li>All disagreements shall be settled by a game of rock-paper-scissors, best two out of three.</li>
            </ul>

            <p className="mt-8 text-center text-sm text-gray-600">
                This contract is perpetually renewing and non-negotiable. Congratulations on your successful negotiation, {senderName}!
            </p>
            
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
                <div className="relative w-36 h-36 md:w-48 md:h-48 flex items-center justify-center stamp-in">
                    <div className="absolute border-4 border-red-500 rounded-full w-full h-full"></div>
                    <div className="absolute border-2 border-red-500 rounded-full w-[85%] h-[85%]"></div>
                    <span className="text-red-600 font-display font-extrabold text-3xl md:text-4xl -rotate-15">
                        APPROVED
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AcceptedView;