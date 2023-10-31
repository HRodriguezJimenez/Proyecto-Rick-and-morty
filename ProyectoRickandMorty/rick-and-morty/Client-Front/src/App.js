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

  const onClose = (id) => {// función que hara un filtro en el estado "characters" por el id.
    const filtro = characters.filter((char) => char.id !== id)
    setCharacters(filtro)
  } 

  const navigate = useNavigate();// función que nos permite navegar a donde se le indique.
  const [access, setAccess] = useState(false);// estado que vamos a usar para validar el acceso.

  async function login(userData) {// función asincronica para enviar una solicitud para aprobar el ingreso de un usuario.
    const { email, password } = userData;//accedemos a los datos de la solicitud.
    const URL = 'http://localhost:3001/rickandmorty/login/';
    try {//en el bloque try{...} manejamos la respuesta exitosa de la solicitud.
      const response = await axios.get(URL, {
        params: { email, password }
      });
      
      const { data } = response;
      const { access } = data;
      
      setAccess(data);
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
        if (data.name) {
          // Verificar si el personaje ya está en la lista
          const isCharacterInList = characters.some((char) => char.id === data.id);// extraemos SOLO el personaje que conincida con el "id" enviado por parametro.
          if (!isCharacterInList) {
            setCharacters((oldChars) => [...oldChars, data]);//si el personaje NO existe creamos una copia del estado antiguo y anexamos el resultado de la busqueda.
          } else {
            window.alert('¡Este personaje ya está en la lista!');
          }
        } else {
          window.alert('¡No hay personajes con este ID!');
        }
    } catch(error) {//manejamos un posible error en la solicitud.
        if (error.response && error.response.status === 404) {
          window.alert('¡No se encontró el personaje con este ID!');
        } else {
          window.alert('Ocurrió un error al buscar el personaje.');
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

/*//*En el manejo de las rutas agregamos los "props" que enviaremos a los componentes "hijos" de "App.js"

+ {<Form login={login} />} = enivamos la función "login"

+ {<Home characters={characters} onClose={onClose} />} = enviamos el "state characters" y la función "onclose".

+ {<Favorites onClose={onClose} = enviamos la función "onClose".

*/