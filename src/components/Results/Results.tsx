import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Results.module.css';
import iconRestart from '../../assets/images/icon-restart.svg';
import patternStar1 from '../../assets/images/pattern-star-1.svg';
import patternStar2 from '../../assets/images/pattern-star-2.svg';
import {
  VARIANT_CONTENT,
  getAccuracyColor,
  determineVariantAndUpdateBest,
} from './results.helpers';
import type { LocationState, ResultVariant } from './results.helpers';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [variant, setVariant] = React.useState<ResultVariant>('standard');
  const hasProcessed = React.useRef(false);

  // Determine variant and update localStorage on mount
  React.useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
      return;
    }

    // Prevent double-processing in React Strict Mode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const determinedVariant = determineVariantAndUpdateBest(state.wpm, state.accuracy);
    setVariant(determinedVariant);
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { wpm, accuracy, correctChars, incorrectChars } = state;
  const content = VARIANT_CONTENT[variant];

  const handleGoAgain = () => {
    navigate('/', { replace: true });
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
        {/* Result icon */}
        <div className={styles.iconContainer}>
          <img
            src={content.icon}
            alt=""
            className={variant === 'celebration' ? styles.celebrationIcon : styles.completedIcon}
          />
        </div>

        {/* Message */}
        <div className={styles.messageContainer}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
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
              style={{ color: getAccuracyColor(accuracy) }}
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

        {/* Action button */}
        <button className={styles.goAgainButton} onClick={handleGoAgain}>
          {content.buttonText}
          <img src={iconRestart} alt="" className={styles.restartIcon} />
        </button>
      </div>
    </div>
  );
}

export default Results;
