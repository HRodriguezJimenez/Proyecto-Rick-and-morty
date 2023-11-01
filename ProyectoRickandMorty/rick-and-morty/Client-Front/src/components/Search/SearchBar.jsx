import { useState } from "react";
import styles from "./Search.module.css";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    //esta función se EJECUTA al cambiar el elemento al cual se le asigna.
    const { value } = event.target; //la respuesta del elemento que genero el CAMBIO.
    if (!isNaN(value)) {
      //si lo que recibimos es un número cambiamos el valor del state = id: value
      setId(value);
    } else {
      alert("Por favor ingresar soló números.");
    }
  };

  const limpiarInput = (event) => {
    //Esta función se llama cuando se hace click en un boton que esta anclado a un input.
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario, detiene el envio hasta que se ejecuten las siguientes lineas de código.
    onSearch(id); // Llamar a la función de búsqueda con el valor del input
    setId(""); // Limpiar el input
  };

  const pushEnter = (event) => {
    // esta fución se ejecuta cuando se ejecuta una tecla.
    if (event.key === "Enter") {
      // si la tecla que genero el evento es "Enter".
      event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla "Enter", lo detiene y permite ejecutar lo siguiente.
      limpiarInput(event); // Enviamos el formulario y limpiamos el input.
    }
  };

  return (
    <div className={styles.divSearch}>
      <label className={styles.labelSearch} htmlFor="nombre">
        id
      </label>
      <input
        className={styles.inputSearch}
        type="search"
        id="nombre"
        name="nombre"
        value={id}
        onChange={(e) => handleChange(e)}
        onKeyDown={pushEnter} //es un controlador de eventos que se activa cuando se presiona una tecla en el teclado.
        placeholder="Ingresa un ID"
      />
      <button className={styles.botonSearch} onClick={() => onSearch(id)}>
        Agregar
      </button>
    </div>
  );
}
