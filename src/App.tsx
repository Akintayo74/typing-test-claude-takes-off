import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import { getPersonalBest } from './helpers/personal-best';

function App() {
  const location = useLocation();
  const [personalBest, setPersonalBest] = React.useState<number | undefined>(undefined);

  // Load personal best from localStorage on mount and when route changes
  // (to update after a new score is set on Results page)
  React.useEffect(() => {
    const stored = getPersonalBest();
    setPersonalBest(stored?.wpm);
  }, [location.pathname]);

  return (
    <div>
      <Header personalBest={personalBest} />
      <Routes>
        <Route path="/" element={<TypingTest />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
