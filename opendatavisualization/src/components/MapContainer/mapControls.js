import React from "react";
import {DATA_SETS} from "../../DataProviders/Socrata";
import DataChooser from "./dataChooser";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'

function MapControls(props) {
    const data_type = DATA_SETS[props.data_set];
    console.log(data_type)
    return (
        <div className={"left"}>
            <DataChooser data_set={props.data_set}  setDataSet={props.setDataSet}/>
            <div>{data_type.description}</div>
            There are {props.data.length} data points collected
            <Button variant="primary" onClick={()=>console.log("Getting more data")}>Get More Data</Button>
            <div style={{overflowY:"auto"}}>
                <Accordion>
                    {props.data.map((data)=>{
                        return(
                            <Card>
                                <Card.Header >
                                    <Accordion.Toggle as={Button} variant="link" eventKey={data[data_type.id]}>
                                    {data[data_type.fields[0]]}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={data[data_type.id]}>
                                    <ListGroup>
                                    {data_type.fields.map((field)=>{
                                        return(
                                            <ListGroup.Item><b>{field}:</b> {data[field]}</ListGroup.Item>
                                        )
                                    })}
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                        )
                    })}
                </Accordion>
            </div>

        </div>
    )
}
export default MapControls