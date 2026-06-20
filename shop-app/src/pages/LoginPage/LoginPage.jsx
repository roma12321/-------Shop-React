import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, registerUset } from "../../api/usersApi";
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleRegister(event) {
    event.preventDefault();
    const users = await getUsers();
    const foundUser = users.find((user) =>
      user.password === password && user.email === email
    );
    if (!foundUser) {
      alert("Пароль не тот или почта");
      return;
    }
    localStorage.setItem("user", JSON.stringify(foundUser));
    await registerUset(foundUser);
    alert("Вход выполнен");
    navigate("/catalog");
  }
  return (
    <div className={styles.container}>
      <h1>Авторизация</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Введите почту"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">
          Войти
        </button>
        <p>Нету аккаунта?<Link to="/regist">Зарегистрируйся</Link></p>
      </form>
    </div>
  );
}
export default LoginPage;