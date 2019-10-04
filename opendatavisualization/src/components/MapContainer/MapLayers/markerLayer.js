import React from 'react';
import {getColorIcon} from "../mapIcons";
import {getColor} from "../mapContainer";
import {Marker, Popup} from "react-leaflet";

export default function MarkerLayer(props){
    return(
        props.filteredData.length > 0 &&
                props.filteredData.map((data, index) => {
                    if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
                        let icon = getColorIcon(getColor(props.colorMap, data[props.selectedCategory]));
                        return (

                            <Marker icon={icon} position={[data.latitude, data.longitude]}
                                    key={`marker-${index}-${data[props.data_type.id]}`}>
                                <Popup>
                                    <ul className={'popup-list'}>
                                        {props.data_type.fields.map((field) => {
                                            return (
                                                <li key={`po-${data[field]}`}>
                                                    <b>{field}:</b> {data[field]}</li>
                                            )
                                        })}
                                    </ul>
                                </Popup>
                            </Marker>

                        )
                    } else {

                        return null
                    }

                })

    )
}