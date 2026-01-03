import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Results from './components/Results';

function App() {
  // TODO: Replace with actual personal best from localStorage
  const personalBest = 92;

  return (
    <div>
      <Header personalBest={personalBest} />
      <Routes>
        <Route path="/" element={<TypingTest />} />
        <Route path="/results" element={<Results personalBest={personalBest} />} />
      </Routes>
    </div>
  );
}

export default App;
