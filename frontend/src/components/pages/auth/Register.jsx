import Input from "../../form/Input";
import { Link } from "react-router-dom";
import styles from "../../form/Form.module.css";
import { useContext, useState } from "react";
import Select from '../../form/Select'
//context
import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);
  const tipo = ["aluno", "professor", "faculdade", "produtor rural"];


  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handlTipo(e ) {
    setUser({ ...user, tipo: e.target.options[e.target.selectedIndex].text });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // enviar o usuario para o banco
    register(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
        />
        <Select
        name={"color"}
        text="selecione a cor"
        options={tipo}
        handleOnChange={handlTipo}
      />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </section>
  );
}

export default Register;