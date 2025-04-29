import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/UserContext";
import styles from "./navBar.module.css";

function navBar() {
  const { authenticated, logout } = useContext(Context);
  return (
    <nav className={styles.navBar}>
      <img src="" alt="LOGO" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Entrar</Link>
            </li>
            <li>
              <Link to={"/register"}>Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default navBar;
