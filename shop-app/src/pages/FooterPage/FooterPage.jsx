import { Link, useNavigate } from "react-router-dom";
import styles from "./FooterPage.module.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>О компании</h3>
            <ul>
              <li><a href="#">О нас</a></li>
              <li><a href="">Наша миссия</a></li>
              <li><a href="">Команда</a></li>
              <li><a href="">Контакты</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Помощь</h3>
            <ul>
              <li><a href="">Доставка и оплата</a></li>
              <li><a href="">Возврат товара</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Служба поддержки</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Контакты</h3>
            <ul>
              <li>Телефон: +7 (918) 934-80-30</li>
              <li>Email: opppp@you.com</li>
              <li>Адрес: Сормовская 163/1</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
