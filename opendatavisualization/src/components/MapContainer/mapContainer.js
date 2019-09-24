import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";
import {fetchData} from "../../DataProviders/Socrata";
import MapControls from "./mapControls";

class MapContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data_set:null,
            data:[],
        };
        this.setDataSet = this.setDataSet.bind(this);
        this.setData = this.setData.bind(this);
    }

    //Set a data set ID on the state
    setDataSet(id){
        this.setState({data_set:id});
        fetchData(id, this.setData)
    }

    //Set a data object onto the state
    setData(data){
        this.setState({data:data});

    }

    render(props){
        return(
            <div className={"flex-1"}>

                {this.state.data_set ?
                    <div className={"flex"}>
                        <MapControls data_set={this.state.data_set} data={this.state.data}  setDataSet={this.setDataSet}/>
                        <Map data_set={this.state.data_set} data={this.state.data}/>
                    </div>
                    :
                    <div className={"v-center center"}>
                        <DataChooser value={this.state.data_set} setDataSet={this.setDataSet}/>
                    </div>
                }
            </div>
        )
    }
}

export default MapContainer