import Cards from "../../components/Cards/Cards";

function Home({ characters, onClose }) {
  return <Cards characters={characters} onClose={onClose} />;
}

export default Home;
