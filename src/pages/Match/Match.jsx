import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import config from "../../config";
import useTypeaheadMulti from "../../hooks/useTypeaheadMulti";
import "./Match.scss";
import useTypeahead from "../../hooks/useTypeahead";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uniqueId from "lodash.uniqueid";

const MAX_GOALS = 99;

const Match = () => {
  const username = useSelector((state) => state.user.username);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { tournamentId, matchId } = useParams();

  const [team1, setTeam1] = useState({});
  const [players1, setPlayers1] = useState([]);
  const [team2, setTeam2] = useState({});
  const [players2, setPlayers2] = useState([]);
  const [oficialScore, setOficialScore] = useState("Pendiente");
  const [allPlayers, setAllPlayers] = useState([]);

  const [prediction, setPrediction] = useState({
    goalsTeam1: 0,
    scorersTeam1: [],
    assistsTeam1: [],
    goalsTeam2: 0,
    scorersTeam2: [],
    assistsTeam2: [],
    mvp: "",
  });

  /**
   * Receives an array of objects with an ID key
   * Returns an array of ids (ints)
   * @param {Array}
   */
  const parsePlayersIds = (players) => {
    console.log(players);
    return players.map((player) => {
      return player.id;
    });
  };

  /**
   * Receives an array of objects with an @id key
   * Returns an array of objects with the @id property renamed to @playerId
   * @param {Array}
   */
  const renamePlayersIdProperty = (players) => {
    return players.map((player) => {
      return { label: player.label, playerId: player.id };
    });
  };

  /**
   * POST to create new bet
   * @param {Object} newBet
   */
  const sendPrediction = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const team1Scorers = parsePlayersIds(prediction.scorersTeam1);
    const team2Scorers = parsePlayersIds(prediction.scorersTeam2);
    const team1Assists = parsePlayersIds(prediction.assistsTeam1);
    const team2Assists = parsePlayersIds(prediction.assistsTeam2);

    //new prediction object
    const newPrediction = {
      team1id: team1.id,
      team1goals: prediction.goalsTeam1,
      team1scorers: team1Scorers,
      team1assists: team1Assists,
      team2id: team2.id,
      team2goals: prediction.goalsTeam2,
      team2scorers: team2Scorers,
      team2assists: team2Assists,
      mvpid: prediction.mvp.id,
    };

    const method = isAdmin ? "PUT" : "POST";
    const url = isAdmin
      ? config.resources.matches.concat(`/${matchId}`)
      : config.resources.bet.concat(`/${username}/${matchId}`);

    const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(newPrediction),
    };

    console.log(newPrediction);
    return fetch(
      url,
      options
    )
      .then((response) => response)
      .catch((error) => {
        throw new Error(error);
      });
  };

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

    const nameTeam1 = match[0].name;
    const nameTeam2 = match[1].name;

    const options = {
      method: "GET",
    };
    //get all teams
    fetch(config.resources.teams, options)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((team) => {
          //set teams ID
          if (team.label === nameTeam1)
            setTeam1({ name: nameTeam1, id: team.id });
          if (team.label === nameTeam2)
            setTeam2({ name: nameTeam2, id: team.id });
        });
      })
      .catch((error) => console.log(error));
  };

  const scorers1Ref = useRef(null);
  const scorers2Ref = useRef(null);
  const assists1Ref = useRef(null);
  const assists2Ref = useRef(null);

  const checkScorers = (scorers) => {
    return scorers.length <= MAX_GOALS;
  };

  const checkAssists = (assists, goalsScored) => {
    const goals = !goalsScored ? 0 : goalsScored; // if undefined, set to 0
    return assists.length <= goals;
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
    checkAssists,
    "assistsTeam1",
    prediction.assistsTeam1,
    prediction.goalsTeam1
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
    checkAssists,
    "assistsTeam2",
    prediction.assistsTeam2,
    prediction.goalsTeam2
  );

  /**
   * Checks if entered MVP is one of the options
   * @param {Object} value
   * @param {Array} dataset
   */
  const checkMvp = (value, dataset) => {
    let isValid = false;
    dataset.forEach((item) => {
      if (item.id === value.id) isValid = true;
    });
    return isValid;
  };

  /**
   * Hook used to handle MVP input validation
   */
  const {
    value: mvp,
    isValid: mvpIsValid,
    hasError: mvpHasError,
    valueSelectedHandler: mvpSelectedHandler,
    valueChangedHandler: mvpChangedHandler,
    inputBlurHandler: mvpBlurHandler,
  } = useTypeahead(
    updatePrediction,
    checkMvp,
    "mvp",
    prediction.mvp,
    allPlayers
  );

  useEffect(() => {
    const options = {
      method: "GET",
    };
    //get match info
    fetch(
      config.resources.tournaments.concat(`/Matches/${tournamentId}`),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //set team 1 players
  useEffect(() => {
    const options = {
      method: "GET",
    };
    //get players
    fetch(config.resources.teams.concat(`/${team1.id}/Players`), options)
      .then((res) => res.json())
      .then((data) => {
        setPlayers1(data);
      })
      .catch((error) => console.log(error));
  }, [team1]);

  //set team 2 players
  useEffect(() => {
    const options = {
      method: "GET",
    };
    //get players
    fetch(config.resources.teams.concat(`/${team2.id}/Players`), options)
      .then((res) => res.json())
      .then((data) => {
        setPlayers2(data);
      })
      .catch((error) => console.log(error));
  }, [team2]);

  //update team 1 goals
  useEffect(() => {
    updatePrediction({ goalsTeam1: scorers1.length });
  }, [scorers1]);

  //update team 2 goals
  useEffect(() => {
    updatePrediction({ goalsTeam2: scorers2.length });
  }, [scorers2]);

  //set all players array for MVP selection
  useEffect(() => {
    setAllPlayers([...players1, ...players2]);
  }, [players1, players2]);

  // tells if every input is valid
  const isValid =
    scorers1IsValid &&
    scorers2IsValid &&
    assists1IsValid &&
    assists2IsValid &&
    mvpIsValid;

  //redirection url
  const btnUrl = !!isValid
    ? `/tournaments/${tournamentId}/matches`
    : `/tournaments/${tournamentId}/${matchId}`;

  return (
    <Container className="centered">
      <h3
        className="mb-5
       fw-light"
      >
        {team1.name} vs {team2.name}
      </h3>
      <div className="scores-container mb-3">
        <h4 className="mb-3 fw-light text-label">
          {!isAdmin && <strong>Mi predicción:</strong>} {team1.name}{" "}
          {prediction.goalsTeam1} - {prediction.goalsTeam2} {team2.name}
        </h4>
        {!isAdmin && (
          <h4 className="mb-3 fw-light text-label">
            <strong>Resultado oficial:</strong> {oficialScore}
          </h4>
        )}
      </div>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="goalscorers1">
            <Form.Label>Anotadores de {team1.name}</Form.Label>
            <Typeahead
              multiple
              id="scorers1"
              onChange={(selections) => {
                const lastSelection = selections.slice(-1).pop()
                scorers1SelectedHandler([...prediction.scorersTeam1, lastSelection]);
                // Keep the menu open when making multiple selections.
                scorers1Ref.current.toggleMenu();
              }}
              options={renamePlayersIdProperty(players1)}
              placeholder={`Escoja los anotadores de ${team1.name} en este partido...`}
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
            <Form.Label>Anotadores de {team2.name}</Form.Label>
            <Typeahead
              multiple
              id="scorers2"
              onChange={(selected) => {
                scorers2SelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                scorers2Ref.current.toggleMenu();
              }}
              options={players2}
              placeholder={`Escoja los anotadores de ${team2.name} en este partido...`}
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
              placeholder={`Escoja los autores de las asistencias a los goles de ${team1.name}...`}
              ref={assists1Ref}
              selected={prediction.assistsTeam1}
              onBlur={assists1BlurHandler}
              className="is-invalid"
              isInvalid={assists1HasError}
            />
            {assists1HasError && (
              <p className="error-text">
                {" "}
                El máximo número de asistencias debe ser igual o menor que los
                goles anotados por equipo
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
              placeholder={`Escoja los autores de las asistencias a los goles de ${team2.name}...`}
              ref={assists2Ref}
              selected={prediction.assistsTeam2}
              onBlur={assists2BlurHandler}
              className="is-invalid"
              isInvalid={assists2HasError}
            />
            {assists2HasError && (
              <p className="error-text">
                {" "}
                El máximo número de asistencias debe ser igual o menor que los
                goles anotados por equipo
              </p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="mvp">
            <Form.Label>Jugador más valioso</Form.Label>
            <Typeahead
              className="is-invalid"
              isInvalid={mvpHasError}
              id="mvp"
              options={allPlayers}
              placeholder="Ingrese un jugador..."
              defaultInputValue={prediction.mvp}
              onChange={mvpSelectedHandler}
              onInputChange={mvpChangedHandler}
              onBlur={mvpBlurHandler}
            />
            {mvpHasError && <p className="error-text">Jugador no válido</p>}
          </Form.Group>
        </Col>
      </Row>
      <Link to={btnUrl}>
        <Button
          variant="outline-primary"
          onClick={sendPrediction}
          className="mt-3 mx-1"
          disabled={!isValid}
        >
          Enviar
        </Button>
      </Link>
    </Container>
  );
};

export default Match;
