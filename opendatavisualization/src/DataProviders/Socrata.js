//framework for a data provider interface.  If Socrata goes away this one will need to be recreated for another provider

const BASE_URL = "https://data.baltimorecity.gov";
export const DATA_SETS = {
    "fesm-tgxf": {
        name: "Housing Permits",
        description: "Baltimore Housing's Office of Permits & Building Inspections enforces the Baltimore City Building Code, as well as state laws pertaining to construction and occupancy.",
        type: "location",
        fields: ["permitnum", "permitdescription", "neighborhood"],
        id: "permitnum",
        fetchData: fetchLocationData
    },
    "h32e-c3r6": {
        name: "CCTV Locations",
        description: "Closed circuit camera locations capturing activity within 256ft (~2 blocks).",
        fields: ["cameraname", "owner", "registrationtype"],
        id: "id",
        filter: ["owner"],
        fetchData: fetchData
    },
    "3i3v-ibrt": {
        name: "BPD Arrests",
        description: "The man is getting people down",
        fields: ["chargedescription", "district", "age", "sex", "race"],
        id: "arrest",
        fetchData: fetchStringData
    }
};

function fetchData(id, setData) {
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(data => setData(data));
}

function fetchStringData(id, setData) {
    fetch(`${BASE_URL}/resource/${id}?$where=latitude%20not%20like%20%27%27`)
        .then(response => response.json())
        .then(data => setData(data));
}

function fetchLocationData(id, setData) {
    fetch(`${BASE_URL}/resource/${id}`)
        .then(response => response.json())
        .then((data) => {
            data.forEach((datum) => {
                if (datum.hasOwnProperty('location')) {
                    datum.latitude = datum.location.latitude;
                    datum.longitude = datum.location.longitude;
                }
            });
            setData(data)
        });
}

export function fetchDataSets() {
    fetch(`${BASE_URL}/api/catalog/v1?column_names=latitude&column_names=longitude&domains=${BASE_URL}&search_context=${BASE_URL}`)
        .then(response => response.json())
        .then((data) => {
            let dataSets = {};
            data.forEach((datum) => {
                const resource = datum.resource
                dataSets[resource.id] = {
                    name: resource.name,
                    description: resource.description,
                    fields: resource.columns_field_name,
                    /* making the assumption that the id is the first field */
                    id: resource.columns_field_name[0],
                    fetchData: fetchStringData
                }
            });
        });
}
