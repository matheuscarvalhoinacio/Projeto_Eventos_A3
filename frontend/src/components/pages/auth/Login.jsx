import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Img from "../../../img/logo.png";
import { Context } from "../../../context/UserContext";

const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    login(user);
  }

  return (
    <section className={styles.login_container}>
      <div
        className={styles.container_img}
        style={{ backgroundImage: `url(${Img})` }}
      ></div>

      <div className={styles.conteudo}>
        <h1>Acessar Conta</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              onChange={handleOnChange}
              required
            />
          </div>

          <input type="submit" value="Entrar" className={styles.submitBtn} />
        </form>

        <p className={styles.registerLink}>
          Não tem conta? <Link to="/register">Clique aqui</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
