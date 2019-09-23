import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'


export const pointerIcon = new L.Icon({
    iconUrl: require('../assets/Logo_mark.svg'),
    iconRetinaUrl: require('../assets/Logo_mark.svg'),
    iconAnchor: [16, 16],
    popupAnchor: [16, -44],
    iconSize: [32, 32],
});



class Map extends React.Component {
    render() {
        return (
            <LeafletMap
                center={[39.2893978,-76.6093614]}
                zoom={14}
                minZoom={11}
                maxZoom={19}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={[39.2893978,-76.6093614]} icon={pointerIcon}>
                    <Popup>
                        HERE IS FEARLESS
                    </Popup>
                </Marker>
            </LeafletMap>
        );
    }
}

export default Map