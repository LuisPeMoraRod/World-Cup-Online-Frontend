import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";

const TOURNAMENT_TYPES = [
  { value: "selecciones", label: "Selecciones" },
  { value: "clubes", label: "Clubes" },
];

/**
 * First stage of Tournament form
 * @param {Object}: props
 *  - @tournament : new Tournament object
 *  - @updateTournament : method to update tournament's fields
 * `- @nextStep : method to go to next section of form
 * @returns
 */
const Tournament1 = ({ tournament, updateTournament, nextStep }) => {
  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Crear nuevo torneo</h3>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Ingrese el nombre..."
                  onChange={(e) => {
                    updateTournament({ name: e.target.value });
                  }}
                />
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
                  placeholderText="Select a date..."
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
                  placeholderText="Select a date..."
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
                  // defaultInputValue={}
                  // isDisabled={}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Form.Group className="mb-3" controlId="tournamentType">
            <Form.Label>Equipos participantes</Form.Label>
          </Form.Group>
        </Container>
      </Form>
    </div>
  );
};

export default Tournament1;
