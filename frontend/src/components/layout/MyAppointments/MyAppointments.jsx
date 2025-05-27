import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUserCheck } from "react-icons/fa";
import styles from "./MyAppointments.module.css";
import Api from "../../../util/api";

const MyAppointments = () => {
  const [report, setReport] = useState({ getAllUser: [] });
  const [requestsForMe, setRequestsForMe] = useState([]);

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Api.get("/Suggestion/GetSuggestionUset", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setRequestsForMe(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error.response.data);
        });
    }
  }, []);

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
        {!requestsForMe?.getAllUser || requestsForMe.getAllUser.length === 0 ? (
          <p>Você ainda não fez nenhum agendamento.</p>
        ) : (
          <ul className={styles.list}>
            {requestsForMe.getAllUser.map((item) => {
              return item.status === "aceito" ? (
                <Link to={`/result/${item.reportID}` }   className={styles.linkButton} >
                  {" "}
                  <li
                    key={item._id}
                    className={
                      item.status === "aceito"
                        ? styles.cardAccepted
                        : styles.cardSolution
                    }
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p
                      className={
                        item.status === "aceito"
                          ? styles.statusAccepted
                          : styles.status
                      }
                    >
                      {item.status}
                    </p>
                    <p className={styles.date}>
                      Data: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                </Link>
              ) : (
                <li
                  key={item._id}
                  className={
                    item.status === "aceito"
                      ? styles.cardAccepted
                      : styles.cardSolution
                  }
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p
                    className={
                      item.status === "aceito"
                        ? styles.statusAccepted
                        : styles.status
                    }
                  >
                    {item.status}
                  </p>
                  <p className={styles.date}>
                    Data: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;
