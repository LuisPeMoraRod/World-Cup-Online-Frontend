import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import TournamentTableRow from "../../components/TournamentTableRow/TournamentTableRow";
import "./Tournaments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Raw data to handle table content
 */
const data = [
  {
    id: "0",
    name: "FIFA World Cup - Catar 2022",
    startDate: "11-26-2022",
    endDate: "12-26-2022",
    type: "Copa",
  },
  {
    id: "1",
    name: "Copa Libertadores - 2023",
    startDate: "11-26-2023",
    endDate: "12-26-2023",
    type: "Copa",
  },
];

/**
 * Component: Table with registered tournaments and a button to add new tournament
 */
const Tournaments = () => {
  // const data = useSelector((state) => state.catalogs.tournaments);

  return (
    <div className="table-position">
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
              <FontAwesomeIcon icon={faPlus} /> Crear torneo
            </Button>
          </Link>
        </Col>
      </Row>
      <Table bordered hover responsive>
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
            return <TournamentTableRow key={i} tournament={tournament} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Tournaments;
