import { connect, useDispatch } from "react-redux";
import React, { useState } from "react";
import { orderCards, filterCards } from "../../Redux/actions";
import Card from "../Card/Card";
import styles from "./Favorites.module.css";

function Favorites({ myFavorites }) {
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
      {myFavorites.map(({ id, name, image, gender }) => (
        <Card key={id} id={id} name={name} image={image} gender={gender} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps)(Favorites);
