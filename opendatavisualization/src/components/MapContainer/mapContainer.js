import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";
import { fetchDataSets } from "../../DataProviders/Socrata";
import MapControls from "./mapControls";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_set: null,
            data: [],
            data_sets: {}
        };
        this.setDataSet = this.setDataSet.bind(this);
        this.setData = this.setData.bind(this);
        this.setDataSets = this.setDataSets.bind(this);
        fetchDataSets(this.setDataSets);
    }

    //Set a data set ID on the state
    setDataSet(id) {
        this.setState({ data_set: id });
        this.state.data_sets[id].fetchData(id, this.setData)
    }

    //Set a data object onto the state
    setData(data) {
        this.setState({ data: data });

    }

    setDataSets(dataSets) {
        this.setState({ data_sets: dataSets })
    }

    render(props) {
        let { data, data_set, data_sets } = this.state;
        return (
            <div className={"flex-1"}>

                {data_set ?
                    <div className={"flex"}>
                        <MapControls data_sets={data_sets} data_set={data_set} data={data} setDataSet={this.setDataSet} />
                        <Map data_set={data_set} data={data} />
                    </div>
                    :
                    <div className={"v-center center"}>
                        <DataChooser value={data_set} setDataSet={this.setDataSet} data_sets={data_sets ? data_sets : {}} />
                    </div>
                }
            </div>
        )
    }
}

export default MapContainer