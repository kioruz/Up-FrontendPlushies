import React, { useState } from 'react';
import HeaderBackground from '../../components/HeaderBackground/HeaderBackground';
import "../../components/Navbar/Navbar.css";
import "./Signup.css";
import Footer from '../../components/Footer/Footer';
import { fetchDataasync } from '../../fetchData';
import { useNavigate } from "react-router-dom";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const validateEmail = (email) => {
 return regex.test(email);
}

const Signup = () => {
  const [name, setNombre] = useState('');
  const [lastname, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [responseData, setResponseData] = useState(null); // Nuevo estado para almacenar la respuesta
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para manejar el mensaje de error
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Verificar que los campos estén llenos
    if (!name || !lastname || !password) {
      setErrorMessage('Tiene que completar los datos');
      return;
    }
  
    // Verificar si el email es válido
    if (!email || typeof email !== 'string') {
      setErrorMessage('El email ingresado no es válido');
      return;
    }
  
    if (!validateEmail(email)) {
      setErrorMessage('El email ingresado no es válido');
      return;
    }
  
    // Resto del código...

  
    console.log("email afuera")
    // Si los campos están llenos y el email es válido, enviar la solicitud
    traerdatos();
  };

  const traerdatos = async () => {
    try {
      const postData = { name, lastname, email, password };
      setIsLoading(true);
      console.log('Enviando solicitud de registro con los siguientes datos:', postData);
      const data = await fetchDataasync('http://localhost:8000/users', 'POST', postData);
      console.log('Data del servidor', data);

      if (data === "El usuario ya existe") {
        setErrorMessage(data);
        setIsSuccessful(false);
      } else {
        setResponseData(data); // Almacenar la respuesta en el estado
        setIsSuccessful(true); // Mostrar mensaje de éxito
        setErrorMessage(''); // Limpiar el mensaje de error
      }
    } catch (error) {
      console.error('Error fetching ', error);
      setErrorMessage('Error en el registro. Inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeOverlay = () => {
    setIsSuccessful(false);
    setResponseData(null);
  };


  return (
    <div>
      <HeaderBackground />
      <div className="overlay-content">
        {isSuccessful ? (
          <div className='success-message text-dark'>
            <div>
              {responseData && (
                <div>
                  {/* Renderizar la data aquí */}
                  <h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                  </h2>
                </div>
              )}
            </div>
            <button onClick={() => navigate('/')}>Ir a la página principal</button>
          </div>
        ) : (
          <div className='back-Signup-square'>
            <form onSubmit={handleSubmit}>
              <div className='border-Signup'></div>
              <div className='text-Signup'>Crear cuenta</div>
              <div className='Signup-back'>
                <div className='border-Signup-text'>
                  <label htmlFor="nombre">Nombre:</label>
                </div>
                <div>
                  <input
                    id="nombre"
                    className='Signup-textbox'
                    type="text"
                    value={name}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className='border-Signup-text'>
                  <label htmlFor="apellido">Apellido:</label>
                </div>
                <div>
                  <input
                    id="apellido"
                    className='Signup-textbox'
                    type="text"
                    value={lastname}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className='border-Signup-text'>
                  <label htmlFor="email">Email:</label>
                </div>
                <div>
                  <input
                    id="text"
                    className='Signup-textbox'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='border-Signup-text'>
                  <label htmlFor="password">Contraseña:</label>
                </div>
                <div>
                  <input
                    id="password"
                    className='Signup-textbox'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <div className='error-message'>{errorMessage}</div>
                )}
                <div className='navbar-btns'>
                  <button type="submit" className='btn-signup button' disabled={isLoading}>
                    {isLoading ? 'Procesando...' : 'Registrarse'}
                  </button>
                </div>
              </div>
             
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
