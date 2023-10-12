import React, { useEffect, useState } from "react";
import styles from "../Form/form.module.css";
import { validateForm } from "./validation";

function Form({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    setErrors(validateForm({ ...userData, [name]: value }));
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
            value={userData.email}
            onChange={handleChange}
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
            value={userData.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
          />
          {errors.password ? (
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
