import * as React from 'react';
import type { Mode } from '../components/Settings/settings.helpers';
import { formatTime } from '../helpers/typing-test.helpers';

interface UseTestTimerReturn {
  timeElapsed: number;
  formattedTime: string;
  isTimeUp: boolean;
  startTimer: () => void;
  resetTimer: () => void;
}

/**
 * Hook for managing the typing test timer.
 * Handles both timed mode (countdown from 60s) and passage mode (count up).
 */
export function useTestTimer(mode: Mode, isRunning: boolean): UseTestTimerReturn {
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // Timer interval - only runs when isRunning is true
  React.useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);
    }, 100); // Update frequently for smooth display

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startTimer = React.useCallback(() => {
    setStartTime(Date.now());
  }, []);

  const resetTimer = React.useCallback(() => {
    setStartTime(null);
    setTimeElapsed(0);
  }, []);

  const formattedTime = formatTime(timeElapsed, mode);
  const isTimeUp = mode === 'timed' && timeElapsed >= 60;

  return {
    timeElapsed,
    formattedTime,
    isTimeUp,
    startTimer,
    resetTimer,
  };
}
