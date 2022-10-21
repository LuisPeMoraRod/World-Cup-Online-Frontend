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
const Tournament1 = ({ tournament, nextStep }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Crear nuevo torneo</h3>
      <Form>
        <Container className="mb-3">
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Ingrese el nombre..."
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container className="mb-3">
          <Row>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Fecha de inicio</Form.Label>
                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                  placeholderText="Select a date..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>Fecha de finalización</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  minDate={startDate}
                  placeholderText="Select a date..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tournamentType">
                <Form.Label>Tipo de torneo</Form.Label>
                <Select
                  id="tournamentType"
                  options={TOURNAMENT_TYPES}
                  placeholder="Escoja un tipo..."
                  onChange={(e) => {
                    console.log(e);
                  }}
                  // onBlur={}
                  // defaultInputValue={}
                  // isDisabled={}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container className="mb-3">
          <Form.Group controlId="tournamentType">
            <Form.Label>Equipos participantes</Form.Label>
          </Form.Group>
        </Container>
      </Form>
    </div>
  );
};

export default Tournament1;
