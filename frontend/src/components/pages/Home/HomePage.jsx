import React, { useEffect, useState } from "react";
import api from "../../../util/api";
import styles from "./Home.module.css";
import Icons from "../../layout/icons/Icons";
import Card from "../../layout/card/Card";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    api.get("/report/getRoom").then((response) => {
      setReport(response.data.report);
    });
  }, []);

  return (
    <div className={styles.container_home}>
      <div className={styles.grid_sections}>
        <section className={styles.section}>
          <h1>Sobre</h1>
          <p>
            Lorem Ipsum é simplesmente uma simulação de texto da indústria
            tipográfica e de impressos.
          </p>
        </section>

        <section className={styles.section}>
          <h1>Como Funciona</h1>
          <p>
            Conheça como o sistema funciona para conectar usuários aos
            relatórios disponíveis.
          </p>
        </section>

        <section className={styles.section}>
          <h1>Agende Já</h1>
          <p>
            Faça sua reserva com antecedência e aproveite todas as
            funcionalidades que oferecemos.
          </p>
        </section>
      </div>

      <Icons />

      <section className={styles.card_section}>
        <h2>Oportunidades de Solução no Campo</h2>
        <p className={styles.intro}>
          Estes são desafios reais enfrentados por produtores da região.
          Estudantes e instituições podem contribuir com visitas, pesquisas e
          soluções práticas.
        </p>
        <Card report={report} />
        <div className={styles.btn_container}>
          <Link to="/report" className={styles.btn_veja_mais}>
            Veja mais
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
