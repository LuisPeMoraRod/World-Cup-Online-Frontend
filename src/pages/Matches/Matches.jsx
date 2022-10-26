import React, { useEffect, useState } from "react";
import config from "../../config";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MatchesTableRow from "../../components/MatchesTableRow/MatchesTableRow";
import "./Matches.scss";

const TOURNAMENT = {
  id: "0",
  name: "FIFA World Cup - Catar 2022",
  startDate: "11-26-2022",
  endDate: "12-26-2022",
  type: "Copa",
  phases: [
    { value: "0", label: "Fase de grupos" },
    { value: "1", label: "Octavos de final" },
  ],
};

const MATCHES = [
  {
    id: 1,
    name: "Argentina",
    startdate: "11-26-2022",
    starttime: "14:25:10",
    location: "Milan",
    state: "Pendiente",
    score: "0-0",
  },
  {
    id: 1,
    name: "Inglaterra",
    startdate: "11-26-2022",
    starttime: "14:25:10",
    location: "Milan",
    state: "Pendiente",
    score: "0-0",
  },
  {
    id: 2,
    name: "Costa Rica",
    startdate: "11-26-2022",
    starttime: "14:25:10",
    location: "Milan",
    state: "Pendiente",
    score: "0-0",
  },
  {
    id: 2,
    name: "España",
    startdate: "11-26-2022",
    starttime: "14:25:10",
    location: "Milan",
    state: "Pendiente",
    score: "0-0",
  },
];
const Matches = () => {
  const { tournamentId } = useParams();

  const [tournament, setTournament] = useState([]); //state to handle tournament's data

  const [matches, setMatches] = useState([]); //state to handle matches data

  const [rowsData, setRowsData] = useState([]);

   useEffect(() => {
     const options = {
       method: "GET",
     };

    //get tournament's data
    fetch(config.resources.tournaments.concat(`/${tournamentId}`), options)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data);
        console.log(data);
      })
      .catch((error) => console.log(error));

     //get tournament's matches
     fetch(
       config.resources.tournaments.concat(`/${tournamentId}/Matches`),
       options
    )
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        console.log(data);
      })
      .catch((error) => console.log(error));

     //get tournament's phases
     fetch(
       config.resources.tournaments.concat(`/Phases/${tournamentId}`),
       options
     )
       .then((res) => res.json())
       .then((data) => {
         const updatedTournament = { ...tournament, phases: data };
         setTournament(updatedTournament);
         console.log(data);
       })
       .catch((error) => console.log(error));
   }, [tournamentId]);

  /**
   * Parse data from API to be useful
   * @param {Array} matches
   */
  const parseMatches = (matches) => {
    let parsedData = [];
    matches.forEach((match, i) => {
      if (i % 2 == 0) {
        const firstTeam = match.name;
        const secondTeam = matches[i + 1].name;
        parsedData.push({
          ...match,
          firstTeam: firstTeam,
          secondTeam: secondTeam,
        });
      }
    });
    return parsedData;
  };

  useEffect(() => {
    const parsedData = parseMatches(matches); //parse matches data to be compatible with table
    setRowsData(parsedData);
  }, [matches]);

  return (
    <div className="table-position">
      <h3 className="mb-5 fw-light">{tournament.name}</h3>
      <Row>
        <Col>
          <Link to={`/tournaments/${tournament.id}/new-match`}>
            <Button
              as={Col}
              md="auto"
              variant="outline-primary"
              className="mb-3 mx-1"
              title="Crear partido"
            >
              <FontAwesomeIcon icon={faPlus} /> Crear Partido
            </Button>
          </Link>
        </Col>
      </Row>
      <Table bordered hover responsive>
        <thead className="table-header">
          <tr className="rowClass">
            <th>Partido</th>
            <th>Fecha de inicio</th>
            <th>Hora de inicio (UTC)</th>
            <th>Sede</th>
            <th>Estado</th>
            <th>Marcador</th>
          </tr>
        </thead>
        <tbody className="table-height">
          {rowsData.map((match, i) => {
            return <MatchesTableRow key={i} match={match} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Matches;
