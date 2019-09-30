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
        const { data_set, data_sets } = this.props;
        return (
            <div className={'dataChooser'}>
                <span>Please Choose a data set</span>
                <select value={data_set} onChange={this.handleChange}>
                    {/* <option value={new Object()} /> */}
                    {Object.keys(data_sets).map((dataSet) => {
                        return (<option value={dataSet}>{data_sets[dataSet].name}</option>)
                    })}
                </select>
            </div>
        )
    }
}
DataChooser.propTypes = {
    data_set: PropTypes.object,
    data_sets: PropTypes.object,
    setDataSet: PropTypes.func
}
export default DataChooser;