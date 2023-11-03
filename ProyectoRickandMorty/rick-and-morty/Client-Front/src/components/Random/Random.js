import React from "react";
import { connect, useDispatch } from "react-redux";
import { randomCard } from "../../Redux/actions";
import Card from "../Card/Card";
import styles from "./Random.module.css"


function Random ({ randomCharacter, onClose }) {
    const dispatch = useDispatch();

    const handleGetRandom = () => {
        dispatch(randomCard())
    }

    return (
        <div className={styles.divRandom}>
      <h2>Personaje Aleatorio</h2>
      {randomCharacter ? (
        <Card
        key={randomCharacter.id}
        id={randomCharacter.id}
        name={randomCharacter.name}
        status={randomCharacter.status}
        species={randomCharacter.species}
        gender={randomCharacter.gender}
        origin={randomCharacter.origin.name}
        image={randomCharacter.image}   
        onClose={() => onClose()}     
    /> ) : (
        <p>Haz clic en el botón para obtener un personaje aleatorio.</p>
      )}
      <button onClick={handleGetRandom}>Obtener Personaje Aleatorio</button>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        randomCharacter: state.randomCharacter,
    }
}

export default connect(mapStateToProps)(Random);

