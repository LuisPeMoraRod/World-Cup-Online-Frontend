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

// Raw data just for testing visualization.
// MUST be changed to Redux Store approach
const TOURNAMENT_TYPES = [
  { value: "selecciones", label: "Selecciones" },
  { value: "clubes", label: "Clubes" },
];

const TEAMS = [
  {
    label: "Qatar",
  },
  { label: "Ecuador" },
  { label: "Senegal" },
  { label: "Países Bajos" },
  { label: "Inglaterra" },
  { label: "RI de Irán" },
  { label: "EEUU" },
  { label: "Gales" },
  { label: "Argentina" },
  { label: "Arabia Saudí" },
  { label: "México" },
  { label: "Polonia" },
  { label: "Francia" },
  { label: "Dinamarca" },
  { label: "Túnez" },
  { label: "Australia" },
  { label: "España" },
  { label: "Alemania" },
  { label: "Japón" },
  { label: "Costa Rica" },
  { label: "Bélgica" },
  { label: "Canadá" },
  { label: "Marruecos" },
  { label: "Croacia" },
  { label: "Brasil" },
  { label: "Serbia" },
  { label: "Suiza" },
  { label: "Camerún" },
  { label: "Portugal" },
  { label: "Ghana" },
  { label: "Uruguay" },
  { label: "República de Corea" },
];

// characters range for the tournament name
const MIN_NAME = 5;
const MAX_NAME = 30;

/**
 * First stage of Tournament form
 * @param {Object}: props
 *  - @tournament : new Tournament object
 *  - @updateTournament : method to update tournament's fields
 * `- @nextStep : method to go to next section of form
 * @returns
 */
const Tournament1 = ({ tournament, updateTournament, nextStep }) => {
  const typeaheadRef = useRef(null);

  /**
   * Check if name is valid
   * @param {String} name
   * @returns
   */
  const checkName = (name) => {
    const nameLength = name.length;
    console.log(nameLength);
    return nameLength >= MIN_NAME && nameLength <= MAX_NAME;
  };

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useTextInput(updateTournament, checkName, "name", tournament.name);

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
                  onChange={(e) => {
                    nameChangedHandler(e.target.value);
                  }}
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
                    updateTournament({ startDate: date });
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
                  options={TOURNAMENT_TYPES}
                  placeholder="Escoja un tipo..."
                  onChange={(e) => {
                    updateTournament({ type: e });
                  }}
                  // onBlur={}
                  defaultValue={tournament.type}
                  // isDisabled={}
                />
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
                updateTournament({ teams: selected });
                // Keep the menu open when making multiple selections.
                typeaheadRef.current.toggleMenu();
              }}
              options={TEAMS}
              placeholder="Escoja los equipos..."
              ref={typeaheadRef}
              selected={tournament.teams}
            />
          </Form.Group>
        </Container>
      </Form>
      <Container>
        <Button variant="outline-primary" onClick={nextStep}>
          Siguiente
        </Button>
      </Container>
    </div>
  );
};

export default Tournament1;
