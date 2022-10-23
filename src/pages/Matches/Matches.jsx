import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import TableRowMatch from "../../components/TableRowMatch/TableRowMatch";
import "./Matches.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * Raw data to handle table content
 */
const data = [{
    teamA: "Costa Rica",
    teamB: "España",
    startDate: "23/11/2022",
    startTime: "16:00:00",
    headquarters: "Doha",
    status: "Pendiente",
    score: "0 - 0"
},
{
    teamA: "Costa Rica",
    teamB: "Japón",
    startDate: "27/11/2022",
    startTime: "10:00:00",
    headquarters: "Al Rayyan",
    status: "Pendiente",
    score: "0 - 0"
},
{
    teamA: "Costa Rica",
    teamB: "Alemania",
    startDate: "01/12/2022",
    startTime: "19:00:00",
    headquarters: "Jor",
    status: "Pendiente",
    score: "0 - 0"
}
]

/**
 * Component: Table with registered matches and a button to add new macth
 */
const Matches = () => {
    return (<div className="table-position">
        <Row>
            <Col>
                <Link to="/new-match">
                    <Button
                        as={Col}
                        md="auto"
                        variant="outline-primary"
                        className="mb-3 mx-1"
                        title="Crear partido"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Crear partido
                    </Button>
                </Link>
            </Col>
        </Row>
        <Table bordered hover responsive >
            <thead className="table-header">
                <tr className="rowClass">
                    <th>Partido</th>
                    <th>Fecha de inicio</th>
                    <th>Hora de inicio</th>
                    <th>Sede</th>
                    <th>Estado</th>
                    <th>Marcador</th>
                </tr>
            </thead>
            <tbody className="table-height">
                {data.map((match, i) => {
                    return (<TableRowMatch key={i} match={match} />)
                })}
            </tbody>
        </Table>
    </div>);
};

export default Matches;