import styles from './StartOverlay.module.css';

interface StartOverlayProps {
  onStart: () => void;
}

function StartOverlay({ onStart }: StartOverlayProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onStart}>
        Start Typing Test
      </button>
      <p className={styles.helperText}>Or click the text and start typing</p>
    </div>
  );
}

export default StartOverlay;
