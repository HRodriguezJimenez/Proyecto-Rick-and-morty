import React from "react";
import styles from "../About/About.module.css"



function About() {
    return (
      <div className={styles.divAbout}>
        <header className={styles.header}>
          <h1>Universo Rick and Morty.</h1>
          <h2>Creado por Harold Rodriguez.</h2>
        </header> 

        <div className={styles.divImg}>
          <img className={styles.img} src="https://blog.educacionit.com/wp-content/uploads/2019/04/blog-educacionit-17.jpg" alt="Aqui va una imagen" />
        </div>

        <section className={styles.section}>
          <p>¡Hola! Mi nombre es Harold y esta es mi primera experiencia en la creación de una página web. Como estudiante apasionado por la tecnología y el desarrollo web, decidí aventurarme en el emocionante mundo de la programación web con React.</p>
          <p>Este proyecto es el resultado de mi aprendizaje y dedicación para comprender las complejidades del desarrollo web en el BootCamp Henry. A través de esta página, espero compartir mi progreso, conocimientos y experiencias mientras construyo y mejoro mis habilidades en React y diseño web.</p>
        </section>
      </div>
    )
}

export default About;