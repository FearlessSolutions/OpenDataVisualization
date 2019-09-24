//framework for a data provider interface.  If Socrata goes away this one will need to be recreated for another provider

const BASE_URL = "https://data.baltimorecity.gov/resource";
export const DATA_SETS = {
    "fesm-tgxf":{
        name:"Housing Permits",
        description: "Baltimore Housing's Office of Permits & Building Inspections enforces the Baltimore City Building Code, as well as state laws pertaining to construction and occupancy.",
        type:"location",
        fields:["PermitNum", "PermitDescription", "Neighborhood"]
    },
    "h32e-c3r6":{
        name:"CCTV Locations",
        description: "Closed circuit camera locations capturing activity within 256ft (~2 blocks).",
        type: "latlong",
        fields: ["cameraname", "owner", "registrationtype"],
        id:"id",
        filter: ["owner"]
    },
    "3i3v-ibrt":{
        name:"BPD Arrests",
        description: "The man is getting people down",
        type: "latlong",
        fields: ["Owner", "RegistrationType"]
    }
};

export function fetchData(id, setData){
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(data => setData( data ));
}