import React from 'react'
import L from "leaflet";

export const fearlessIcon = new L.Icon({
    iconUrl: require('../../assets/Logo_mark.svg'),
    iconRetinaUrl: require('../../assets/Logo_mark.svg'),
    iconAnchor: [16, 16],
    popupAnchor: [0, -10],
    iconSize: [32, 32],
});

export const svgIcon = new L.DivIcon({
    className: 'my-div-icon',
    html:`<svg xmlns="http://www.w3.org/2000/svg"    height="24" version="1.1" width="24">
    <g class="marker" transform="translate(0 -1028.4)">
        <path class="outerColor" d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"  transform="translate(0 1028.4)"/>
        <circle class="innerColor" cx="5" cy="5" r="4" transform="translate(7 1031)"/>
    </g>
</svg>`,
    iconAnchor: [12, 12],
    popupAnchor: [0, -10],
    iconSize: [24, 24],
});

export function getColorIcon(color){
    return new L.DivIcon({
        className: 'my-div-icon',
        html:`<svg xmlns="http://www.w3.org/2000/svg"    height="24" version="1.1" width="24">
    <g class="marker" transform="translate(0 -1028.4)">
        <path class="outerColor" fill="#${color}" d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"  transform="translate(0 1028.4)"/>
        <circle class="innerColor" cx="5" cy="5" r="4" transform="translate(7 1031)"/>
    </g>
</svg>`,
        iconAnchor: [12, 12],
        popupAnchor: [0, -10],
        iconSize: [24, 24],
    });
}