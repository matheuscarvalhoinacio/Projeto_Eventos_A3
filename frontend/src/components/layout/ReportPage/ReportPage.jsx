import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./ReportPage.module.css";

const ReportPage = () => {
  const { id } = useParams();

  const problem = {
    title: "Street Lighting Issue",
    description:
      "The street has been without lighting for weeks, causing safety concerns...",
    location: "Belo Horizonte",
    neighborhood: "Centro",
    state: "MG",
    latitude: -19.919,
    longitude: -43.9378, 
    user: {
      name: "João Silva",
      phone: "31999999999",
    },
    createdAt: "2025-05-05T14:19:23.664Z",
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          <FaArrowLeft /> Back
        </Link>
      </div>
      <h1 className={styles.title}>{problem.title}</h1>
      <div className={styles.content}>
        <p className={styles.description}>{problem.description}</p>

        <div className={styles.info}>
          <p>
            <FaUser className={styles.icon} />
            <strong>Reported by:</strong> {problem.user.name} -{" "}
            {problem.user.phone}
          </p>

          <p>
            <small>
              <strong>Reported on:</strong>{" "}
              {new Date(problem.createdAt).toLocaleDateString()}
            </small>
          </p>
          <p>
            <FaMapMarkerAlt className={styles.icon} />
            <strong>Location:</strong> {problem.location},{" "}
            {problem.neighborhood}, {problem.state}
          </p>

          <div className={styles.mapContainer}>
            <LoadScript googleMapsApiKey="AIzaSyAH4SkahODaBX2UuktU4rXl1D_SYZBA3Hc">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={{ lat: problem.latitude, lng: problem.longitude }}
                zoom={14}
              >
                <Marker
                  position={{ lat: problem.latitude, lng: problem.longitude }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
       <div className={styles.header}>
          <Link to="/" className={styles.backButton}>
            <FaArrowLeft /> Back
          </Link>

          <Link  to={`/suggestion/${id}`} className={styles.suggestionButton}>
            Fazer uma Sugestão
          </Link>
        </div>
    </section>
  );
};

export default ReportPage;
