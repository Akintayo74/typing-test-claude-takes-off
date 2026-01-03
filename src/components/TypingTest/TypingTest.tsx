import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TypingTest.module.css';
import Stats from '../Stats';
import TextDisplay from '../TextDisplay';
import passageData from '../../../data.json';
import type { Difficulty, Mode } from '../Settings/settings.helpers';
type TestStatus = 'idle' | 'running' | 'finished';

interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'untyped';
  wasError: boolean; // Track if this character was ever typed incorrectly
}

function TypingTest() {
  const navigate = useNavigate();

  // Settings state
  const [difficulty, setDifficulty] = React.useState<Difficulty>('hard');
  const [mode, setMode] = React.useState<Mode>('timed');

  // Test status lifecycle
  const [status, setStatus] = React.useState<TestStatus>('idle');

  // Typing test state
  const [passage, setPassage] = React.useState<string>('');
  const [userInput, setUserInput] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = React.useState<number>(0);
  const [errorIndices, setErrorIndices] = React.useState<Set<number>>(new Set());

  // Ref for the hidden input
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Load a random passage when difficulty changes or on mount
  React.useEffect(() => {
    const passages = passageData[difficulty];
    const randomPassage = passages[Math.floor(Math.random() * passages.length)];
    setPassage(randomPassage.text);

    // Reset everything when passage changes
    setUserInput('');
    setStartTime(null);
    setTimeElapsed(0);
    setStatus('idle');
    setErrorIndices(new Set());
  }, [difficulty]);

  // Timer logic - only runs when status is 'running'
  React.useEffect(() => {
    if (status !== 'running' || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);

      // Auto-complete for timed mode after 60 seconds
      if (mode === 'timed' && elapsed >= 60) {
        setStatus('finished');
      }
    }, 100); // Update more frequently for smooth display

    return () => clearInterval(interval);
  }, [startTime, status, mode]);

  // Navigate to results when test is finished
  React.useEffect(() => {
    if (status === 'finished') {
      // Calculate final stats
      const correctChars = userInput.split('').filter((char, i) => char === passage[i]).length;
      const incorrectChars = userInput.length - correctChars;
      const finalAccuracy = userInput.length > 0
        ? Math.round((correctChars / userInput.length) * 100)
        : 100;
      const finalWpm = timeElapsed > 0
        ? Math.round((userInput.trim().split(/\s+/).length / timeElapsed) * 60)
        : 0;

      // Navigate to results with replace to prevent back navigation issues
      navigate('/results', {
        replace: true,
        state: {
          wpm: finalWpm,
          accuracy: finalAccuracy,
          correctChars,
          incorrectChars,
          timeElapsed,
        },
      });
    }
  }, [status, navigate, userInput, passage, timeElapsed]);

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't allow input if test is finished
    if (status === 'finished') return;

    const newInput = e.target.value;

    // Start timer on first keystroke
    if (status === 'idle' && newInput.length > 0) {
      setStartTime(Date.now());
      setStatus('running');
    }

    // Don't allow typing beyond passage length
    if (newInput.length > passage.length) {
      return;
    }

    // Track errors
    const newErrorIndices = new Set(errorIndices);
    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] !== passage[i]) {
        newErrorIndices.add(i);
      }
    }
    setErrorIndices(newErrorIndices);

    setUserInput(newInput);

    // Complete for passage mode when user finishes typing the passage
    if (mode === 'passage' && newInput.length === passage.length) {
      setStatus('finished');
    }
  };

  // Calculate character statuses for rendering
  const characterStatuses: CharacterStatus[] = React.useMemo(() => {
    return passage.split('').map((char, index) => {
      const wasError = errorIndices.has(index);

      if (index >= userInput.length) {
        return { char, status: 'untyped' as const, wasError };
      }

      if (userInput[index] === char) {
        return { char, status: 'correct' as const, wasError };
      }

      return { char, status: 'incorrect' as const, wasError };
    });
  }, [passage, userInput, errorIndices]);

  // Calculate WPM (Words Per Minute)
  const wpm = React.useMemo(() => {
    if (timeElapsed === 0) return 0;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round((words / timeElapsed) * 60);
  }, [userInput, timeElapsed]);

  // Calculate accuracy
  const accuracy = React.useMemo(() => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, i) => char === passage[i]).length;
    return Math.round((correctChars / userInput.length) * 100);
  }, [userInput, passage]);

  // Format time as M:SS
  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeElapsed]);

  // Focus input when clicking on text display
  const handleTextDisplayClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <Stats
        wpm={wpm}
        accuracy={accuracy}
        time={formattedTime}
        difficulty={difficulty}
        mode={mode}
        onDifficultyChange={setDifficulty}
        onModeChange={setMode}
      />

      <TextDisplay
        characterStatuses={characterStatuses}
        currentIndex={userInput.length}
        onClick={handleTextDisplayClick}
      />

      {/* Hidden input to capture keyboard events */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className={styles.hiddenInput}
        disabled={status === 'finished'}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
}

export default TypingTest;
