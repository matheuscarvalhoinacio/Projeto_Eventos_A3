import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Api from "../../../util/api";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./SolutionDetailPage.module.css";
import {Context} from "../../../context/UserContext";
const SolutionDetailPage = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const { SetStatus } = useContext(Context);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    Api.get(`/Suggestion/GetOneSuggestion/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSolution(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar solução:", error);
      });
  }, [id]);

  const handleStatusUpdate = (status) => {
    SetStatus(id, status)
      .then(() => {
        alert(`Status ${status} aplicado com sucesso`);
        navigate("/myAppointments");
      })
      .catch((error) => {
        console.error("Erro ao atualizar status:", error);
      });
  };

  if (!solution) {
    return (
      <div className={styles.container}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/myAppointments" className={styles.backButton}>
          <FaArrowLeft /> Voltar
        </Link>
      </div>

      <h1>Detalhes da Solução</h1>

      <div className={styles.detailCard}>
        <h2>{solution.title}</h2>
        <p>
          <strong>Descrição:</strong> {solution.description}
        </p>
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

        <div className={styles.buttons}>
          <button
            className={styles.acceptButton}
            onClick={() => handleStatusUpdate("aceito")}
          >
            Aceitar
          </button>
          <button
            className={styles.rejectButton}
            onClick={() => handleStatusUpdate("recusado")}
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailPage;
