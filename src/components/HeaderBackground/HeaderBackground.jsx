import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./HeaderBackground.css";

const Header = () => {
  return (
    <header className='header flex flex-center flex-column'>
        <Navbar />
        <div className='container'>
            <div className='header-content text-center flex flex-column'>
                
            </div>
        </div>
    </header>
  )
}

export default Header