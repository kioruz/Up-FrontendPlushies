import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { fetchData ,fetchDataasync} from '../../fetchData';
import { getCookie } from '../../utils/Cookie';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar/Navbar';
import "./MyPlushies.css";



function MyPlushies() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Cambiado a estado para poder modificarlo

    useEffect(() => {
        const token = getCookie('token');
        fetchData('http://localhost:8000/ventas/me', 'GET', null, token)
            .then(response => {
                // Ordenar los datos por fecha más reciente
                const sortedData = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setData(sortedData);
            })
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
    const handleSubmit = async (id) => {
        try {
            const token = getCookie('token');
            const url = `http://localhost:8000/ventas/me/${id}`;
            const response = await fetchDataasync(url, 'DELETE', null, token);
            console.log('Elemento eliminado:', response);
            // Actualizar la lista de datos después de eliminar el elemento
            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error('Error al eliminar el elemento:', error);
        }
    };
    return (
        
        <div>
            <Navbar />
            <div className='background'>
                <div className='overlay-content-plushies'>
                    <div className='square-plushiesll-back'>
                        <h5 className='text-white fs-26 fw-8'>tus peluches</h5>
                        <div className='boton-paginacion-texto-plushies'>
                            <span>Show items per page: </span>
                            <select
                                className='boton-paginacion-plushies'
                                defaultValue={10}
                                onChange={(e) => handleChangeItemsPerPage(parseInt(e.target.value))}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className='table-container'>
                            <div className='contenedor-tabla-plushies'>
                                <table className='tabla-plushies single-item'>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index} className="row row-content single-row">
                                                {row.map(item => (
                                                    <td key={item.id} className='background-icon-plushiesll'>
                                                        <div className="row-content">
                                                            <div className={`imagen-plushies ${capitalizeFirstLetter(item.AnimalNombre)}-plushies`} />
                                                            <div className="item-details">
                                                                <div className="item-details-email"><a>Email: {item.email}</a></div>
                                                                <div>
                                                                    <div className='two-row-plushies'>
                                                                        <div className='animal-info'>
                                                                            <a>Animal: {capitalizeFirstLetter(item.AnimalNombre)}</a>
                                                                        </div>
                                                                        <div className='color-info'>
                                                                            <a>Color: {item.ColorNombre}</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>Accesorio: {item.AccNombre}</div>
                                                                <div>Creado: {new Date(item.createdAt).toLocaleDateString()}
                                                                <button type="button" className='btn-eliminar  navbar-btns libre-franklin-plushies' onClick={() => handleSubmit(item.id)}>
                                                                Borrar
                                                                        </button>
                                                                </div>
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
export default MyPlushies;