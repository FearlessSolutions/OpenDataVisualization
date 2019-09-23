import React from 'react';
import './App.css';
import MapContainer from "./components/MapContainer/mapContainer";
import Header from "./components/header";

function App (){
        return (
            <div className="App">
                <Header/>
                <MapContainer/>
            </div>
        );
}

export default App;
