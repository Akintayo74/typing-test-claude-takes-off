const STORAGE_KEY = 'typing-test-personal-best';

export interface PersonalBest {
  wpm: number;
  accuracy: number;
}

export function getPersonalBest(): PersonalBest | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as PersonalBest;
  } catch {
    return null;
  }
}

export function setPersonalBest(wpm: number, accuracy: number): void {
  const data: PersonalBest = { wpm, accuracy };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function beatsPersonalBest(
  wpm: number,
  accuracy: number,
  stored: PersonalBest
): boolean {
  return wpm > stored.wpm && accuracy > stored.accuracy;
}
