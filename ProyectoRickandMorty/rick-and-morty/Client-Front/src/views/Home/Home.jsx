import Cards from "../../components/Cards/Cards";

//Este seria un componente presentacional SOLO RENDERIZA INFORMACIÓN.

function Home({ characters, onClose }) {
  return <Cards characters={characters} onClose={onClose} />; //renderiza las cards y le envia por "props" lo que le eniva su componente Padre "App.js"
}

export default Home;
