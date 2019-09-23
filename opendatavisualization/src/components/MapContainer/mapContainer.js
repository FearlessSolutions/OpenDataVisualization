import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";

class MapContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data_set:null
        }
    }

    render(props){
        return(
            <div>
                {this.state.data_set ?

                    <Map data_set={this.state.data_set}/>
                    :
                    <DataChooser/>
                }
            </div>
        )
    }
}

export default MapContainer