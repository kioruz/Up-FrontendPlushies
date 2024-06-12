import React, { useState } from 'react';
import HeaderBackground from '../../components/HeaderBackground/HeaderBackground';
import "../../components/Navbar/Navbar.css";
import "./Login.css";
import Footer from '../../components/Footer/Footer';
import { fetchData } from '../../fetchData';
import { createBrowserRouter, RouterProvider, useNavigate, Link } from "react-router-dom";
import MainPage from '../MainPage/MainPage';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud POST al servidor con los datos de inicio de sesión
    const postData = { email, password };
    setIsLoading(true);

    console.log('Enviando solicitud de inicio de sesión con los siguientes datos:', postData);

    fetchData('http://localhost:8000/auth/login', 'POST', postData)
      .then(response => {
        // Imprimir la respuesta completa del servidor
        console.log('Respuesta completa del servidor:', response);

        // Si la respuesta tiene una propiedad 'key', establecerla como cookie
        if (response) {
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000)); // 24 horas en milisegundos

          const cookieOptions = {
            token: {
              name: 'token',
              value: response,
              expires: expirationDate,
              path: '/',
            },
            email: {
              name: 'email',
              value: email,
              expires: expirationDate,
              path: '/',
            }
          };

          document.cookie = `${cookieOptions.token.name}=${cookieOptions.token.value}; expires=${cookieOptions.token.expires.toUTCString()}; path=${cookieOptions.token.path}`;
          document.cookie = `${cookieOptions.email.name}=${cookieOptions.email.value}; expires=${cookieOptions.email.expires.toUTCString()}; path=${cookieOptions.email.path}`;

          console.log('Cookies establecidas:', document.cookie);

          // Redirigir al usuario a la página principal
          navigate('/');
        } else {
          console.log('No se recibió ninguna key en la respuesta.');
        }

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <HeaderBackground />
      <div className="overlay-content">
        <div>
          <div className='back-login-square'>
            <form onSubmit={handleSubmit}>
              <div className='border-login'>
                <div className='text-login'>Inicio de sesión</div>
              </div>
              <div className='login-back'>
                <div className='border-login-text'>
                  <label htmlFor="email">Email:</label>
                </div>
                <div>
                  <input
                    id="email"
                    className='login-textbox'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='border-login-text'>
                  <label htmlFor="password">Contraseña:</label>
                </div>
                <div>
                  <input
                    id="password"
                    className='login-textbox'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='navbar-btns'>
                  <button type="submit" className='btn-login button' disabled={isLoading}>
                    {isLoading ? 'Procesando...' : 'Iniciar Sesión'}
                  </button>
                </div>
              </div>
            </form>
          </div><div className='navbar-btns'>
            <Link to="/signup" className='btn-signup button' disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Crear cuenta'}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
