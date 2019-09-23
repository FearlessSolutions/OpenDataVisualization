import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";
import {fetchData, DATA_SETS} from "../../DataProviders/Socrata";

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
            <div className={"full-size"}>
                {this.state.data_set ? <div>Selected Data Set is: {DATA_SETS[this.state.data_set].name}</div>: ""}
                There are {this.state.data.length} data points collected
                {this.state.data_set ?

                    <Map data_set={this.state.data_set} data={this.state.data}/>
                    :
                    <DataChooser value={this.state.data_set} setDataSet={this.setDataSet}/>
                }
            </div>
        )
    }
}

export default MapContainer