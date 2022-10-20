import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import TableRow from "../../components/TableRow/TableRow";
import "./Tournaments.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * Raw data to handle table content
 */
const data = [{
    name: "FIFA World Cup - Catar 2022",
    startDate: "26/11/2022",
    endDate: "26/12/2022",
    type: "Copa"
},
{
    name: "Copa Libertadores - 2023",
    startDate: "26/11/2023",
    endDate: "26/12/2023",
    type: "Copa"
}]

/**
 * Component: Table with registered tournaments and a button to add new tournament
 */
const Tournaments = () => {
    return (<div className="table-position">
        <Row>
            <Col>
                <Link to="/new-tournament">
                    <Button
                        as={Col}
                        md="auto"
                        variant="outline-primary"
                        className="mb-3 mx-1"
                        title="Crear torneo"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Link>
            </Col>
        </Row>
        <Table bordered hover responsive >
            <thead className="table-header">
                <tr className="rowClass">
                    <th>Nombre</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de fin</th>
                    <th>Tipo de torneo</th>
                </tr>
            </thead>
            <tbody className="table-height">
                {data.map((tournament, i) => {
                    return (<TableRow key={i} tournament={tournament} />)
                })}
            </tbody>
        </Table>
    </div>);
};

export default Tournaments;