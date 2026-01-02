import Header from './components/Header';

function App() {
  // TODO: Replace with actual personal best from localStorage
  const personalBest = 92;

  return (
    <div>
      <Header personalBest={personalBest} />
    </div>
  );
}

export default App;
