import styles from './Stats.module.css';
import DifficultySelector from '../DifficultySelector';
import ModeSelector from '../ModeSelector';
import type { Difficulty, Mode } from '../Settings/settings.helpers';

interface StatsProps {
  wpm: number;
  accuracy: number;
  time: string;
  difficulty: Difficulty;
  mode: Mode;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onModeChange: (mode: Mode) => void;
}

function Stats({
  wpm,
  accuracy,
  time,
  difficulty,
  mode,
  onDifficultyChange,
  onModeChange,
}: StatsProps) {
  // Determine accuracy color based on value
  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'var(--color-green-500)';
    if (accuracy >= 85) return 'var(--color-yellow-400)';
    return 'var(--color-red-500)';
  };

  return (
    <div className={styles.container}>
      {/* Stats section */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.label}>WPM:</span>
          <span className={styles.value}>{wpm}</span>
        </div>

        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>

        <div className={styles.stat}>
          <span className={styles.label}>Accuracy:</span>
          <span
            className={styles.value}
            style={{ color: getAccuracyColor() }}
          >
            {accuracy}%
          </span>
        </div>

        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>

        <div className={styles.stat}>
          <span className={styles.label}>Time:</span>
          <span
            className={styles.value}
            style={{ color: 'var(--color-yellow-400)' }}
          >
            {time}
          </span>
        </div>
      </div>

      {/* Settings section - desktop */}
      <div className={styles.settingsRow}>
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={onDifficultyChange}
        />
        <div className={styles.settingsDivider} />
        <ModeSelector mode={mode} onModeChange={onModeChange} />
      </div>

      {/* Settings section - mobile dropdowns */}
      <div className={styles.mobileSettings}>
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={onDifficultyChange}
        />
        <ModeSelector mode={mode} onModeChange={onModeChange} />
      </div>
    </div>
  );
}

export default Stats;
