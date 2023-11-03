import SearchBar from "../../components/Search/SearchBar";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav({ onSearch }) {
  return (
    <div className={styles.divNav}>
      <Link to="/home">
        <button className={styles.linkNav}>Inicio</button>
      </Link>

      <Link to="/about">
        <button className={styles.linkNav}>About:</button>
      </Link>

      <Link to="/favorites">
        <button className={styles.linkNav}>Favorites</button>
      </Link>

      <Link to="/randomCharacter">
        <button className={styles.linkNav}>Personaje aleatorio</button>
      </Link>

      <SearchBar onSearch={onSearch} />
    </div>
  );
}
