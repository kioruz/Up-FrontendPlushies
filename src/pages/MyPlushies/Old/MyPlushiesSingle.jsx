import React, { useState } from 'react';
import "./MyPlushies.css";

const MyPlushiesSingle = ({ service }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
 const foto = service.AnimalNombre  + "-plushies"
  return (
    <div 
      className={`item translate-effect text-black pushies-square ${isClicked ? 'clicked' : foto}`}
      onClick={handleClick}
    >
      
      <p className={`item-title text-white text-image-plushies ${isClicked ? 'visible' : 'invisible'}`}>
        <p>Color: {service.ColorNombre}</p>
        <p>Accesorio: {service.AccNombre}</p>
        <p>Creados: {new Date(service.createdAt).toLocaleDateString()}</p>
      </p>
    </div>
  );
}

export default MyPlushiesSingle;
