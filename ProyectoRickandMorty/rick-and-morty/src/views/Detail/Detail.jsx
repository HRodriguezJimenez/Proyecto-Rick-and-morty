import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Detail/Detail.module.css";

function Detail() {
  const { id } = useParams();

  const [imgOculta, setOcultar] = useState(false);

  const [divOculto, setdivOculto] = useState(false);

  function desaparecer() {
    setOcultar(true);
    setdivOculto(true);
  }

  function aparecer() {
    setOcultar(false);
    setdivOculto(false);
  }

  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={styles.divDetail}>
      {character.image && (
        <img
          className={`${styles.imgDetail} ${imgOculta ? styles.oculto : ""}`}
          src={character.image}
          alt={character.name}
          onMouseOver={desaparecer} //*
          onMouseOut={aparecer} //*
        />
      )}
      <ul
        className={`${styles.divDatos} ${divOculto ? styles.oculto : ""}`}
        onMouseOver={desaparecer}
        onMouseOut={aparecer}
      >
        <h3 className={styles.h3Detail}>Información</h3>
        {character.name && <li>Name: {character.name}</li>}
        {character.status && <li>Status: {character.status}</li>}
        {character.species && <li>Species: {character.species}</li>}
        {character.gender && <li>Gender: {character.gender}</li>}
        {character.origin && character.origin.name && (
          <li>Origin: {character.origin.name}</li>
        )}
      </ul>
    </div>
  );
}

export default Detail;
