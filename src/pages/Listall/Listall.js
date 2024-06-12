import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { fetchData } from '../../fetchData';
import { getCookie } from '../../utils/Cookie';
import ReactPaginate from 'react-paginate';
import "./Listall.css";
import Navbar from '../../components/Navbar/Navbar';

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

    const rows = [];
    for (let i = 0; i < currentPageData.length; i += 3) {
        rows.push(currentPageData.slice(i, i + 3)); // Mostrar un solo elemento por fila en móvil
    }

    return (
        <div>
            <Navbar />
            <div className='background'>
                <div className='overlay-content-lista'>
                    <div className='square-listall-back'>
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
                                <table className='tabla-lista single-item'>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index} className="row row-content single-row">
                                                {row.map(item => (
                                                    <td key={item.id} className='background-icon-listall'>
                                                        <div className="row-content">
                                                            <div className={`imagen-lista ${capitalizeFirstLetter(item.AnimalNombre)}-lista`} />
                                                            <div className="item-details">
                                                                <div className="item-details-email"><a>Email: {item.email}</a></div>
                                                                <div>
                                                                    <div className='two-row-lista'>
                                                                        <div className='animal-info'>
                                                                            <a>Animal: {capitalizeFirstLetter(item.AnimalNombre)}</a>
                                                                        </div>
                                                                        <div className='color-info'>
                                                                            <a>Color: {item.ColorNombre}</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>Accesorio: {item.AccNombre}</div>
                                                                <div>Creado: {new Date(item.createdAt).toLocaleDateString()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='pagination-container'>
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
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Listall;
