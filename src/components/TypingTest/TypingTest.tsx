import styles from './TypingTest.module.css';
import Stats from '../Stats';
import TextDisplay from '../TextDisplay';
import StartOverlay from '../StartOverlay';
import iconRestart from '../../assets/images/icon-restart.svg';
import { useTypingTest } from '../../hooks/use-typing-test';

function TypingTest() {
  const { settings, hasStarted, stats, display, inputProps, inputRef, actions } =
    useTypingTest();

  const handleTextDisplayClick = () => {
    if (!hasStarted) {
      actions.start();
      return;
    }
    actions.focusInput();
  };

  return (
    <div className={styles.container}>
      <Stats
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        time={stats.formattedTime}
        difficulty={settings.difficulty}
        mode={settings.mode}
        onDifficultyChange={settings.setDifficulty}
        onModeChange={settings.setMode}
      />

      <div className={styles.textContainer}>
        <TextDisplay
          characterStatuses={display.characterStatuses}
          currentIndex={display.currentIndex}
          onClick={handleTextDisplayClick}
          blurred={!hasStarted}
        />
        {!hasStarted && <StartOverlay onStart={actions.start} />}
      </div>

      {/* Hidden input to capture keyboard events */}
      <input
        ref={inputRef}
        type="text"
        value={inputProps.value}
        onChange={inputProps.onChange}
        className={styles.hiddenInput}
        disabled={inputProps.isDisabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Footer with restart button */}
      <footer className={styles.footer}>
        <button className={styles.restartButton} onClick={actions.restart}>
          Restart Test
          <img src={iconRestart} alt="" className={styles.restartIcon} />
        </button>
      </footer>
    </div>
  );
}

export default TypingTest;
