import React, { useState, useContext } from "react";
import { Context } from "../../../context/UserContext";
import styles from "./Search.module.css";
import Card from "../card/Card";

function Search() {
  const [location, setLocation] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { search, report, CardSearch } = useContext(Context);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert("Digite uma cidade, bairro ou CEP");
      return;
    }
    await search(location);
    setShowSearch(true);
  };

  const handleClear = () => {
    setShowSearch(false);
    setLocation("");
  };

  return (
    <section className={styles.search_container}>
      <div className={styles.search_box}>
        <h1>Buscar Problemas por Região</h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input
            type="search"
            placeholder="Digite a cidade, bairro ou CEP"
            name="info"
            value={location}
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
        {showSearch && <button onClick={handleClear}>LIMPA</button>}
      </div>

      <div className={styles.result_area}>
        <h2>Resultados Encontrados</h2>
        <Card report={showSearch ? CardSearch : report} />
      </div>
    </section>
  );
}

export default Search;
