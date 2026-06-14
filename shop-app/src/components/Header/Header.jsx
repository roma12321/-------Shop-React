import {Link,useNavigate} from 'react-router-dom'
import styles from './Header.module.css'

function Header(){
    const navigate=useNavigate();
    const cart=JSON.parse(localStorage.getItem("cart"))||[]
    const user=JSON.parse(localStorage.getItem("user"))
    const cartCount=cart.reduce((sum,item)=>sum+item.count,0);
    function logout() {
    localStorage.removeItem("user");
    navigate("/login");
    }
    return(
        <header className={styles.header}>
            <Link to="/catalog" className={styles.logo}>Shop</Link>
            <nav className={styles.nav}>
            <Link to="/catalog" className={styles.bottom}>Каталог</Link>
            <Link to="/cart" className={styles.bottom}>Корзина({cartCount})</Link>
            {user?(
                <>
                <span>{user?.name}</span>
                <button onClick={logout}>Выйти</button>
                </>
            ):(
                <Link to="/login">Войти</Link>
            )}
            </nav>
        </header>
    )
}
export default Header;