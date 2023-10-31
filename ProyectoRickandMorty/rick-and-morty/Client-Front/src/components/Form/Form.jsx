import React, { useEffect, useState } from "react";
import styles from "../Form/form.module.css";
import { validateForm } from "./validation";

function Form({ login }) {
  const [userData, setUserData] = useState({
    // creamos el estado "userData" = { email: "", password: "", }
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    //creamos un estado para manejar los errores en la validación.
    email: "",
    password: "",
  });

  //creamos una función que va a recibir un evento por parametro y va a generar un cambio en el elemento que genere el evento.
  function handleChange(event) {
    const { name, value } = event.target; //accedemos a la información del elemento "html" que genera el evento en este caso esta pendiente de los input con propiedad (name:"email" y name:"password")
    setUserData({
      // modificamos una copia del estado y le agregamos la información recibida.
      ...userData,
      [name]: value,
      // name: "email" ó name: "password" dependiendo de quien reciba el cambio.
    });

    setErrors(validateForm({ ...userData, [name]: value }));
    /*
    + setErrors() = encargada de modificar el estado (errors = { email: "", password: "",})
    
    + validateForm() = función encargada de validar la información recibida del evento ("email" ó "pasword") y retorna un array con los errores que tenga la validación. Recibe por parametros una copia con lo que contenga el (state userData) y el valor que contiene el evento.

    
    */
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(userData);
  }

  useEffect(() => {
    console.log("useEffect", errors);
  }, [errors]);

  return (
    <div className={styles.divForm}>
      <img
        className={styles.imgForm}
        src="https://www.xtrafondos.com/wallpapers/resized/rick-y-morty-como-breaking-bad-5441.jpg?s=large"
        alt=""
      />
      <div className={styles.dataForm}>
        <form onSubmit={handleSubmit}>
          <label className={styles.labelsForm} htmlFor="email">
            EMAIL
          </label>
          <input
            className={styles.inputsForm}
            type="email"
            value={userData.email} // su valor es lo que reciba por por data.
            onChange={handleChange} // cuando se genere un cambio se ejecuta handleChange.
            name="email"
            placeholder="email"
          />

          {errors.email ? <p>{errors.email}</p> : <p>Ingrese Información</p>}

          <label className={styles.labelsForm} htmlFor="password">
            PASSWORD
          </label>
          <input
            className={styles.inputsForm}
            type="password"
            value={userData.password} //su valor es lo que reciba por por data.
            onChange={handleChange} // cuando se genere un cambio se ejecuta handleChange.
            name="password"
            placeholder="password"
          />
          {errors.password ? ( //
            <p>{errors.password}</p>
          ) : (
            <p>Ingrese Información</p>
          )}

          <button type="submit" className={styles.button}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
