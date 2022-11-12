import React, { useEffect, useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import config from "../../config";
import useTypeaheadMulti from "../../hooks/useTypeaheadMulti";
import "./Match.scss";
import { PLAYERS } from "../../constants";

const MAX_GOALS = 99;

const Match = () => {
  const { tournamentId, matchId } = useParams();

  const [team1, setTeam1] = useState("");
  const [players1, setPlayers1] = useState(PLAYERS);
  const [team2, setTeam2] = useState("");
  const [players2, setPlayers2] = useState(PLAYERS);
  const [oficialScore, setOficialScore] = useState("Pendiente");

  const [prediction, setPrediction] = useState({
    goalsTeam1: 0,
    scorersTeam1: [],
    assistsTeam1: [],
    goalsTeam2: 0,
    scorersTeam2: [],
    assistsTeam2: [],
    mvp: null,
  });

  /**
   * Updates prediction object. Updates fields and values passed as object
   * Example: updatePrediction({name: "WC", type:"selecciones"})
   * @param {Object} updatedFields
   */
  const updatePrediction = (updatedFields) => {
    setPrediction({ ...prediction, ...updatedFields });
  };

  const setTeams = (matches) => {
    const match = matches.filter((match) => {
      return match.id == matchId;
    });
    setTeam1(match[0].name);
    setTeam2(match[1].name);
  };

  const scorers1Ref = useRef(null);
  const scorers2Ref = useRef(null);
  const assists1Ref = useRef(null);
  const assists2Ref = useRef(null);

  const checkScorers = (scorers) => {
    return scorers.length <= MAX_GOALS;
  };

  const checkAssists1 = (assists) => {
    return assists.length <= prediction.scorersTeam1.length;
  };

  const checkAssists2 = (assists) => {
    return assists.length <= prediction.scorersTeam2.length;
  };

  /**
   * Hook used to handle team 1 scorers
   */
  const {
    values: scorers1,
    isValid: scorers1IsValid,
    hasError: scorers1HasError,
    valueSelectedHandler: scorers1SelectedHandler,
    inputBlurHandler: scorers1BlurHandler,
  } = useTypeaheadMulti(
    updatePrediction,
    checkScorers,
    "scorersTeam1",
    prediction.scorersTeam1
  );

  /**
   * Hook used to handle team 2 scorers
   */
  const {
    values: scorers2,
    isValid: scorers2IsValid,
    hasError: scorers2HasError,
    valueSelectedHandler: scorers2SelectedHandler,
    inputBlurHandler: scorers2BlurHandler,
  } = useTypeaheadMulti(
    updatePrediction,
    checkScorers,
    "scorersTeam2",
    prediction.scorersTeam2
  );

  /**
   * Hook used to handle team 1 assists
   */
  const {
    values: assists1,
    isValid: assists1IsValid,
    hasError: assists1HasError,
    valueSelectedHandler: assists1SelectedHandler,
    inputBlurHandler: assists1BlurHandler,
  } = useTypeaheadMulti(
    updatePrediction,
    checkAssists1,
    "assistsTeam1",
    prediction.assistsTeam1
  );
  
  /**
   * Hook used to handle team 2 assists
   */
  const {
    values: assists2,
    isValid: assists2IsValid,
    hasError: assists2HasError,
    valueSelectedHandler: assists2SelectedHandler,
    inputBlurHandler: assists2BlurHandler,
  } = useTypeaheadMulti(
    updatePrediction,
    checkAssists2,
    "assistsTeam2",
    prediction.assistsTeam2
  );

  useEffect(() => {
    const options = {
      method: "GET",
    };
    //get match info
    fetch(
      config.resources.tournaments.concat(`/${tournamentId}/Matches`),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //update team 1 goals
  useEffect(() => {
    updatePrediction({ goalsTeam1: scorers1.length });
    console.log(prediction);
  }, [scorers1]);

  //update team 2 goals
  useEffect(() => {
    updatePrediction({ goalsTeam2: scorers2.length });
  }, [scorers2]);

  return (
    <Container className="centered">
      <h3
        className="mb-5
       fw-light"
      >
        {team1} vs {team2}
      </h3>
      <div className="scores-container mb-3">
        <h4 className="mb-3 fw-light text-label">
          <strong>Mi predicción:</strong> {team1} {prediction.goalsTeam1} -{" "}
          {prediction.goalsTeam2} {team2}
        </h4>
        <h4 className="mb-3 fw-light text-label">
          <strong>Resultado oficial:</strong> {oficialScore}
        </h4>
      </div>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="goalscorers1">
            <Form.Label>Anotadores de {team1}</Form.Label>
            <Typeahead
              multiple
              id="scorers1"
              onChange={(selected) => {
                scorers1SelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                scorers1Ref.current.toggleMenu();
              }}
              options={players1}
              placeholder="Escoja los jugadores que predice serán los anotadores en este partido..."
              ref={scorers1Ref}
              selected={prediction.scorersTeam1}
              onBlur={scorers1BlurHandler}
              className="is-invalid"
              isInvalid={scorers1HasError}
            />
            {scorers1HasError && (
              <p className="error-text">
                {" "}
                El máximo número de goles anotados posible es {MAX_GOALS}
              </p>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="goalscorers2">
            <Form.Label>Anotadores de {team2}</Form.Label>
            <Typeahead
              multiple
              id="scorers2"
              onChange={(selected) => {
                scorers2SelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                scorers2Ref.current.toggleMenu();
              }}
              options={players2}
              placeholder="Escoja los jugadores que predice serán los anotadores en este partido..."
              ref={scorers2Ref}
              selected={prediction.scorersTeam2}
              onBlur={scorers2BlurHandler}
              className="is-invalid"
              isInvalid={scorers2HasError}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-5" controlId="assists1">
            <Form.Label>Asistencias</Form.Label>
            <Typeahead
              multiple
              id="assists1"
              onChange={(selected) => {
                assists1SelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                assists1Ref.current.toggleMenu();
              }}
              options={players1}
              placeholder={`Escoja los jugadores que predice harán asistencias a los goles de ${team1}...`}
              ref={assists1Ref}
              selected={prediction.assistsTeam1}
              onBlur={assists1BlurHandler}
              className="is-invalid"
              isInvalid={assists1HasError}
            />
            {assists1HasError && (
              <p className="error-text">
                {" "}
                El máximo número de asistencias debe ser igual o menor que los goles anotados por equipo
              </p>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-5" controlId="assists2">
            <Form.Label>Asistencias</Form.Label>
            <Typeahead
              multiple
              id="assists2"
              onChange={(selected) => {
                assists2SelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                assists2Ref.current.toggleMenu();
              }}
              options={players2}
              placeholder={`Escoja los jugadores que predice harán asistencias a los goles de ${team2}...`}
              ref={assists2Ref}
              selected={prediction.assistsTeam2}
              onBlur={assists2BlurHandler}
              className="is-invalid"
              isInvalid={assists2HasError}
            />
            {assists2HasError && (
              <p className="error-text">
                {" "}
                El máximo número de asistencias debe ser igual o menor que los goles anotados por equipo
              </p>
            )}
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Match;
