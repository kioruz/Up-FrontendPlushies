
import '../../pages/MainPage/MainPage.css';
import React from "react";
import Header from '../../components/Header/Header';
import "../../assets/js/script";
import Footer from '../../components/Footer/Footer';

function MainPage({children}) {
    return (
        
        
        <div className="App">
            <Header />
            <Footer />
            <div>{children}</div>
        </div>
        
    );
}

export default MainPage