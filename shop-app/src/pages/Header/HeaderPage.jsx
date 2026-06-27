import { Link, useNavigate } from 'react-router-dom';
import styles from './HeaderPage.module.css';

function HeaderPage() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  function logout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <header className={styles.header}>
      <Link to="/catalog" className={styles.logo}>
        Shop
      </Link>

      <nav className={styles.nav}>
        <Link to="/catalog" className={styles.navLink}>
          Каталог
        </Link>

        <Link to="/cart" className={styles.navLink}>
          Корзина {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>

        {user ? (
          <div className={styles.userBlock}>
            <span className={styles.userName}>{user?.name}</span>
            <button type="button" onClick={logout} className={styles.logoutBtn}>
              Выйти
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            Войти
          </Link>
        )}
      </nav>
    </header>
  );
}

export default HeaderPage;
