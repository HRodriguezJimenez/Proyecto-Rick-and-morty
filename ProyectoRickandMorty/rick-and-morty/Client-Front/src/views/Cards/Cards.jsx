import Card from "../../components/Card/Card";
import React from "react";
import styles from "./Cards.module.css";

export default function Cards({ characters, onClose }) {
  //lo que envia por props el componente padre Home.js.
  return (
    <div className={styles.contenedorTarjeta}>
      {characters.map(function ({
        //realizamos un mapeo del contenido del "prop" characters.
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
      }) {
        return (
          //renderizamos el componente Card con lo que recibimos en "characters"
          <Card
            key={id}
            id={id}
            name={name}
            status={status}
            species={species}
            gender={gender}
            origin={origin}
            image={image}
            onClose={onClose} //enviamos por props la función onClose(id) para que elimine un una card de un personaje por su id.
          />
        );
      })}
    </div>
  );
}
