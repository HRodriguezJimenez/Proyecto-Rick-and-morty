import Card from "../Card/Card";
import React from "react";
import styles from "./Cards.module.css";

export default function Cards({ characters, onClose }) {
  return (
    <div className={styles.contenedorTarjeta}>
      {characters.map(function ({
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
      }) {
        return (
          <Card
            key={id}
            id={id}
            name={name}
            status={status}
            species={species}
            gender={gender}
            origin={origin.name}
            image={image}
            onClose={() => onClose(id)}
          />
        );
      })}
    </div>
  );
}
