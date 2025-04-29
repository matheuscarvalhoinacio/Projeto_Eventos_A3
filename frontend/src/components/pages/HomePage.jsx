import React from "react";
import styles from "./Home.module.css";
const HomePage = () => {
  return (
    <div className={styles.conteiner_home}>
      <h1>Sobre</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <h1>Como Funciona</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
      </p>
      <span></span>
      <h1>Agende Já</h1>
      <div className={styles.cards}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          officiis aperiam deserunt eius unde reprehenderit, blanditiis enim
          error debitis aliquam omnis quas inventore porro tempora ad minima
          expedita repellendus neque.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
