import React from 'react';
import "./Services.css";
const SingleService = ({service,contador }) => {
  return (
    
    <div>
<h4 className=' fs-25 text-white'>Rank {contador} </h4>
<h4 className=' fs-25 text-white'>{service.animal}</h4>
    <div className={`item bg-dark translate-effect text-black ${service.animal}`}>
    </div>
    <p className=' fs-25 text-white'>Creados: {service.ventas}</p>
    </div>
  )
}

export default SingleService