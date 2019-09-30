import React from "react";
import { DATA_SETS } from "../../DataProviders/Socrata";
import DataChooser from "./dataChooser";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'

function MapControls({ data_set, data_sets, setDataSet, data }) {
    const data_type = data_sets[data_set];
    return (
        <div className={"left"}>
            <DataChooser data_set={data_sets[data_set]} setDataSet={setDataSet} data_sets={data_sets} />
            <div>{data_type.description}</div>
            There are {data.length} data points collected
            <Button variant="primary" onClick={() => console.log("Getting more data")}>Get More Data</Button>
            <div style={{ overflowY: "auto" }}>
                <Accordion>
                    {data.map((datum) => {
                        return (
                            <Card key={datum[data_type.id]}>
                                <Card.Header >
                                    <Accordion.Toggle as={Button} variant="link" eventKey={datum[data_type.id]}>
                                        {datum[data_type.fields[data_type.id]]}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={datum[data_type.id]}>
                                    <ListGroup>
                                        {data_type.fields.map((field) => {
                                            return (
                                                <ListGroup.Item key={field}><b>{field}:</b> {datum[field]}</ListGroup.Item>
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