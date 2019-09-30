import React from 'react';
import './App.css';
import MapContainer from "./components/MapContainer/mapContainer";
import Header from "./components/header";
import Footer from "./components/footer";
import ReactGA from 'react-ga';

function App (){
        ReactGA.initialize('UA-148711006-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
        return (
            <div className="App">
                <Header/>
                <MapContainer/>
                <Footer/>
            </div>
        );
}

export default App;
