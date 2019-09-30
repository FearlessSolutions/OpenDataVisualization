import React from 'react';
import PropTypes from 'prop-types';
class DataChooser extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.setDataSet(event.target.value);
    }

    render() {
        let { data_set, data_sets } = this.props;
        console.log(data_sets)
        return (
            <div className={'dataChooser'}>
                <span>Please Choose a data set</span>
                <select value={data_set} onChange={this.handleChange}>
                    <option value={null} />
                    {Object.keys(data_sets).map((dataSet, key) => {
                        return (<option value={dataSet} key={key}>{data_sets[dataSet].name}</option>)
                    })}
                </select>
            </div>
        )
    }

}

DataChooser.propTypes = {
    data_set: PropTypes.object,
    // data_sets: PropTypes.objec,
    setDataSet: PropTypes.func
}
export default DataChooser;