import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Results.module.css';
import iconCompleted from '../../assets/images/icon-completed.svg';
import iconRestart from '../../assets/images/icon-restart.svg';
import patternStar1 from '../../assets/images/pattern-star-1.svg';
import patternStar2 from '../../assets/images/pattern-star-2.svg';

interface LocationState {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
}

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  // If no state, redirect to home (handles direct navigation to /results)
  React.useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { wpm, accuracy, correctChars, incorrectChars } = state;

  const handleGoAgain = () => {
    navigate('/', { replace: true });
  };

  // Determine accuracy color based on value
  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'var(--color-green-500)';
    if (accuracy >= 85) return 'var(--color-yellow-400)';
    return 'var(--color-red-500)';
  };

  return (
    <div className={styles.container}>
      {/* Decorative stars */}
      <img
        src={patternStar2}
        alt=""
        className={styles.starTopLeft}
        aria-hidden="true"
      />
      <img
        src={patternStar1}
        alt=""
        className={styles.starBottomRight}
        aria-hidden="true"
      />

      <div className={styles.content}>
        {/* Check circle icon */}
        <div className={styles.iconContainer}>
          <img src={iconCompleted} alt="" className={styles.completedIcon} />
        </div>

        {/* Message */}
        <div className={styles.messageContainer}>
          <h1 className={styles.title}>Test Complete!</h1>
          <p className={styles.subtitle}>
            Solid run. Keep pushing to beat your high score.
          </p>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>WPM:</span>
            <span className={styles.statValue}>{wpm}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Accuracy:</span>
            <span
              className={styles.statValue}
              style={{ color: getAccuracyColor() }}
            >
              {accuracy}%
            </span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Characters</span>
            <span className={styles.statValue}>
              <span className={styles.correctChars}>{correctChars}</span>
              <span className={styles.separator}>/</span>
              <span className={styles.incorrectChars}>{incorrectChars}</span>
            </span>
          </div>
        </div>

        {/* Go Again button */}
        <button className={styles.goAgainButton} onClick={handleGoAgain}>
          Go Again
          <img src={iconRestart} alt="" className={styles.restartIcon} />
        </button>
      </div>
    </div>
  );
}

export default Results;