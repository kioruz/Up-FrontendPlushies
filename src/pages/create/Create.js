import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeaderBackground from '../../components/HeaderBackground/HeaderBackground';
import Footer from '../../components/Footer/Footer';
import './Create.css'; // Importar el archivo CSS
import { fetchData } from '../../fetchData'; // Importar fetchData

function Create() {
  const [options, setOptions] = useState({
    dropdown1: [],
    dropdown2: [],
    dropdown3: []
  });
  const [selectedImage, setSelectedImage] = useState('Conejo.jpeg');
  const selectedValue1Ref = useRef('');
  const selectedValue2Ref = useRef('');
  const selectedValue3Ref = useRef('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar la visibilidad de la ventana de confirmación
  const [showConfirmation2, setShowConfirmation2] = useState(false); // Estado para controlar la visibilidad de la ventana de confirmación
  const [overlayContent, setOverlayContent] = useState('form'); // Estado para controlar el contenido del overlay

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const dataAnimal = await fetchData('http://localhost:8000/animales');
      const dataAcce = await fetchData('http://localhost:8000/Accesorios');
      const dataColores = await fetchData('http://localhost:8000/colores');

      setOptions({
        dropdown1: dataAnimal || [],
        dropdown2: dataColores || [],
        dropdown3: dataAcce || []
      });

      // Actualizar los valores de los dropdowns después de cargar los datos
      selectedValue1Ref.current = dataAnimal[0]?.nombre || '';
      selectedValue2Ref.current = dataColores[0]?.nombre || '';
      selectedValue3Ref.current = dataAcce[0]?.nombre || '';
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleDropdownChange1 = (event) => {
    setSelectedImage(`${event.target.value}.jpeg`);
    selectedValue1Ref.current = event.target.value;
  };

  const handleDropdownChange2 = (event) => {
    selectedValue2Ref.current = event.target.value;
  };

  const handleDropdownChange3 = (event) => {
    selectedValue3Ref.current = event.target.value;
  };

  const handleSubmit = async () => {
    setShowConfirmation(true); // Mostrar la ventana de confirmación
  };

  const handleAccept = async () => {
    setShowConfirmation(false); // Ocultar la ventana de confirmación después de enviar la solicitud
      
    try {
      const postData = {
        email: getCookie('email'),
        AnimalNombre: selectedValue1Ref.current,
        ColorNombre: selectedValue2Ref.current,
        AccNombre: selectedValue3Ref.current
      };
      const token = getCookie('token');
      const response = await fetchData('http://localhost:8000/ventas', 'POST', postData, token);
      console.log('Elemento creado:', response);
      if(response){
        setShowConfirmation2(true);
      }
      setShowConfirmation2(true); // Cambiar el contenido del overlay a "Creado con éxito"
    } catch (error) {
      console.error('Error creating:', error);
    }
  };

  const handleReject = () => {
    setShowConfirmation(false); // Ocultar la ventana de confirmación si se rechaza
  };
  const handleReject2 = () => {
    setShowConfirmation2(false); 
  };

  return (
    <div>
      <Navbar />
      <HeaderBackground />
      <div >
        {showConfirmation && (
          <div className="confirmation-modal overlay-top overlay black-rectangle" >
            <div className="confirmation-content ">
              <h2>Confirmar Creación</h2>
              <div>
                <p>Animal: {selectedValue1Ref.current}</p>
                <p>Color: {selectedValue2Ref.current}</p>
                <p>Accesorio: {selectedValue3Ref.current}</p>
              </div>
              <div className="confirmation-buttons">
                <button className='btn-green' onClick={handleAccept}>Aceptar</button>
                <button className='btn-red' onClick={handleReject}>Rechazar</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div >
        {showConfirmation2 && (
          <div className="confirmation-modal overlay-top overlay black-rectangle" >
            <div className="confirmation-content ">
              <h2>Creado</h2>
              <div>
                <p>Animal: {selectedValue1Ref.current}</p>
                <p>Color: {selectedValue2Ref.current}</p>
                <p>Accesorio: {selectedValue3Ref.current}</p>
              </div>
              <div className="confirmation-buttons">
                
                <button className='btn-green' onClick={handleReject2}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="overlay-content overlay-bottom ">

        <div className="black-rectangle">
          <div className="left-content">
            <img className="image" src={require(`../../assets/images/${selectedImage}`)} alt={selectedImage} />
          </div>
          <div className="right-content overlay-top">
            <select className="dropdown" onChange={handleDropdownChange1}>

              {options.dropdown1.length > 0 ? (
                options.dropdown1.map((option, index) => (

                  <option key={index} value={option.nombre}>{option.nombre}</option>
                ))

              ) : (
                <option>Cargando opciones...</option>
              )}
            </select>
            <select className="dropdown" onChange={handleDropdownChange2}>
              {options.dropdown2.length > 0 ? (
                options.dropdown2.map((option, index) => (
                  <option key={index} value={option.value}>{option.nombre}</option>
                   
                ))
              ) : (
                <option>Cargando opciones...</option>
              )}
            </select>
            <select className="dropdown" onChange={handleDropdownChange3}>
              {options.dropdown3.length > 0 ? (
                options.dropdown3.map((option, index) => (
                  <option key={index} value={option.value}>{option.nombre}</option>
                ))
              ) : (
                <option>Cargando opciones...</option>
              )}
            </select>
          </div>
        </div>
        {overlayContent === 'form' && (
          <div className="overlay-content">
            <div className='navbar-btns-crear'>
              <button type="button" className='btn-login button' onClick={handleSubmit}>
                <h3>Crear</h3>
              </button>
            </div>
          </div>
        )}
        {overlayContent === 'success' && (
          <div className="overlay-content overlay-bottom">
            <div className="black-rectangle">
              <h2>¡Creado con éxito!</h2>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default Create;