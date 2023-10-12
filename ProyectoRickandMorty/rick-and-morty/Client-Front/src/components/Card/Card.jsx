import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../Redux/actions";

function Card({
  id,
  name,
  image,
  onClose,
  gender,
  addFav,
  removeFav,
  myFavorites,
}) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites, id]);

  function handleFavorite() {
    if (!isFav) {
      setIsFav(true);
      addFav({ id, name, image, onClose, gender });
    }

    if (isFav) {
      setIsFav(false);
      removeFav(id);
    }
  }

  return (
    <div id={id} key={id} className={styles.divCard}>
      {isFav ? (
        <button className={styles.corazon} onClick={handleFavorite}>
          ❤️
        </button>
      ) : (
        <button className={styles.corazon} onClick={handleFavorite}>
          🤍
        </button>
      )}

      {isFav ? null : (
        <button className={styles.botonCard} onClick={() => onClose(id)}>
          X
        </button>
      )}

      <Link to={`/detail/${id}`}>
        <img className={styles.imgCard} src={image} alt="Not found" />
      </Link>

      <Link className={styles.linkCard} to={`/detail/${id}`}>
        <h1>{name}</h1>
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },

    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

/*
.divData {
  box-shadow: 10px 10px 10px rgb(8, 92, 5); 
  border: black;
}

<div className={styles.divData}>
  <h2>{status}</h2>
  <h2>{species}</h2>
  <h2>{gender}</h2>
  <h2>{origin}</h2>
</div>
*/
