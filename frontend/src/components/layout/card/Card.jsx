import React  from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { FiMapPin, FiUser, FiPhone } from "react-icons/fi";

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Card = ({ report }) => {
  const data = Array.isArray(report)
    ? report
    : Array.isArray(report?.cep)
    ? report.cep
    : [];

  if (data.length === 0) {
    return <p style={{ textAlign: "center", padding: "1em" }}>Nenhum resultado encontrado.</p>;
  }

  return (
    <section className={style.container}>
      <div className={style.card_container}>
        {data.map((item) => (
          <div key={item._id} className={style.card}>
            <h3>{item.title}</h3>
            <p>{truncateText(item.description, 100)}</p>
            <p>
              <FiMapPin /> {item.address.localidade}, {item.address.bairro}, {item.address.uf}
            </p>
            <p>
              <FiUser /> {item.user?.name} <br />
              <FiPhone /> {item.user?.phone}
            </p>
            <Link to={`/details/${item._id}`} className={style.button}>
              Leia mais
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;
