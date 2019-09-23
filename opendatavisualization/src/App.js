import React from 'react';
import './App.css';
import MapContainer from "./components/MapContainer/mapContainer";
import Header from "./components/header";
import Footer from "./components/footer"

function App (){
        return (
            <div className="App">
                <Header/>
                <MapContainer/>
                <Footer/>
            </div>
        );
}

export default App;
