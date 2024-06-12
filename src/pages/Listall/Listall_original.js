import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import HeaderBackground from '../../components/HeaderBackground/HeaderBackground';
import { fetchData } from '../../fetchData';
import { getCookie } from '../../utils/Cookie';
import ReactPaginate from 'react-paginate';
import "./Listall.css";

function Listall() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Cambiado a estado para poder modificarlo

    useEffect(() => {
        const token = getCookie('token');
        fetchData('http://localhost:8000/ventas', 'GET', null, token)
            .then(response => setData(response))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleChangeItemsPerPage = (value) => {
        setItemsPerPage(value);
        setCurrentPage(0); // Resetear la página actual al cambiar el número de elementos por página
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);

    return (
        <div>
            <HeaderBackground />
            <div className='overlay-content-lista'>
                <div className='boton-paginacion-texto-lista'>
                    <span>Show items per page: </span>
                    <select
                        className='boton-paginacion-lista'
                        defaultValue={10}
                        onChange={(e) => handleChangeItemsPerPage(parseInt(e.target.value))}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className='table-container'>
                    <div className='contenedor-tabla-lista'>
                        <table className='tabla-lista'>
                            <thead>
                                <tr className='tr-lista'>
                                    <th>Imagen</th>
                                    <th>Email</th>
                                    <th>Animal</th>
                                    <th>Color</th>
                                    <th>Accesorio</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className={`${capitalizeFirstLetter(item.AnimalNombre)}-lista`}>

                                            </div>
                                        </td>
                                        <td>{item.email}</td>
                                        <td>{capitalizeFirstLetter(item.AnimalNombre)}</td>
                                        <td>{item.ColorNombre}</td>
                                        <td>{item.AccNombre}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    pageCount={Math.ceil(data.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />

            </div>
            <Footer />
        </div>
    );
}

export default Listall;
