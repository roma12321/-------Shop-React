    import { Link, useNavigate } from 'react-router-dom';
    import styles from './Footer.module.css';

    function Footer() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <footer className={styles.footer}>
        <div className={styles.info}>
            <p>&copy; 2024 Shop. Все права защищены.</p>
            <p>Мы делаем покупки простыми и удобными.</p>
        </div>
        <nav className={styles.links}>
            <Link to="/catalog" className={styles.link}>Каталог</Link>
            <Link to="/about" className={styles.link}>О нас</Link>
            <Link to="/contacts" className={styles.link}>Контакты</Link>
        </nav>
        <div className={styles.social}>
            <a href="#" className={styles.socialLink}>Telegram</a>
            <a href="#" className={styles.socialLink}>VK</a>
        </div>
        </footer>
    );
    }

    export default Footer;
