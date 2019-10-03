import React from 'react'
import {Map as LeafletMap, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import {DATA_SETS} from "../../DataProviders/Socrata";
import {getColorIcon, svgIcon} from "./mapIcons";
import {getColor} from "./mapContainer";

function ODVMap(props) {

        let data_type = DATA_SETS[props.data_set];
        let filteredData = props.data.slice();
        if(props.visibleValues.length>0) {
            filteredData = filteredData.filter((datum) => {

                return props.visibleValues.includes(datum[props.selectedCategory])
            })
        }
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
                    {/*

                    <Marker position={[39.289615,-76.607805]} icon={pointerIcon}>
                        <Popup>
                            HERE IS FEARLESS
                        </Popup>
                    </Marker>

                     */}
                    {filteredData.length > 0 &&
                        filteredData.map((data, index)=>{
                            if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
                                let icon = getColorIcon(getColor(props.colorMap, data[props.selectedCategory]));
                                return(

                                    <Marker icon={icon} position={[data.latitude, data.longitude]} key={`marker-${index}-${data[data_type.id]}`}>
                                        <Popup>
                                            <ul className= {'popup-list'}>
                                                {data_type.fields.map((field)=>{
                                                    return(
                                                        <li key={`po-${data[field]}`}><b>{field}:</b> {data[field]}</li>
                                                    )
                                                })}
                                            </ul>
                                            </Popup>
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

export default ODVMap