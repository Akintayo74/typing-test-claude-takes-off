import * as React from 'react';
import styles from './Settings.module.css';

type Difficulty = 'easy' | 'medium' | 'hard';
type Mode = 'timed' | 'passage';

interface SettingsProps {
  difficulty: Difficulty;
  mode: Mode;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onModeChange: (mode: Mode) => void;
}

function Settings({
  difficulty,
  mode,
  onDifficultyChange,
  onModeChange,
}: SettingsProps) {
  const [showDifficultyDropdown, setShowDifficultyDropdown] = React.useState(false);
  const [showModeDropdown, setShowModeDropdown] = React.useState(false);

  const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
  const modeOptions: { value: Mode; label: string }[] = [
    { value: 'timed', label: 'Timed (60s)' },
    { value: 'passage', label: 'Passage' },
  ];

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getModeLabel = (modeValue: Mode) => {
    const option = modeOptions.find((opt) => opt.value === modeValue);
    return option?.label || modeValue;
  };

  return (
    <div className={styles.container}>
      {/* Desktop view - inline buttons */}
      <div className={styles.settingsRow}>
        <div className={styles.settingGroup}>
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

        <div className={styles.divider} />

        <div className={styles.settingGroup}>
          <span className={styles.label}>Mode:</span>
          <div className={styles.buttonGroup}>
            {modeOptions.map((opt) => (
              <button
                key={opt.value}
                className={`${styles.button} ${
                  mode === opt.value ? styles.active : ''
                }`}
                onClick={() => onModeChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile view - dropdowns */}
      <div className={styles.mobileSettings}>
        {/* Difficulty dropdown */}
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownButton}
            onClick={() => setShowDifficultyDropdown(!showDifficultyDropdown)}
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

          {showDifficultyDropdown && (
            <div className={styles.dropdown}>
              {difficultyOptions.map((diff) => (
                <button
                  key={diff}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onDifficultyChange(diff);
                    setShowDifficultyDropdown(false);
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

        {/* Mode dropdown */}
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownButton}
            onClick={() => setShowModeDropdown(!showModeDropdown)}
          >
            {getModeLabel(mode)}
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

          {showModeDropdown && (
            <div className={styles.dropdown}>
              {modeOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onModeChange(opt.value);
                    setShowModeDropdown(false);
                  }}
                >
                  <div
                    className={`${styles.radio} ${
                      mode === opt.value ? styles.radioChecked : ''
                    }`}
                  >
                    {mode === opt.value && <div className={styles.radioDot} />}
                  </div>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
