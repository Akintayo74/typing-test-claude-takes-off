import * as React from 'react';
import styles from './ModeSelector.module.css';
import type { Mode } from '../Settings/settings.helpers';
import { modeOptions, getModeLabel } from '../Settings/settings.helpers';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <>
      {/* Desktop view - inline buttons */}
      <div className={styles.desktopSelector}>
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

      {/* Mobile view - dropdown */}
      <div className={styles.mobileSelector}>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownButton}
            onClick={() => setShowDropdown(!showDropdown)}
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

          {showDropdown && (
            <div className={styles.dropdown}>
              {modeOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={styles.dropdownItem}
                  onClick={() => {
                    onModeChange(opt.value);
                    setShowDropdown(false);
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
    </>
  );
}

export default ModeSelector;
