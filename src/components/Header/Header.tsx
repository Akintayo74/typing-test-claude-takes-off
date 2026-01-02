import styles from './Header.module.css';
import logoIcon from '../../assets/images/logo-small.svg';
import trophyIcon from '../../assets/images/icon-personal-best.svg';

interface HeaderProps {
  personalBest?: number;
}

function Header({ personalBest }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={logoIcon}
          alt="Typing Speed Test"
          className={styles.logoIcon}
        />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Typing Speed Test</h1>
          <p className={styles.subtitle}>Type as fast as you can in 60 seconds</p>
        </div>
      </div>

      {personalBest !== undefined && (
        <div className={styles.personalBest}>
          <img
            src={trophyIcon}
            alt=""
            className={styles.trophyIcon}
          />
          <p className={styles.personalBestText}>
            <span className={styles.labelMobile}>Best: </span>
            <span className={styles.labelTablet}>Personal best: </span>
            <span className={styles.value}>{personalBest} WPM</span>
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
