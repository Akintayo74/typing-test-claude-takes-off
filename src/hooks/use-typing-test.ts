import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Difficulty, Mode } from '../components/Settings/settings.helpers';
import { usePassage } from './use-passage';
import { useTestTimer } from './use-test-timer';
import { useTypingInput } from './use-typing-input';
import { useTypingStats } from './use-typing-stats';
import { calculateFinalResults } from '../helpers/typing-test.helpers';
import type { TestStatus, CharacterStatus } from '../helpers/typing-test.helpers';

interface UseTypingTestReturn {
  // Settings
  settings: {
    difficulty: Difficulty;
    mode: Mode;
    setDifficulty: (d: Difficulty) => void;
    setMode: (m: Mode) => void;
  };

  // Test state
  status: TestStatus;
  hasStarted: boolean;

  // Stats display
  stats: {
    wpm: number;
    accuracy: number;
    formattedTime: string;
  };

  // Text display
  display: {
    characterStatuses: CharacterStatus[];
    currentIndex: number;
  };

  // Input handling
  inputProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled: boolean;
  };

  // Ref (separate to avoid linter confusion)
  inputRef: React.RefObject<HTMLInputElement | null>;

  // Actions
  actions: {
    start: () => void;
    restart: () => void;
    focusInput: () => void;
  };
}

/**
 * Main hook that composes smaller hooks to manage the typing test.
 * Returns a well-organized object grouped by concern.
 */
export function useTypingTest(): UseTypingTestReturn {
  const navigate = useNavigate();

  // Settings state
  const [difficulty, setDifficulty] = React.useState<Difficulty>('hard');
  const [mode, setMode] = React.useState<Mode>('timed');

  // UI state
  const [hasStarted, setHasStarted] = React.useState(false);
  const [status, setStatus] = React.useState<TestStatus>('idle');

  // Compose smaller hooks
  const { passage, loadNewPassage } = usePassage(difficulty);

  const timer = useTestTimer(mode, status === 'running');

  const typingInput = useTypingInput({
    passage,
    isDisabled: status === 'finished',
    onFirstKeystroke: () => {
      setStatus('running');
      timer.startTimer();
    },
  });

  const typingStats = useTypingStats({
    userInput: typingInput.userInput,
    passage,
    timeElapsed: timer.timeElapsed,
    errorIndices: typingInput.errorIndices,
  });

  // Handle test completion - time up
  React.useEffect(() => {
    if (timer.isTimeUp && status === 'running') {
      setStatus('finished');
    }
  }, [timer.isTimeUp, status]);

  // Handle test completion - passage complete
  React.useEffect(() => {
    if (typingInput.isComplete && status === 'running') {
      setStatus('finished');
    }
  }, [typingInput.isComplete, status]);

  // Navigate to results when finished
  React.useEffect(() => {
    if (status === 'finished') {
      const results = calculateFinalResults(
        typingInput.userInput,
        passage,
        timer.timeElapsed
      );
      navigate('/results', { replace: true, state: results });
    }
  }, [status, navigate, typingInput.userInput, passage, timer.timeElapsed]);

  // Reset everything when difficulty changes
  React.useEffect(() => {
    typingInput.resetInput();
    timer.resetTimer();
    setStatus('idle');
  }, [difficulty]); // eslint-disable-line react-hooks/exhaustive-deps

  // Actions
  const start = React.useCallback(() => {
    setHasStarted(true);
    typingInput.focusInput();
  }, [typingInput]);

  const restart = React.useCallback(() => {
    loadNewPassage();
    typingInput.resetInput();
    timer.resetTimer();
    setStatus('idle');
    typingInput.focusInput();
  }, [loadNewPassage, typingInput, timer]);

  return {
    settings: {
      difficulty,
      mode,
      setDifficulty,
      setMode,
    },

    status,
    hasStarted,

    stats: {
      wpm: typingStats.wpm,
      accuracy: typingStats.accuracy,
      formattedTime: timer.formattedTime,
    },

    display: {
      characterStatuses: typingStats.characterStatuses,
      currentIndex: typingInput.currentIndex,
    },

    inputProps: {
      value: typingInput.userInput,
      onChange: typingInput.handleInputChange,
      isDisabled: status === 'finished',
    },

    inputRef: typingInput.inputRef,

    actions: {
      start,
      restart,
      focusInput: typingInput.focusInput,
    },
  };
}
