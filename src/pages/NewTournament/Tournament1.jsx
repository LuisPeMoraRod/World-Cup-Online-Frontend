import React, { useEffect, useState, useRef } from "react";
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
import useSelect from "../../hooks/useSelect";
import "./Tournament.scss";
import { useSelector } from "react-redux";

// characters range for the tournament name
const MIN_NAME = 5;
const MAX_NAME = 30;

//minimun amount of teams per tournament
const MIN_TEAMS = 2;

/**
 * First stage of Tournament form
 * @param {Object}: props
 *  - @tournament : new Tournament object
 *  - @updateTournament : method to update tournament's fields
 * `- @nextStep : method to go to next section of form
 * @returns
 */
const Tournament1 = ({ tournament, updateTournament, nextStep }) => {
  const nationalTeamsOptions = useSelector(
    (state) => state.catalogs.nationalTeams
  );
  const localTeamsOptions = useSelector((state) => state.catalogs.teams);
  const typesOptions = useSelector((state) => state.catalogs.types);

  const [teamsOptions, setTeamsOptions] = useState([]);

  const typeaheadRef = useRef(null);

  /**
   * Check if name is valid
   * @param {String} name
   */
  const checkName = (name) => {
    const nameLength = name.length;
    return nameLength >= MIN_NAME && nameLength <= MAX_NAME;
  };

  /**
   * Hook used to handle name input validation
   */
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useTextInput(updateTournament, checkName, "name", tournament.name);

  /**
   * Check if teams amount is valid
   * @param {Array} teams
   */
  const checkTeams = (teams) => {
    const teamsAmount = teams.length;
    return teamsAmount >= MIN_TEAMS;
  };

  /**
   * Hook used to handle teams validation
   */
  const {
    values: teams,
    isValid: teamsIsValid,
    hasError: teamsHasError,
    valueSelectedHandler: teamsSelectedHandler,
    inputBlurHandler: teamsBlurHandler,
  } = useTypeaheadMulti(
    updateTournament,
    checkTeams,
    "teams",
    tournament.teams
  );

  /**
   * Check if user already chose a type
   * @param {Object} type
   */
  const checkType = (type) => {
    return !!type;
  };

  /**
   * Hook used to handle tournament type validation
   */
  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueSelectedHandler: typeSelectedHandler,
    inputBlurHandler: typeBlurHandler,
  } = useSelect(updateTournament, checkType, "type", tournament.type);


  // set teams options depending on type
  useEffect(() => {
    console.log(type.value);
    if (type.value === 1) setTeamsOptions(nationalTeamsOptions);
    if (type.value === 2) setTeamsOptions(localTeamsOptions);
  }, [type]);

  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Creación de nuevo torneo</h3>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  defaultValue={tournament.name}
                  as="textarea"
                  rows={1}
                  placeholder="Ingrese el nombre..."
                  onChange={nameChangedHandler}
                  isInvalid={nameHasError}
                  onBlur={nameBlurHandler}
                />
                {nameHasError && (
                  <p className="error-text">
                    {" "}
                    El nombre debe tener entre 5 y 30 caracteres
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Fecha de inicio</Form.Label>
                <DatePicker
                  selected={tournament.startDate}
                  minDate={new Date()}
                  onChange={(date) => {
                    updateTournament({ startDate: date, endDate: null });
                  }}
                  placeholderText="Seleccione una fecha..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>Fecha de finalización</Form.Label>
                <DatePicker
                  selected={tournament.endDate}
                  onChange={(date) => {
                    updateTournament({ endDate: date });
                  }}
                  minDate={tournament.startDate}
                  placeholderText="Seleccione una fecha..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="tournamentType">
                <Form.Label>Tipo de torneo</Form.Label>
                <Select
                  id="tournamentType"
                  options={typesOptions}
                  placeholder="Escoja un tipo..."
                  onChange={typeSelectedHandler}
                  defaultValue={tournament.type}
                  isInvalid={typeHasError}
                  onBlur={typeBlurHandler}
                />
                {typeHasError && (
                  <p className="error-text">
                    {" "}
                    Debe seleccionar un tipo de torneo
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Form.Group className="mb-5" controlId="tournamentType">
            <Form.Label>Equipos participantes</Form.Label>
            <Typeahead
              multiple
              id="keep-menu-open"
              onChange={(selected) => {
                // updateTournament({ teams: selected });
                teamsSelectedHandler(selected);
                // Keep the menu open when making multiple selections.
                typeaheadRef.current.toggleMenu();
              }}
              options={teamsOptions}
              placeholder="Escoja los equipos..."
              ref={typeaheadRef}
              selected={tournament.teams}
              onBlur={teamsBlurHandler}
              className="is-invalid"
              isInvalid={teamsHasError}
            />
            {teamsHasError && (
              <p className="error-text">
                {" "}
                Se deben seleccionar 2 equipos como mínimo
              </p>
            )}
          </Form.Group>
        </Container>
      </Form>
      <Container>
        <Button
          variant="outline-primary"
          onClick={nextStep}
          disabled={
            !(
              nameIsValid &&
              typeIsValid &&
              teamsIsValid &&
              !!tournament.startDate &&
              !!tournament.endDate
            )
          }
        >
          Siguiente
        </Button>
      </Container>
    </div>
  );
};

export default Tournament1;
