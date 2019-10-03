import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'

export default class DataPoint extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.filterList = this.filterList.bind(this)
        this.state = {visibleItems:props.data}
    }

    filterList(event) {
        var allItems = this.props.data.slice();
        let visibleItems = allItems.filter((item) => {
        return item[this.props.data_type.fields[0]].toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
      this.setState({visibleItems:visibleItems})
    }

    componentDidMount() {
        console.log(this.props)
    }

    render(){
        let props = this.props;
        let visibleData = this.state.visibleItems.length > 0 ? this.state.visibleItems : props.data
        return(
        <Card>
        <Accordion.Toggle as={Card.Header} eventKey="data_points">
            Data Points
        </Accordion.Toggle>
        <Accordion.Collapse as={Card.Body} eventKey="data_points">
            <div style={{overflowY:"auto"}}>
            <input type="text" placeholder="Search" onChange={this.filterList} style={{width:'100%'}}/>
                <Accordion>
                    {visibleData.map((data,index)=>{
                        return(
                            <Card key={`card-${index}-${data[props.data_type.id]}`}>
                                <Card.Header >
                                    <Accordion.Toggle as={Button} variant="link" eventKey={data[props.data_type.id]}>
                                    {data[props.data_type.fields[0]]}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={data[props.data_type.id]}>
                                    <ListGroup>
                                    {props.data_type.fields.map((field)=>{
                                        return(
                                            <ListGroup.Item key={`lg-${data[field]}`}><b>{field}:</b> {data[field]}</ListGroup.Item>
                                        )
                                    })}
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                </Accordion>
            </div>
        </Accordion.Collapse>
        </Card> 
        )}
}