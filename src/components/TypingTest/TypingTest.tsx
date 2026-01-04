import styles from './TypingTest.module.css';
import Stats from '../Stats';
import TextDisplay from '../TextDisplay';
import StartOverlay from '../StartOverlay';
import iconRestart from '../../assets/images/icon-restart.svg';
import { useTypingTest } from './use-typing-test';

function TypingTest() {
  const {
    // Settings
    difficulty,
    mode,
    setDifficulty,
    setMode,

    // Test state
    hasStarted,
    status,
    userInput,
    currentIndex,

    // Computed values
    wpm,
    accuracy,
    formattedTime,
    characterStatuses,

    // Handlers
    handleStart,
    handleTextDisplayClick,
    handleInputChange,
    handleRestart,

    // Ref
    inputRef,
  } = useTypingTest();

  return (
    <div className={styles.container}>
      <Stats
        wpm={wpm}
        accuracy={accuracy}
        time={formattedTime}
        difficulty={difficulty}
        mode={mode}
        onDifficultyChange={setDifficulty}
        onModeChange={setMode}
      />

      <div className={styles.textContainer}>
        <TextDisplay
          characterStatuses={characterStatuses}
          currentIndex={currentIndex}
          onClick={handleTextDisplayClick}
          blurred={!hasStarted}
        />
        {!hasStarted && <StartOverlay onStart={handleStart} />}
      </div>

      {/* Hidden input to capture keyboard events */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className={styles.hiddenInput}
        disabled={status === 'finished'}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* Footer with restart button */}
      <footer className={styles.footer}>
        <button className={styles.restartButton} onClick={handleRestart}>
          Restart Test
          <img src={iconRestart} alt="" className={styles.restartIcon} />
        </button>
      </footer>
    </div>
  );
}

export default TypingTest;
