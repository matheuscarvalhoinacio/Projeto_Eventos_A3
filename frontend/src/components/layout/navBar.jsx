import React, { useContext, } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../../context/UserContext";
import styles from "./navBar.module.css";
import logo from "../../img/logo.png";
function NavBar() {
  const { authenticated, logout } = useContext(Context);
  const location = useLocation();
  const { id } = useParams();

  

  const noBgRoutes = [
    "/login",
    "/register",
    "/report",
    "/createReport",
    "/myAppointments",
    "/profile",
    `/suggestion/${id}`,
    `/solutions/${id}`,
    `/solution/${id}`,
    
  ];

  const headerStyle =
    noBgRoutes.includes(location.pathname) ||
    /^\/details\/[a-zA-Z0-9_-]+$/.test(location.pathname)
      ? { height: "100px" }
      : {
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        };

  return (
    <div className={styles.header} style={headerStyle}>
      <nav className={styles.navBar}>
        <img src="/img/logo.png" alt="LOGO" width={80} />
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/report">Agende Já</Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link to="/myAppointments">Meus Agendamentos</Link>
              </li>
  
              <li>
                <Link to="/createReport">Relatar problema</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li onClick={logout}>Sair</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Cadastrar-se</Link>
              </li>
              <li>
                <Link to="/login">Já possuo conta</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
