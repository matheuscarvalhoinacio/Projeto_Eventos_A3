import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUserCheck } from "react-icons/fa";
import styles from "./MyAppointments.module.css";
import Api from "../../../util/api";

const MyAppointments = () => {
  const [report, setReport] = useState({ getAllUser: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.get("/report/AllUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setReport(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error.response.data);
        });
    }
  }, []);

  const requestsForMe = [
    {
      id: 1,
      title: "Manutenção de Computador",
      requester: "Ana Souza",
      date: "2025-05-11",
      confirmed: false,
    },
    {
      id: 2,
      title: "Aula de Matemática",
      requester: "Carlos Lima",
      date: "2025-05-13",
      confirmed: false,
    },
  ];

  const handleConfirm = (id) => {
    alert(`Agendamento ${id} confirmado!`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          <FaArrowLeft /> Voltar
        </Link>
      </div>

      <h1>Meus Agendamentos</h1>
      <div className={styles.section}>
        <h2>
          <FaCalendarAlt /> MEU PROBLEMA
        </h2>
        {!report?.getAllUser || report.getAllUser.length === 0 ? (
          <p>Você ainda não fez nenhum agendamento.</p>
        ) : (
          <ul className={styles.list}>
            {report.getAllUser.map((item) => (
              <li key={item._id} className={styles.card}>
                <Link
                  to={`/solutions/${item._id}`}
                  className={styles.linkButton}
                >
                  <h3>{item.title}</h3>
                  <p>Data: {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className={styles.buttonText}>Ver Soluções</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.section}>
        <h2>
          <FaUserCheck /> Soluções que eu enviei
        </h2>
        {requestsForMe.length === 0 ? (
          <p>Você ainda não enviou nenhuma solução.</p>
        ) : (
          <ul className={styles.list}>
            {requestsForMe.map((item) => (
              <li key={item.id} className={styles.card}>
                <h3>{item.title}</h3>
                <p>Para: {item.requester}</p>
                <p>Data: {item.date}</p>
                <button
                  className={styles.confirmButton}
                  onClick={() => handleConfirm(item.id)}
                >
                  Confirmar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;
