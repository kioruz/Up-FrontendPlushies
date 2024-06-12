import React, { useState, useEffect } from "react";
import "./Services.css";
import SingleService from './SingleService';

const Services = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/ventas/ranking");
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='services section-p bg-md-black background' id="services">
            <div className='container '>
                <div className='services-content'>
                    <svg width="1em" height="1em">
                        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#55b3d5" offset="0%" />
                            <stop stopColor="#5764de" offset="100%" />
                        </linearGradient>
                    </svg>

                    <div className='item-list grid text-white text-center'>
                        {data.map((service, index) => {

                            return <SingleService service={service} key={index} contador={index + 1} />;
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
