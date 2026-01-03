// Types
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Mode = 'timed' | 'passage';

// Constants
export const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

export const modeOptions: { value: Mode; label: string }[] = [
  { value: 'timed', label: 'Timed (60s)' },
  { value: 'passage', label: 'Passage' },
];

// Utility functions
export const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getModeLabel = (modeValue: Mode): string => {
  const option = modeOptions.find((opt) => opt.value === modeValue);
  return option?.label || modeValue;
};
