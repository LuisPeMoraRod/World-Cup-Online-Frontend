import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import useTextInput from "../../hooks/useTextInput";
import useTypeaheadMulti from "../../hooks/useTypeaheadMulti";
import useTypeahead from "../../hooks/useTypeahead";
import useSelect from "../../hooks/useSelect";
import { useParams } from "react-router-dom";
import "./NewMatch.scss";
import config from "../../config";
import { Link } from "react-router-dom";

const NewMatch = () => {
  // const teams = useSelector((state) => state.catalogs.teams);
  const [teams, setTeams] = useState([]);
  const { tournamentId } = useParams();

  const [tournament, setTournament] = useState([]); //state to handle tournament's data
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  // new match object
  const [match, setMatch] = useState({
    tournamentId: tournamentId,
    phase: null,
    startDatetime: null,
    location: "",
    team1: "",
    team2: "",
  });

  const parseTeams = (teams, tournamentId) => {
    const tournamentTeams = teams.filter((team) => {
      return team.tournamentid !== tournamentId;
    });
    const teamsOptions = tournamentTeams.map((team) => {
      return { ...team, label: team.teamid };
    });
    return teamsOptions
  };
  /**
   * Updates match object. Updates fields and values passed as object
   * Example: updatedRequest({phaseid: "1", location:"Doha"})
   * @param {Object} updatedFields
   */
  const updateMatch = (updatedFields) => {
    setMatch({ ...match, ...updatedFields });
  };

  useEffect(() => {
    const options = {
      method: "GET",
    };

    // get tournament's data
    fetch(config.resources.tournaments.concat(`/${tournamentId}`), options)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data);
      })
      .catch((error) => console.log(error));

    // get tournament's matches
    fetch(config.resources.teamsInTournament, options)
      .then((res) => res.json())
      .then((data) => {
        const teamsOptions = parseTeams(data, tournamentId);
        setTeams(teamsOptions);
      })
      .catch((error) => console.log(error));

    // get tournament's phases
    fetch(
      config.resources.tournaments.concat(`/Phases/${tournamentId}`),
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const updatedTournament = { ...tournament, phases: data };
        setTournament(updatedTournament);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * POST to create new match
   * @param {Object} newMatch
   */
  const sendNewMatch = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    //new match object
    const newMatch = {
      tournamentid: parseInt(match.tournamentId),
      startdate: match.startDatetime,
      starttime: match.startDatetime,
      location: match.location,
      phaseid: match.phase.value,
      team1: match.team1.teamid,
      team2: match.team2.teamid,
    };

    console.log(newMatch);

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newMatch),
    };

    return fetch(config.resources.matches, options)
      .then((response) => response)
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    setMinDate(new Date(tournament.startDate));
    setMaxDate(new Date(tournament.endDate));
  }, [tournament]);

  /**
   * Check if user already chose a phase
   * @param {Object} phase
   */
  const checkPhase = (phase) => {
    return !!phase;
  };

  /**
   * Hook used to handle match phase validation
   */
  const {
    value: phase,
    isValid: phaseIsValid,
    hasError: phaseHasError,
    valueSelectedHandler: phaseSelectedHandler,
    inputBlurHandler: phaseBlurHandler,
  } = useSelect(updateMatch, checkPhase, "phase", match.phase);

  /**
   * Check if name is valid
   * @param {String} location
   */
  const checkLocation = (location) => {
    const locationLength = location.length;
    return locationLength > 0;
  };

  /**
   * Hook used to handle name input validation
   */
  const {
    value: location,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangedHandler: locationChangedHandler,
    inputBlurHandler: locationBlurHandler,
  } = useTextInput(updateMatch, checkLocation, "location", match.location);

  /**
   * Checks if entered teams is one of the options
   * @param {Object} value
   * @param {Array} dataset
   */
  const checkTeam = (value, dataset) => {
    let isValid = false;
    dataset.forEach((item) => {
      if (item.id === value.id) isValid = true;
    });
    return isValid;
  };

  /**
   * Hook used to handle team 1 input validation
   */
  const {
    value: team1,
    isValid: team1IsValid,
    hasError: team1HasError,
    valueSelectedHandler: team1SelectedHandler,
    inputBlurHandler: team1BlurHandler,
  } = useTypeahead(updateMatch, checkTeam, "team1", match.team1, teams);

  /**
   * Hook used to handle team 2 input validation
   */
  const {
    value: team2,
    isValid: team2IsValid,
    hasError: team2HasError,
    valueSelectedHandler: team2SelectedHandler,
    inputBlurHandler: team2BlurHandler,
  } = useTypeahead(
    updateMatch,
    checkTeam,
    "team2",
    match.team2,
    teams.filter((team) => team.label !== team1.label)
  );

  return (
    <div className="centered">
      <h3 className="mb-1 fw-light">
        <b>{tournament.name}</b>
      </h3>
      <h4 className="mb-5 fw-light">Nuevo partido</h4>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="matchPhase">
                <Form.Label>Fase del torneo</Form.Label>
                <Select
                  id="matchPhase"
                  options={tournament.phases}
                  placeholder="Escoja una fase..."
                  onChange={phaseSelectedHandler}
                  defaultValue={match.phase}
                  isInvalid={phaseHasError}
                  onBlur={phaseBlurHandler}
                />
                {phaseHasError && (
                  <p className="error-text">
                    {" "}
                    Debe seleccionar una fase del torneo
                  </p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  defaultValue={match.location}
                  as="textarea"
                  rows={1}
                  placeholder="Ingrese el nombre de la sede..."
                  onChange={locationChangedHandler}
                  isInvalid={locationHasError}
                  onBlur={locationBlurHandler}
                />
                {locationHasError && (
                  <p className="error-text">
                    {" "}
                    El nombre de la sede no es válido
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="startDatetime">
                <Form.Label>Fecha y hora de inicio (UTC)</Form.Label>
                <DatePicker
                  selected={match.startDatetime}
                  minDate={new Date(tournament.startDate)}
                  maxDate={new Date(tournament.endDate)}
                  onChange={(date) => {
                    updateMatch({ startDatetime: date });
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy HH:mm"
                  placeholderText="Seleccione una fecha y hora..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="team1">
                <Form.Label>Equipo 1</Form.Label>
                <Typeahead
                  className="is-invalid"
                  isInvalid={team1HasError}
                  id="team1"
                  options={teams.filter((team) => team.label !== team2.label)}
                  placeholder="Ingrese un equipo"
                  defaultInputValue={match.team1}
                  onChange={team1SelectedHandler}
                  onBlur={team1BlurHandler}
                />
                {team1HasError && (
                  <p className="error-text">Equipo no válido</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="team2">
                <Form.Label>Equipo 2</Form.Label>
                <Typeahead
                  className="is-invalid"
                  isInvalid={team2HasError}
                  id="team2"
                  options={teams.filter((team) => team.label !== team1.label)}
                  placeholder="Ingrese un equipo"
                  defaultInputValue={match.team2}
                  onChange={team2SelectedHandler}
                  onBlur={team2BlurHandler}
                />
                {team2HasError && (
                  <p className="error-text">Equipo no válido</p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <Container>
        <Link to={`/tournaments/${tournamentId}/matches`}>
          <Button
            variant="outline-primary"
            onClick={sendNewMatch}
            disabled={
              phaseHasError ||
              locationHasError ||
              !match.startDatetime ||
              team1HasError ||
              team2HasError
            }
          >
            Enviar
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default NewMatch;
