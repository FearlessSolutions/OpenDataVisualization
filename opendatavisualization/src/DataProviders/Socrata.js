//framework for a data provider interface.  If Socrata goes away this one will need to be recreated for another provider

const BASE_URL = "https://data.baltimorecity.gov/resource";
export const DATA_SETS = {
    "fesm-tgxf":{
        name:"Housing Permits",
        description: "Baltimore Housing's Office of Permits & Building Inspections enforces the Baltimore City Building Code, as well as state laws pertaining to construction and occupancy.",
        type:"location",
        fields:["permitnum", "permitdescription", "neighborhood"],
        id:"permitnum",
        fetchData:fetchLocationData
    },
    "h32e-c3r6":{
        name:"CCTV Locations",
        description: "Closed circuit camera locations capturing activity within 256ft (~2 blocks).",
        fields: ["cameraname", "owner", "registrationtype"],
        id:"id",
        filter: ["owner",],
        categories:["owner", "neighborhood"],
        fetchData: fetchData
    },
    "3i3v-ibrt":{
        name:"BPD Arrests",
        description: "The man is getting people down",
        fields: ["chargedescription", "district", "age", "sex", "race"],
        id:"arrest",
        fetchData:fetchStringData
    },
    "xv8d-bwgi":{
        name:"Liquor Licenses",
        description: "Location of Liquor licenses within Baltimore City ",
        fields: ["tradename", "licensenumber", "licenseclass", "licenseenddate", "licensestatus", "corpname", "establishmentdesc", "dayperweek"],
        id:"licensenumber",
        filter: ["corpname",],
        categories:["licenseclass", "dayperweek", "establishmentdesc"],
        fetchData: fetchLocation1Data

    },
    "9agw-sxsr":{
        name:"311 Service Requests",
        description:"311 Service Requests",
        fields:["servicerequestnum", "srstatus", "outcome", "neighborhood", "councildistrict", "policedistrict" ],
        id:["srrecordid"],
        categories:["methodreceived", "agency", "outcome"],
        fetchData: fetchLocation1Data
    },
    "us2p-bijb":{
        name:"Minority and Women's Business Enterprises Certifications",
        description:"It is the policy of the City of Baltimore to promote equal business opportunity in the City's contracting process by encouraging full and equitable participation by minority and women's business enterprises in the provision of goods and services to the City on a contractual basis.",
        fields:["company", "firstname", "lastname", "position", "contractstatus"],
        id:"certno",
        categories:["category"],
        fetchData: fetchLocationData,
    },
};

function fetchData(id, setData, offset){
    fetch(getBaseURL(id, offset))
        .then(response => response.json())
        .then(data => setData( data ));
}

function fetchStringData(id, setData, offset){
    fetch(getBaseURL(id, offset) + `&$where=latitude%20not%20like%20%27%27`)
        .then(response => response.json())
        .then(data => setData( data ));
}

function fetchLocationData(id, setData, offset){
    fetch(getBaseURL(id, offset))
        .then(response => response.json())
        .then((data) =>
            {data.forEach((datum)=>{
                if(datum.hasOwnProperty('location')){
                    datum.latitude = datum.location.latitude;
                    datum.longitude = datum.location.longitude;
                }
            });
            setData( data )
        });
}

function fetchLocation1Data(id, setData, offset){
    fetch(getBaseURL(id, offset))
        .then(response => response.json())
        .then((data) =>
        {data.forEach((datum)=>{
            if(datum.hasOwnProperty('location_1')){
                datum.latitude = datum.location_1.latitude;
                datum.longitude = datum.location_1.longitude;
            }
        });
            setData( data )
        });
}

function getBaseURL(id, offset){
    return `${BASE_URL}/${id}?$offset=${offset}&$order=:id%20desc`
}