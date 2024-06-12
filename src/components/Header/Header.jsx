import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Header.css";
import { RiBearSmileFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

// Función para obtener el valor de una cookie por su nombre
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};

const Header = () => {
    const isLoggedIn = !!getCookie('token'); // Verifica si el usuario está autenticado

    const createYourOwnLink = isLoggedIn ? "/create" : "/login"; // URL dependiendo del estado de autenticación

    return (
        <header className='header flex flex-center flex-column'>
            <Navbar />
            <div className='container'>
                <div className='header-content text-center flex flex-column'>
                    <h1 className='text-uppercase header-title'>Peluches</h1>
                    <h1 className='text-uppercase header-sudtitle'>personalizados</h1>
                    <p className='text-lead'>¡Dale vida a tus sueños con nuestros peluches personalizados! Un regalo perfecto para cada ocasión.</p>
                    <Link to={createYourOwnLink} className='btn header-btn btn-blue'>
                        <RiBearSmileFill /> <span>crea el tuyo</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
