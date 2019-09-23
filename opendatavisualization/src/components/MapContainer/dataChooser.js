import React from 'react';
import {DATA_SETS} from '../../DataProviders/Socrata'
class  DataChooser extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.setDataSet(event.target.value);
    }

    render() {
        return (
            <div className={'dataChooser'}>
                Please Choose a data set
                <select value={this.props.data_set} onChange={this.handleChange}>
                    <option value={""}/>
                {Object.keys(DATA_SETS).map((dataSet) => {
                    return (<option value={dataSet}>{DATA_SETS[dataSet].name}</option>)
                })}
                </select>
            </div>
        )
    }
}
export default DataChooser;