import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import passageData from '../../../data.json';
import type { Difficulty, Mode } from '../Settings/settings.helpers';
import {
  calculateWpm,
  calculateAccuracy,
  formatTime,
  generateCharacterStatuses,
  calculateFinalResults,
  trackErrors,
} from './typing-test.helpers';
import type { TestStatus, CharacterStatus } from './typing-test.helpers';

interface UseTypingTestReturn {
  // Settings
  difficulty: Difficulty;
  mode: Mode;
  setDifficulty: (d: Difficulty) => void;
  setMode: (m: Mode) => void;

  // Test state
  hasStarted: boolean;
  status: TestStatus;
  passage: string;
  userInput: string;
  currentIndex: number;

  // Computed values
  wpm: number;
  accuracy: number;
  formattedTime: string;
  characterStatuses: CharacterStatus[];

  // Handlers
  handleStart: () => void;
  handleTextDisplayClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRestart: () => void;

  // Ref for hidden input
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function getRandomPassage(difficulty: Difficulty): string {
  const passages = passageData[difficulty];
  const randomPassage = passages[Math.floor(Math.random() * passages.length)];
  return randomPassage.text;
}

export function useTypingTest(): UseTypingTestReturn {
  const navigate = useNavigate();

  // Settings state
  const [difficulty, setDifficulty] = React.useState<Difficulty>('hard');
  const [mode, setMode] = React.useState<Mode>('timed');

  // Start page state - controls initial blur/overlay
  const [hasStarted, setHasStarted] = React.useState(false);

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
    setPassage(getRandomPassage(difficulty));
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
      const results = calculateFinalResults(userInput, passage, timeElapsed);
      navigate('/results', {
        replace: true,
        state: results,
      });
    }
  }, [status, navigate, userInput, passage, timeElapsed]);

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle user input
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    setErrorIndices(prev => trackErrors(newInput, passage, prev));
    setUserInput(newInput);

    // Complete when user finishes typing the passage (both modes)
    if (newInput.length === passage.length) {
      setStatus('finished');
    }
  }, [status, passage]);

  // Handle starting the test (from overlay or text click)
  const handleStart = React.useCallback(() => {
    setHasStarted(true);
    inputRef.current?.focus();
  }, []);

  // Focus input when clicking on text display
  const handleTextDisplayClick = React.useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    inputRef.current?.focus();
  }, [hasStarted]);

  // Handle restart - load new passage and reset state
  const handleRestart = React.useCallback(() => {
    setPassage(getRandomPassage(difficulty));
    setUserInput('');
    setStartTime(null);
    setTimeElapsed(0);
    setStatus('idle');
    setErrorIndices(new Set());
    inputRef.current?.focus();
  }, [difficulty]);

  // Computed values using helpers
  const wpm = React.useMemo(
    () => calculateWpm(userInput, timeElapsed),
    [userInput, timeElapsed]
  );

  const accuracy = React.useMemo(
    () => calculateAccuracy(userInput, passage),
    [userInput, passage]
  );

  const formattedTime = React.useMemo(
    () => formatTime(timeElapsed, mode),
    [timeElapsed, mode]
  );

  const characterStatuses = React.useMemo(
    () => generateCharacterStatuses(passage, userInput, errorIndices),
    [passage, userInput, errorIndices]
  );

  return {
    // Settings
    difficulty,
    mode,
    setDifficulty,
    setMode,

    // Test state
    hasStarted,
    status,
    passage,
    userInput,
    currentIndex: userInput.length,

    // Computed values
    wpm,
    accuracy,
    formattedTime,
    characterStatuses,

    // Handlers
    handleStart,
    handleTextDisplayClick,
    handleInputChange,
    handleRestart,

    // Ref
    inputRef,
  };
}
