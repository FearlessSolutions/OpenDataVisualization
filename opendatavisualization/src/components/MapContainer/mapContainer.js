import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";
import { DATA_SETS } from "../../DataProviders/Socrata";
import MapControls from "./mapControls";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_set: null,
            data: [],
        };
        this.setDataSet = this.setDataSet.bind(this);
        this.setData = this.setData.bind(this);
    }

    //Set a data set ID on the state
    setDataSet(id) {
        this.setState({ data_set: id });
        DATA_SETS[id].fetchData(id, this.setData)
    }

    //Set a data object onto the state
    setData(data) {
        this.setState({ data: data });

    }

    render(props) {
        return (
            <div className={"flex-1"}>

                {this.state.data_set ?
                    <div className={"flex"}>
                        <MapControls data_set={this.state.data_set} data={this.state.data} setDataSet={this.setDataSet} />
                        <Map data_set={this.state.data_set} data={this.state.data} />
                    </div>
                    :
                    <div className={"v-center center"}>
                        <DataChooser value={this.state.data_set} data_set={this.state.data_set} setDataSet={this.setDataSet} data_sets={DATA_SETS} />
                    </div>
                }
            </div>
        )
    }
}

export default MapContainer