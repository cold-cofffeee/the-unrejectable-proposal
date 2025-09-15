import React, { useState, useEffect } from 'react';
import SetupView from './components/LoadingView';
import ProposalView from './components/ProposalInput';
import AcceptedView from './components/ProposalDisplay';

type AppState = 'setup' | 'proposal' | 'accepted';
type ProposalDetails = {
  question: string;
  recipient: string;
  sender: string;
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [details, setDetails] = useState<ProposalDetails | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const question = params.get('q');
    const recipient = params.get('r');
    const sender = params.get('s');

    if (question && recipient && sender) {
      setDetails({ question, recipient, sender });
      setAppState('proposal');
    } else {
      setAppState('setup');
    }
  }, []);

  const handleCreate = (newDetails: ProposalDetails) => {
    setDetails(newDetails);
    // In a real app, you'd navigate to the new URL. Here, we'll simulate it.
    const params = new URLSearchParams({
        q: newDetails.question,
        r: newDetails.recipient,
        s: newDetails.sender,
    });
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    // We can't change the browser URL in this environment, so we just switch the state
    // and show what the user should do.
    setAppState('proposal');
  };
  
  const handleAccept = () => {
    setAppState('accepted');
  };

  const renderContent = () => {
    switch (appState) {
      case 'proposal':
        if (details) {
          return <ProposalView {...details} onAccept={handleAccept} />;
        }
        return <SetupView onCreate={handleCreate} />; // Fallback
      case 'accepted':
        if (details) {
          return <AcceptedView recipientName={details.recipient} senderName={details.sender} />;
        }
        return <SetupView onCreate={handleCreate} />; // Fallback
      case 'setup':
      default:
        return <SetupView onCreate={handleCreate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F0]">
      {renderContent()}
    </div>
  );
};

export default App;