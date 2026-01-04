import type { Mode } from '../components/Settings/settings.helpers';

// Types
export type TestStatus = 'idle' | 'running' | 'finished';

export interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'untyped';
  wasError: boolean;
}

export interface TestResults {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
}

// Utility functions

/**
 * Calculates Words Per Minute based on typed content and elapsed time.
 */
export function calculateWpm(userInput: string, timeElapsed: number): number {
  if (timeElapsed === 0) return 0;
  const words = userInput.trim().split(/\s+/).length;
  return Math.round((words / timeElapsed) * 60);
}

/**
 * Calculates accuracy as a percentage of correct characters.
 */
export function calculateAccuracy(userInput: string, passage: string): number {
  if (userInput.length === 0) return 100;
  const correctChars = userInput.split('').filter((char, i) => char === passage[i]).length;
  return Math.round((correctChars / userInput.length) * 100);
}

/**
 * Formats time for display.
 * - Timed mode: countdown from 60 seconds
 * - Passage mode: count up from 0
 */
export function formatTime(timeElapsed: number, mode: Mode): string {
  if (mode === 'timed') {
    const remaining = Math.max(0, 60 - timeElapsed);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Generates character statuses for rendering the text display.
 * Each character is marked as correct, incorrect, or untyped,
 * and tracks if it was ever typed incorrectly.
 */
export function generateCharacterStatuses(
  passage: string,
  userInput: string,
  errorIndices: Set<number>
): CharacterStatus[] {
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
}

/**
 * Calculates final test results for navigation to results page.
 */
export function calculateFinalResults(
  userInput: string,
  passage: string,
  timeElapsed: number
): TestResults {
  const correctChars = userInput.split('').filter((char, i) => char === passage[i]).length;
  const incorrectChars = userInput.length - correctChars;
  const accuracy = userInput.length > 0
    ? Math.round((correctChars / userInput.length) * 100)
    : 100;
  const wpm = timeElapsed > 0
    ? Math.round((userInput.trim().split(/\s+/).length / timeElapsed) * 60)
    : 0;

  return {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    timeElapsed,
  };
}

/**
 * Tracks error indices when user types.
 * Returns a new Set with any new errors added.
 */
export function trackErrors(
  newInput: string,
  passage: string,
  existingErrors: Set<number>
): Set<number> {
  const newErrorIndices = new Set(existingErrors);
  for (let i = 0; i < newInput.length; i++) {
    if (newInput[i] !== passage[i]) {
      newErrorIndices.add(i);
    }
  }
  return newErrorIndices;
}
