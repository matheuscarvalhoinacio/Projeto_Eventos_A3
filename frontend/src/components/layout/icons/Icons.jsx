import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { AiOutlineCalendar } from "react-icons/ai";
import styles from "./Icons.module.css";

const Icons = () => {
  return (
    <div className={styles.container_Icons}>
      <Link to={""} className={styles.card_icons}>
        <FaUserPlus style={{ color: "#F23D5E", fontSize: "100PX" }} />
        <p>Cadastre-se agora</p>
      </Link>
      <Link to={""} className={styles.card_icons}>
        <MdLocationOn style={{ color: "#F23D5E", fontSize: "100PX" }} />
        <p>Encontre plantaçoes</p>
      </Link>
      <Link to={""} className={styles.card_icons}>
        <HiOutlineChatAlt2 style={{ color: "#F23D5E", fontSize: "100PX" }} />
        <p>Troque conhecimento</p>
      </Link>
      <Link to={""} className={styles.card_icons}>
        <AiOutlineCalendar style={{ color: "#F23D5E", fontSize: "100PX" }} />
        <p>Agende uma visita</p>
      </Link>
    </div>
  );
};

export default Icons;
