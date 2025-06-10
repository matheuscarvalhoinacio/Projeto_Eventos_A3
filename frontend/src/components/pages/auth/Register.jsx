import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  const tipos = ["Aluno", "Professor", "Faculdade", "Produtor Rural"];

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleTipo(e) {
    const selected = e.target.value;
    setUser({ ...user, tipo: selected });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(user);

  }

  return (
    <section className={styles.register_container}>
      <div className={styles.card}>
        <h1>Crie sua Conta</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="(XX) XXXXX-XXXX"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@email.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Crie uma senha forte"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmpassword">Confirme a senha</label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Digite a senha novamente"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="tipo">Você é:</label>
            <select name="tipo" id="tipo" onChange={handleTipo} required>
              <option value="">Selecione uma opção</option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Cadastrar
          </button>
        </form>
        <p className={styles.footerText}>
          Já tem conta? <Link to="/login">Clique aqui</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
