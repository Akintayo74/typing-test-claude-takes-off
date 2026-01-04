import * as React from 'react';
import passageData from '../../data.json';
import type { Difficulty } from '../components/Settings/settings.helpers';

interface UsePassageReturn {
  passage: string;
  loadNewPassage: () => void;
}

function getRandomPassage(difficulty: Difficulty): string {
  const passages = passageData[difficulty];
  const randomPassage = passages[Math.floor(Math.random() * passages.length)];
  return randomPassage.text;
}

/**
 * Hook for managing passage loading based on difficulty.
 * Automatically loads a new passage when difficulty changes.
 */
export function usePassage(difficulty: Difficulty): UsePassageReturn {
  const [passage, setPassage] = React.useState<string>(() =>
    getRandomPassage(difficulty)
  );

  // Load new passage when difficulty changes
  React.useEffect(() => {
    setPassage(getRandomPassage(difficulty));
  }, [difficulty]);

  const loadNewPassage = React.useCallback(() => {
    setPassage(getRandomPassage(difficulty));
  }, [difficulty]);

  return { passage, loadNewPassage };
}
