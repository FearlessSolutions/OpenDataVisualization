import React from 'react'
import {Map as LeafletMap, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import {DATA_SETS} from "../../DataProviders/Socrata";
import {getColorIcon, svgIcon} from "./mapIcons";
import {getColor} from "./mapContainer";
import MarkerLayer from "./MapLayers/markerLayer";
import HeatmapLayer from "react-leaflet-heatmap-layer/src/HeatmapLayer";

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
                    {props.mapType === 'heat' ?
                        <HeatmapLayer
                            fitBoundsOnLoaddocker
                            fitBoundsOnUpdate
                            points={filteredData}
                            longitudeExtractor={m => m.longitude}
                            latitudeExtractor={m => m.latitude}
                            intensityExtractor={() => 1}
                        /> :
                        <MarkerLayer
                            filteredData={filteredData}
                            colorMap={props.colorMap}
                            selectedCategory={props.selectedCategory}
                            data_type={data_type}
                        />
                    }

                </LeafletMap>

        );

}

export default ODVMap