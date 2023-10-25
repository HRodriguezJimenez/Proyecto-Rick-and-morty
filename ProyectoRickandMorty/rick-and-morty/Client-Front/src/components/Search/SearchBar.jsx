import "./Search.css";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setId(value);
    } else {
      alert("Por favor ingresar soló números.");
    }
  };

  const limpiarInput = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    onSearch(id); // Llamar a la función de búsqueda con el valor del input
    setId(""); // Limpiar el input
  };

  const pushEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla "Enter"
      limpiarInput(event); // Enviar el formulario
    }
  };

  return (
    <div className="divSearch">
      <label className="labelSearch" htmlFor="nombre">
        id
      </label>
      <input
        className="inputSearch"
        type="search"
        id="nombre"
        name="nombre"
        value={id}
        onChange={(e) => handleChange(e)}
        onKeyDown={pushEnter}
      />
      <button className="botonSearch" onClick={() => onSearch(id)}>
        Agregar
      </button>
    </div>
  );
}
