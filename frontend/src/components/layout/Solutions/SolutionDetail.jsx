import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Api from "../../../util/api";
import styles from "./SolutionDetail.module.css";

const SolutionDetail = () => {
  const { id } = useParams();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Api.get(`/Suggestion/GetSuggestion/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setSolutions(response.data);
      console.log(response.data);
    });
  }, [id]);

  if (!solutions.length) {
    return (
      <div className={styles.container}>
        <p>Carregando ou nenhuma solução encontrada...</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/myAppointments" className={styles.backButton}>
          <FaArrowLeft /> Meus Agendamentos
        </Link>
      </div>

      <h1>Detalhes das Soluções</h1>

      <div className={styles.section}>
        <h2>
          <FaCheckCircle /> Lista de Soluções
        </h2>

        {solutions.map((solution) => (
          <Link
            to={`/solution/${solution._id}`}
            key={solution._id}
            className={styles.card}
          >
            <h3>{solution.title}</h3>
            <p>
              <strong>Enviado por:</strong> {solution.user?.name} -{" "}
              {solution.user?.phone}
            </p>
            <p>
              <strong>Status:</strong> {solution.status}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(solution.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link to="/myAppointments" className={styles.button}>
          Ir para Meus Agendamentos
        </Link>
      </div>
    </section>
  );
};

export default SolutionDetail;
