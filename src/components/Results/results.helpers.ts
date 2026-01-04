import iconCompleted from '../../assets/images/icon-completed.svg';
import iconNewPb from '../../assets/images/icon-new-pb.svg';
import {
  getPersonalBest,
  setPersonalBest,
  beatsPersonalBest,
} from '../../helpers/personal-best';

// Types
export type ResultVariant = 'baseline' | 'standard' | 'celebration';

export interface LocationState {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
}

export interface VariantContent {
  icon: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

// Constants
export const VARIANT_CONTENT: Record<ResultVariant, VariantContent> = {
  baseline: {
    icon: iconCompleted,
    title: 'Baseline Established!',
    subtitle: "You've set the bar. Now the real challenge begins—time to beat it.",
    buttonText: 'Beat This Score',
  },
  standard: {
    icon: iconCompleted,
    title: 'Test Complete!',
    subtitle: 'Solid run. Keep pushing to beat your high score.',
    buttonText: 'Go Again',
  },
  celebration: {
    icon: iconNewPb,
    title: 'High Score Smashed!',
    subtitle: "You're getting faster. That was incredible typing.",
    buttonText: 'Go Again',
  },
};

// Utility functions
export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 95) return 'var(--color-green-500)';
  if (accuracy >= 85) return 'var(--color-yellow-400)';
  return 'var(--color-red-500)';
}

/**
 * Determines the result variant and updates personal best in localStorage.
 * Returns the appropriate variant based on whether this is a first test,
 * beats the personal best, or is a standard run.
 */
export function determineVariantAndUpdateBest(
  wpm: number,
  accuracy: number
): ResultVariant {
  const storedBest = getPersonalBest();

  if (!storedBest) {
    // First test - set baseline
    setPersonalBest(wpm, accuracy);
    return 'baseline';
  }

  if (beatsPersonalBest(wpm, accuracy, storedBest)) {
    // Beat personal best - celebration!
    setPersonalBest(wpm, accuracy);
    return 'celebration';
  }

  // Didn't beat - standard
  return 'standard';
}
