import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { IoMdRocket } from "react-icons/io";

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

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('token'));
    const [email, setEmail] = useState(getCookie('email') || '');

    useEffect(() => {
        setIsLoggedIn(!!getCookie('token'));
        setEmail(getCookie('email') || '');
    }, []);

    const handleLogout = () => {
        // Eliminar las cookies 'token' y 'email'
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        setIsLoggedIn(false);
        navigate('/'); // Redirigir a la página de inicio u otra página
        window.location.reload(); // Forzar la recarga de la página
    };

    const handleLinkClick = (path) => {
        if (!isLoggedIn) {
            navigate('/login');
            window.location.reload();
        } else {
            navigate(path);
        }
    };

    const [navToggle, setNavToggle] = useState(false);
    const navHandler = () => {
        setNavToggle(prevData => !prevData);
    };

    return (
        <nav className='navbar w-100 flex'>
            <div className='containerNavbar w-100'>
                <div className='navbar-content flex fw-7'>
                    <div className='brand-and-toggler flex flex-between w-100 navbar-left'>
                        <Link to="/" className='navbar-brand fs-26'>Plushies</Link>
                        <div type="button" className={`hamburger-menu ${navToggle ? 'hamburger-menu-change' : ""}`} onClick={navHandler}>
                            <div className='bar-top'></div>
                            <div className='bar-middle'></div>
                            <div className='bar-bottom'></div>
                        </div>
                    </div>

                    <div className={`navbar-collapse ${navToggle ? 'show-navbar-collapse' : ""}`}>
                        <div className='navbar-collapse-content navbar-right'>
                            <ul className='navbar-nav'>
                                <li className='text-white'>
                                    <Link to="/Ranking">Ranking</Link>
                                </li>
                                <li className='text-white'>
                                    <a href="#!" onClick={() => handleLinkClick('/Listall')}>Creados</a>
                                </li>
                                <li className='text-white'>
                                    <a href="#!" onClick={() => handleLinkClick('/Myplushies')}>Tus peluches</a>
                                </li>
                                
                                <li className='text-white'>{email}</li> 
                            
                            </ul>

                            <div className='navbar-btns'>
                                {isLoggedIn ? (
                                    <button type="button" className='btn' onClick={handleLogout}>
                                        Log out
                                    </button>
                                ) : (
                                    <button type="button" className='btn'>
                                        <Link to="/login">Log in</Link>
                                    </button>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
