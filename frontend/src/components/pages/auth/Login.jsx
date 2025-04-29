import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Input from "../../form/Input";
import styles from "./Login.module.css";
import Img from "../../../img/login.png";
import { Context } from "../../../context/UserContext";

const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(user)
    login(user)
  }
  return (
    <section className={styles.login_container}>
      <span
        className={styles.container_img}
        style={{ backgroundImage: `url(${Img})` }}
      ></span>
      <div className={styles.conteudo}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            handleOnChange={handleOnChange}

          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            handleOnChange={handleOnChange}

          />

          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link>CLIQUE AQUI </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
