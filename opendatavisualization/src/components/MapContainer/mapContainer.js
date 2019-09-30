import React from 'react'
import Map from "./map";
import DataChooser from "./dataChooser";
import {DATA_SETS} from "../../DataProviders/Socrata";
import MapControls from "./mapControls";
import ReactGA from 'react-ga';

class MapContainer extends React.Component {
    colorList = [
        "_1f77b4",
        "_ff7f0e",
        "_2ca02c",
        "_d62728",
        "_9467bd",
        "_8c564b",
        "_e377c2",
        "_7f7f7f",
        "_bcbd22",
        "_17becf",]
    ;
    constructor(props){
        super(props);
        this.state = {
            data_set:null,
            data:[],
            hasMoreData:true,
            categories:[],
            selectedCategory:"",
            colorMap:{},
            visibleValues:[]
        };
        this.setDataSet = this.setDataSet.bind(this);
        this.setData = this.setData.bind(this);
        this.fetchMoreData =  this.fetchMoreData.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.hideOne = this.hideOne.bind(this);
        this.showOne = this.showOne.bind(this);
    }

    //Set a data set ID on the state
    setDataSet(id){
        this.setState({data_set:id, data:[], hasMoreData:true});
        ReactGA.event({
            category: 'Data',
            action: 'Chose a data set to view',
            label: DATA_SETS[id].name
        });

        DATA_SETS[id].fetchData(id, this.setData, this.state.data.length)
    }

    fetchMoreData (){
        DATA_SETS[this.state.data_set].fetchData(this.state.data_set, this.setData, this.state.data.length);

    }

    //Set a data object onto the state
    setData(data){
        let currentData = this.state.data.slice();
        currentData = currentData.concat(data);
        let categories = {};
        DATA_SETS[this.state.data_set].categories.forEach((cat)=>{
            categories[cat] = [...new Set(currentData.map((catData)=>{return catData[cat]}))];
        });

        this.setState({data:currentData, hasMoreData:data.length>0, categories:categories});
    }

    hideAll(category, value){
        //the current state doesn;t matter.  set the category and make this the only visible value
        this.setState({selectedCategory:category,visibleValues:[value]})
    }

    hideOne(category, value){
        let currentVisibleValues = this.state.visibleValues.slice();
        // category is changing, add all sets to the visible list
        if (this.state.selectedCategory !== category){
           currentVisibleValues = this.state.categories[category]
        }
        // remove the desired value from the list.
        currentVisibleValues.splice(currentVisibleValues.indexOf(value),1);
       this.setState({selectedCategory:category,visibleValues:currentVisibleValues})

    }

    showOne(value){
        let currentVisibleValues = this.state.visibleValues.slice();
        currentVisibleValues.push(value);
        this.setState({visibleValues:currentVisibleValues})
    }



    render(props){
        return(
            <div className={"flex-1"}>

                {this.state.data_set ?
                    <div className={"flex"}>
                        <MapControls
                            hasMoreData={this.state.hasMoreData}
                            data_set={this.state.data_set}
                            data={this.state.data}
                            setDataSet={this.setDataSet}
                            fetchMoreData={this.fetchMoreData}
                            categories={this.state.categories}
                            hideAll={this.hideAll}
                            hideOne={this.hideOne}
                            showOne={this.showOne}
                            visibleValues={this.state.visibleValues}
                            selectedCategory={this.state.selectedCategory}
                        />
                        <Map
                            data_set={this.state.data_set}
                            data={this.state.data}
                            categories={this.state.categories}
                            visibleValues={this.state.visibleValues}
                            selectedCategory={this.state.selectedCategory}
                        />
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