import * as React from 'react';
import styles from './DifficultySelector.module.css';
import type { Difficulty } from '../Settings/settings.helpers';
import { difficultyOptions, capitalizeFirst } from '../Settings/settings.helpers';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

function DifficultySelector({
  difficulty,
  onDifficultyChange,
}: DifficultySelectorProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <>
      {/* Desktop view - inline buttons */}
      <div className={styles.desktopSelector}>
        <span className={styles.label}>Difficulty:</span>
        <div className={styles.buttonGroup}>
          {difficultyOptions.map((diff) => (
            <button
              key={diff}
              className={`${styles.button} ${
                difficulty === diff ? styles.active : ''
              }`}
              onClick={() => onDifficultyChange(diff)}
            >
              {capitalizeFirst(diff)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile view - dropdown */}
      <div className={styles.mobileSelector}>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownButton}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {capitalizeFirst(difficulty)}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.chevron}
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className={styles.dropdown}>
              {difficultyOptions.map((diff) => (
                <button
                  key={diff}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onDifficultyChange(diff);
                    setShowDropdown(false);
                  }}
                >
                  <div
                    className={`${styles.radio} ${
                      difficulty === diff ? styles.radioChecked : ''
                    }`}
                  >
                    {difficulty === diff && <div className={styles.radioDot} />}
                  </div>
                  {capitalizeFirst(diff)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DifficultySelector;
