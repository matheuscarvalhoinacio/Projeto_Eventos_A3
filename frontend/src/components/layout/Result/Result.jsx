import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./ReportPage.module.css";
import api from "../../../util/api";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Result = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    api.get(`/report/getReport/${id}`).then((response) => {
      setReport(response.data.report);
    });
  }, [id]);


  useEffect(() => {
    if (report) {
      const { bairro, localidade, uf } = report.address;
      const address = [localidade, uf, bairro]
        .filter((part) => part && part.trim() !== "")
        .join(", ");

      const fetchCoordinates = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              address
            )}`
          );
          const data = await response.json();

          if (data.length > 0) {
            const location = {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            };
            setCoordinates(location);
          } else {
            console.error("Endereço não encontrado na API.");
          }
        } catch (error) {
          console.error("Erro ao buscar coordenadas:", error);
        }
      };

      fetchCoordinates();
    }
  }, [report]);

  if (!report) {
    return <p>Carregando dados...</p>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>
          <FaArrowLeft /> Voltar
        </Link>
      </div>

      <h1 className={styles.title}>{report.title}</h1>

      <div className={styles.content}>
        <p className={styles.description}>{report.description}</p>

        <div className={styles.info}>
          <p>
            <FaUser className={styles.icon} />
            <strong>Reportado por:</strong> {report.user.name} - {" "} {report.user.phone}
          </p>
          <p>
            <small>
              <strong>Data:</strong>{" "}
              {new Date(report.createdAt).toLocaleDateString()}
            </small>
          </p>
          <p>
            <FaMapMarkerAlt className={styles.icon} />
            <strong>Localização:</strong> {report.address.logradouro},{" "}
            {report.address.bairro}, {report.address.localidade} -{" "}
            {report.address.uf}
          </p>
          <div className={styles.mapContainer}>
            {coordinates ? (
              <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={16}
                style={{ width: "100%", height: "400px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>Localização do problema</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Carregando mapa...</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.header}>

        <Link to={`/suggestion/${id}`} className={styles.suggestionButton}>
          Fazer uma Sugestão
        </Link>
      </div>
    </section>
  );
};

export default Result;
