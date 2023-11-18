import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './views/Nav/Nav';
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Home from './views/Home/Home';
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import Random from "./components/Random/Random";
import './App.css';


function App() {

  const [characters, setCharacters] = useState([])// creamos el state = characters = [...].

  const onClose = (id) => {// función que hara un filtro en el estado "characters" por el id.
    setCharacters(characters.filter((char) => char.id !== id))    
  } 

  const navigate = useNavigate();// función que nos permite navegar a donde se le indique.
  const [access, setAccess] = useState(false);// estado que vamos a usar para validar el acceso.

  async function login(userData) {// función asincronica para enviar una solicitud para aprobar el ingreso de un usuario.
    const { email, password } = userData;//accedemos a los datos que envian en la solicitud.
    const URL = 'http://localhost:3001/rickandmorty/login/';
    try {//en el bloque try{...} manejamos la respuesta exitosa de la solicitud.
      const response = await axios.get(URL, {// enviamos los datos al servidor.
        params: { email, password }
      });
      
      const { data } = response;// la const "response" contiene la respuesta en una propiedad llamada "data" por eso la destructuramos en la const "data". = data : {access: true}
      const { access } = data;// en la const "data". = data : {access: true} encontramos la propiedad "access: true"
      
      setAccess(access);
      if (access) {// opcional = access && navigate
        navigate('/home');
      }

    } catch (error) {
      // en el catch manejamos las razones/errores del rechazo que pueda tener la solicitud.
      window.alert('Error en la solicitud:', error);
    }    
  };  

  useEffect(() => {
    !access && navigate('/');   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  async function onSearch(id) {// función encargada de buscar un personaje con "id" especifico.
    try {
      const { data } = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`)      
        if (data.id) {
          // Verificar si el personaje ya está en la lista
          const isCharacterInList = characters.some((char) => char.id === data.id);// extraemos SOLO el personaje que conincida con el "id" enviado por parametro.
          if (!isCharacterInList) {
            setCharacters((oldChars) => [...oldChars, data]);//si el personaje NO existe creamos una copia del estado antiguo y anexamos la respuesta del servidor.
          } else {
            window.alert('¡Este personaje ya está en la lista!');
          }
        } else {
          window.alert('¡No hay personajes con este ID!');
        }
    } catch(error) {//manejamos un posible error en la solicitud.
        if (error.response && error.response.status === 404) {
          window.alert('Por favor ingresa un número de ID.');
        } else {
          window.alert('No hay personajes con este ID.');
        }
      };
  }    

  const location = useLocation();//lo usamos para acceder a la ubicación actual y mostrar la ruta.

  return (
    <div className='App'>
        
        {// creamos un renderizado condicional que dependiendo de como comienza el "pathname" de la ruta mostrara o NO la barra de navegación. 
          location.pathname.startsWith('/home') || 
          location.pathname.startsWith('/about') || 
          location.pathname.startsWith('/detail') ||
          location.pathname.startsWith('/randomCharacter') ||
          location.pathname.startsWith('/favorites') ? (
              <Nav onSearch={onSearch} />
          ) : null
        }

        <Routes>
          
          <Route path='/' element={<Form login={login} />} />
          
          <Route path="/home" element={<Home characters={characters} onClose={onClose} />} />

          <Route path="/about" element={<About />} />  

          <Route path="/favorites" element={<Favorites characters={characters} onClose={onClose} />} />          

          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/randomCharacter" element={<Random onClose={onClose} />} />

        </Routes >
        
    </div>
  );
}


export default App;

/*//*En el manejo de las rutas agregamos los "props" que enviaremos a los componentes "hijos" de "App.js"

+ {<Form login={login} />} = enivamos la función "login"

+ {<Home characters={characters} onClose={onClose} />} = enviamos el "state characters" y la función "onclose".

+ {<Favorites onClose={onClose} = enviamos la función "onClose".

*/