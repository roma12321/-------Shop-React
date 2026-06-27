import { Link } from 'react-router-dom';
import styles from './FooterPage.module.css';

function FooterPage() {
  const getCart = () => {
    const cartStr = localStorage.getItem('cart');
    if (!cartStr) return [];
    try {
      const cart = JSON.parse(cartStr);
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  };

  const cart = getCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <Link to="/catalog" className={styles.logo}>
              Shop
            </Link>
            
          </div>

          <nav className={styles.navCol}>
            <h4 className={styles.navTitle}>Магазин</h4>
            <ul className={styles.navList}>
              <li>
                <Link to="/catalog" className={styles.navLink}>Каталог</Link>
              </li>
              <li>
                <Link to="/cart" className={styles.navLink}>
                  Корзина {cartCount > 0 && `(${cartCount})`}
                </Link>
              </li>
            </ul>
          </nav>

          <nav className={styles.contactCol}>
            <h4 className={styles.navTitle}>Контакты</h4>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:support@shop.com" className={styles.contactLink}>
                  support@shop.com
                </a>
              </li>
              <li>
                <a href="tel:+78005553535" className={styles.contactLink}>
                  8 (800) 555-35-35
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Shop.
          </p>
          <div className={styles.legalBlock}>
            <Link to="/terms" className={styles.legalLink}>
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;
 