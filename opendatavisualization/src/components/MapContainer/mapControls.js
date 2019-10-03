import React from "react";
import {DATA_SETS} from "../../DataProviders/Socrata";
import DataChooser from "./dataChooser";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {getColor} from "./mapContainer";
import DataPoint from "./dataPoints"

function MapControls(props) {
    const data_type = DATA_SETS[props.data_set];
    return (
        <div className={"left"}>
            <Accordion defaultActiveKey="data_set">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="data_set">
                        Data Set
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="data_set">
                        <Card.Body>
                            <DataChooser data_set={props.data_set}  setDataSet={props.setDataSet}/>
                            <Button variant="primary" onClick={()=>props.fetchMoreData()} disabled={!props.hasMoreData} >Get More Data ({props.data.length})</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="description">
                        Description
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="description">
                        <Card.Body>
                            {data_type.description}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                    {Object.keys(props.categories).map((category)=> {
                        return(
                            <Card key={category}>
                                <Accordion.Toggle as={Card.Header} eventKey={`category-${category}`}>
                                    {category}
                                </Accordion.Toggle>
                                <Accordion.Collapse as={Card.Body} eventKey={`category-${category}`}>
                                        <ListGroup>
                                            {props.categories[category].map((val)=>{
                                                let selectedColor = getColor(props.colorMap, val);
                                                return(
                                                    <ListGroup.Item key={`${category}-${val}`}>
                                                        {val}
                                                        <ButtonGroup>
                                                            <Button variant={selectedColor} onClick={() => props.setColor(category, val)}>Change Color</Button>
                                                            {props.visibleValues.indexOf(val) > -1 || props.selectedCategory !== category || props.visibleValues.length === 0  ?
                                                                <Button
                                                                    variant={selectedColor}
                                                                    disabled={props.visibleValues.length === 1}
                                                                    onClick={() => {
                                                                    props.hideOne(category, val)
                                                                    }}>Hide</Button> :
                                                                <Button variant={selectedColor} onClick={() => {
                                                                    props.showOne(val)
                                                                }}>Show</Button>
                                                            }
                                                            <Button variant={selectedColor} disabled={props.visibleValues.length === 1 && props.visibleValues.indexOf(val) > -1 }
                                                                    onClick={()=>props.hideAll(category, val)}>Hide Others</Button>
                                                        </ButtonGroup>

                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                    <DataPoint data={props.data} data_type= {data_type}  />
            </Accordion>
        </div>
    )
}
export default MapControls