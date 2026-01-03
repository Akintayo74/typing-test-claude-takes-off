import * as React from 'react';
import styles from './Stats.module.css';

interface StatsProps {
  wpm: number;
  accuracy: number;
  time: string;
}

function Stats({ wpm, accuracy, time }: StatsProps) {
  // Determine accuracy color based on value
  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'var(--color-green-500)';
    if (accuracy >= 85) return 'var(--color-yellow-400)';
    return 'var(--color-red-500)';
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default Stats;
