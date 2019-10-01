import React from 'react'
import ODVMap from "./map";
import DataChooser from "./dataChooser";
import {DATA_SETS} from "../../DataProviders/Socrata";
import MapControls from "./mapControls";
import ReactGA from 'react-ga';

class MapContainer extends React.Component {
    colorMap = {
        "_1f77b4":null,
        "_ff7f0e":null,
        "_2ca02c":null,
        "_d62728":null,
        "_9467bd":null,
        "_8c564b":null,
        "_e377c2":null,
        "_7f7f7f":null,
        "_bcbd22":null,
        "_17becf":null,
    };
    constructor(props){
        super(props);
        this.state = {
            data_set:null,
            data:[],
            hasMoreData:true,
            categories:[],
            selectedCategory:"",
            colorMap: {...this.colorMap},
            visibleValues:[]
        };
        this.setDataSet = this.setDataSet.bind(this);
        this.setData = this.setData.bind(this);
        this.fetchMoreData =  this.fetchMoreData.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.hideOne = this.hideOne.bind(this);
        this.showOne = this.showOne.bind(this);
        this.setColor = this.setColor.bind(this);
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
        DATA_SETS[this.state.data_set].categories && DATA_SETS[this.state.data_set].categories.forEach((cat)=>{
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

    setColor(category, value){

        let colorMap = this.state.selectedCategory === category  ? {...this.state.colorMap} : {...this.colorMap};
        let setColor = false;
        Object.keys(colorMap).forEach((color) =>{

            if (colorMap[color] === value){
                colorMap[color] = null;
            }
            else if (! setColor && !colorMap[color]){
                colorMap[color] = value;
                setColor = color;
            }
        });
        this.setState({selectedCategory:category, colorMap:colorMap})

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
                            setColor={this.setColor}
                            colorMap={this.state.colorMap}
                        />
                        <ODVMap
                            data_set={this.state.data_set}
                            data={this.state.data}
                            categories={this.state.categories}
                            visibleValues={this.state.visibleValues}
                            selectedCategory={this.state.selectedCategory}
                            colorMap={this.state.colorMap}
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

export function getColor(colorMap, value){
    let selectedColor = "_5C3977";
    Object.keys(colorMap).forEach((color)=>{
        if (colorMap[color] === value){
            selectedColor = color
        }
    });

    return selectedColor.replace("_", "")
}