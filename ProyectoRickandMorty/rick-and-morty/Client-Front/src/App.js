import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Home from './views/Home/Home';
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import './App.css';


function App() {

  const [characters, setCharacters] = useState([])

  const onClose = (id) => {
    const filtro = characters.filter((char) => char.id !== id)
    setCharacters(filtro)
  } 

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  async function login(userData) {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    try {// en el bloque try {...} debe ir la solicitud que se realiza y lo que vamos a hacer con su respuesta si es positiva y contiene lo que requerimos.
      const response = await axios.get(URL, {
        params: { email, password }
      });
      
      const { data } = response;
      const { access } = data;
      
      setAccess(data);
      if (access) {
        navigate('/home');
      }
    } catch (error) {
      // en el catch manejamos las razones/errores del rechazo que pueda tener la solicitud.
      console.error('Error en la solicitud:', error);
    }    
  };  
  

  useEffect(() => {
    !access && navigate('/');   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  async function onSearch(id) {
    try {
      const { data } = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`)      
        if (data.name) {
          // Verificar si el personaje ya está en la lista
          const isCharacterInList = characters.some((char) => char.id === data.id);
          if (!isCharacterInList) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert('¡Este personaje ya está en la lista!');
          }
        } else {
          window.alert('¡No hay personajes con este ID!');
        }
    } catch(error)  {
        if (error.response && error.response.status === 404) {
          window.alert('¡No se encontró el personaje con este ID!');
        } else {
          window.alert('Ocurrió un error al buscar el personaje.');
        }
      };
  }    

  const location = useLocation();

  return (
    <div className='App'>
        
        {
          location.pathname.startsWith('/home') || 
          location.pathname.startsWith('/about') || 
          location.pathname.startsWith('/detail') ||
          location.pathname.startsWith('/favorites') ? (
              <Nav onSearch={onSearch} />
          ) : null
        }

        <Routes>
          
          <Route path='/' element={<Form login={login} />} />

          <Route path="/home" element={<Home characters={characters} onClose={onClose} />} />

          <Route path="/about" element={<About />} />  

          <Route path="/favorites" element={<Favorites onClose={onClose} />} />          

          <Route path="/detail/:id" element={<Detail />} />

        </Routes >
        
    </div>
  );
}


export default App;

