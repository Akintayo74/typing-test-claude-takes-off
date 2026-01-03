import styles from './TextDisplay.module.css';

interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'untyped';
  wasError: boolean;
}

interface TextDisplayProps {
  characterStatuses: CharacterStatus[];
  currentIndex: number;
  onClick?: () => void;
}

function TextDisplay({ characterStatuses, currentIndex, onClick }: TextDisplayProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.textBox}>
        {characterStatuses.map((charStatus, index) => {
          const isCurrent = index === currentIndex;
          const showUnderline = charStatus.wasError;

          return (
            <span
              key={index}
              className={`${styles.character} ${
                charStatus.status === 'correct'
                  ? styles.correct
                  : charStatus.status === 'incorrect'
                  ? styles.incorrect
                  : styles.untyped
              } ${isCurrent ? styles.current : ''} ${
                showUnderline ? styles.error : ''
              }`}
            >
              {charStatus.char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TextDisplay;
