import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Мой блог</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Главная</Link>
          <Link to="/create" className={styles.link}>Пост</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;