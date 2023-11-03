import { connect, useDispatch } from "react-redux";
import React, { useState } from "react";
import { orderCards, filterCards } from "../../Redux/actions";
import Card from "../Card/Card";
import styles from "./Favorites.module.css";

function Favorites(props) {
  const { myFavorites, onClose } = props;
  const dispatch = useDispatch();

  const [aux, setAux] = useState(false);

  const handleOrder = (e) => {
    dispatch(orderCards(e.target.value));
    setAux(!aux);
  };

  const handleFilter = (e) => {
    dispatch(filterCards(e.target.value));
  };

  return (
    <div className={styles.divFavorites}>
      <select className={styles.select} onChange={handleOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Descendente</option>
      </select>
      <select className={styles.select} onChange={handleFilter}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
      <div className={styles.divCards}>
        {myFavorites.map(function ({
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps)(Favorites);
