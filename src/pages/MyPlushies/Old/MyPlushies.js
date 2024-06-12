import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeaderBackground from '../../components/HeaderBackground/HeaderBackground';
import Footer from '../../components/Footer/Footer';
import { fetchData } from '../../fetchData';  // Make sure to import your fetchData function
import { getCookie } from '../../utils/Cookie';  // Make sure to import your getCookie function
import ReactPaginate from 'react-paginate';
import './MyPlushies.css';
import MyPlushiesSingle from './MyPlushiesSingle';

const MyPlushies = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;  // 5x5 grid
    

    useEffect(() => {
        const token = getCookie('token');
        if (!token) {
            navigate('/login');  // Redirect to login if token is not present
            return;
        }
        
        fetchData('http://localhost:8000/ventas/me', 'GET', null, token)
            .then(response => setData(response))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);

    return (
        <div>
            <Navbar />
            <div className='background-plushies'>
                <div className='background size'>
                    <div className='text-white'>
                        <h1>Welcome to your Plushies Collection</h1>
                    </div>
                    <div className='plushies-table'>
                        <section className='square-plushies'>
                            <div className='container'>
                                <div className='services-content'>
                                    {/* Contenido del grid */}
                                    <div className='item-list-plushies'>
                                        {currentPageData.map((service) => (
                                            <MyPlushiesSingle service={service} key={service.id} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Paginación */}
                    <div className="pagination-container-plushies">
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

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default MyPlushies;
