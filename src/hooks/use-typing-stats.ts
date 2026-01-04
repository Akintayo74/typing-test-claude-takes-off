import * as React from 'react';
import {
  calculateWpm,
  calculateAccuracy,
  generateCharacterStatuses,
} from '../helpers/typing-test.helpers';
import type { CharacterStatus } from '../helpers/typing-test.helpers';

interface UseTypingStatsReturn {
  wpm: number;
  accuracy: number;
  characterStatuses: CharacterStatus[];
}

interface UseTypingStatsOptions {
  userInput: string;
  passage: string;
  timeElapsed: number;
  errorIndices: Set<number>;
}

/**
 * Hook for computing typing statistics.
 * All values are memoized for performance.
 */
export function useTypingStats({
  userInput,
  passage,
  timeElapsed,
  errorIndices,
}: UseTypingStatsOptions): UseTypingStatsReturn {
  const wpm = React.useMemo(
    () => calculateWpm(userInput, timeElapsed),
    [userInput, timeElapsed]
  );

  const accuracy = React.useMemo(
    () => calculateAccuracy(userInput, passage),
    [userInput, passage]
  );

  const characterStatuses = React.useMemo(
    () => generateCharacterStatuses(passage, userInput, errorIndices),
    [passage, userInput, errorIndices]
  );

  return { wpm, accuracy, characterStatuses };
}
