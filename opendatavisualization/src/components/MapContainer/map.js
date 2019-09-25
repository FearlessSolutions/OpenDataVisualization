import React from 'react'
import {Map as LeafletMap, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import L from 'leaflet'


export const pointerIcon = new L.Icon({
    iconUrl: require('../../assets/Logo_mark.svg'),
    iconRetinaUrl: require('../../assets/Logo_mark.svg'),
    iconAnchor: [16, 16],
    popupAnchor: [0, -10],
    iconSize: [32, 32],
});



class Map extends React.Component {
    render() {
        return (
                <LeafletMap
                    className={"right"}
                    center={[39.2903848,-76.6121893]}
                    zoom={14}
                    minZoom={12}
                    maxZoom={18}
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
                    <Marker position={[39.289615,-76.607805]} icon={pointerIcon}>
                        <Popup>
                            HERE IS FEARLESS
                        </Popup>
                    </Marker>
                    {this.props.data.length > 0 &&
                        this.props.data.map((data)=>{
                            // move location lat/long up
                            if(!data.hasOwnProperty('latitude') && data.hasOwnProperty('location')){
                                data.latitude = data.location.latitude
                            }
                            if(!data.hasOwnProperty('longitude') && data.hasOwnProperty('location')){
                                data.longitude = data.location.longitude
                            }

                            if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
                                return(
                                    <Marker position={[data.latitude, data.longitude]}>
                                        <Popup>I am a popup</Popup>
                                        <Tooltip>I am a tooltip</Tooltip>
                                    </Marker>
                                )
                            }
                            else{
                                return null
                            }

                        })
                    }

                </LeafletMap>

        );
    }
}

export default Map