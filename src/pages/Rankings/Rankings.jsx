import React, { useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import RankingsTableRow from "../../components/RankingsTableRow/RankingsTableRow";
import { RANKINGS } from "../../constants";

const Rankings = () => {
  const tournaments = useSelector((state) => state.tournaments.tournaments);
  const [hasSelected, setHasSelected] = useState(false);
  const [data, setData] = useState([]);

  const selectionHandler = (e) => {
    setHasSelected(true);
    //TODO fetch rankings data for specific tournament
  };
  return (
    <div className="table-position">
      <Container>
      <h3 className="mb-3 fw-light">Tabla de Posiciones</h3>
        <Row className="mb-3">
          <Select
            id="matchPhase"
            options={tournaments}
            placeholder="Escoja una torneo..."
            onChange={selectionHandler}
          />
        </Row>
      </Container>
      {hasSelected && (
        <Table bordered hover responsive>
          <thead className="table-header">
            <tr className="rowClass">
              <th>Posición</th>
              <th>Nombre</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody className="table-height">
            {data.map((ranking, i) => {
              return <RankingsTableRow key={i} index={i+1} ranking={ranking} />;
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Rankings;
