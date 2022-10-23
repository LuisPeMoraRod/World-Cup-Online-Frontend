import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { TimePicker } from 'react-ios-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";


const STAGES = [
  { label: "Fase de grupos",},
  { label: "Octavos de final" },
  { label: "Cuartos de final" },
  { label: "Semifinales" },
  { label: "Final" },
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

  
/**
 * Stage of Match form
 * @param {Object}: props
 *  - @Match : new match object
 *  - @updateMatch : method to update macth fields
 * `- @nextStep : method to go to next section of form
 * @returns
 */
const Match1 = ({ match, updateMatch }) => {
  const typeaheadRef = useRef(null);
  const [value, setValue] = useState('10:00');
  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Creación de un nuevo partido</h3>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Fecha de inicio</Form.Label>
                <DatePicker
                  selected={match.startDate}
                  minDate={new Date()}
                  onChange={(date) => {
                    updateMatch({ startDate: date });
                  }}
                  placeholderText="Seleccione una fecha..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="startTime">
                <Form.Label>Hora de inicio UTC</Form.Label>
                <TimePicker
                  onChange={(time) => {
                    updateMatch({ startTime: time });
                  }} value={match.startTime}
                  placeholderText="Seleccione una hora..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="matchStage">
                <Form.Label>Fase del torneo</Form.Label>
                <Select
                  id="stage"
                  options={STAGES}
                  placeholder="Escoja una fase..."
                  onChange={(e) => {
                    updateMatch({ stage: e });
                  }}
                  // onBlur={}
                  defaultValue={match.stage}
                  // isDisabled={}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <Container>
          <Col>
            <Form.Group className="mb-3" controlId="matchStage">
                <Form.Label>Equipo A</Form.Label>
                <Select
                  id="stage"
                  options={TEAMS}
                  placeholder="Escoja el equipo A..."
                  onChange={(e) => {
                    updateMatch({ teamA: e });
                  }}
                  // onBlur={}
                  defaultValue={match.teamA}
                  // isDisabled={}
                />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="matchStage">
                <Form.Label>Equipo B</Form.Label>
                <Select
                  id="stage"
                  options={TEAMS}
                  placeholder="Escoja el equipo B..."
                  onChange={(e) => {
                    updateMatch({ teamB: e });
                  }}
                  // onBlur={}
                  defaultValue={match.teamB}
                  // isDisabled={}
                />
            </Form.Group>
          </Col>
        </Container>
      </Form>
      <Button
            variant="outline-primary"
            className="mt-3 mr-5">
            Enviar
      </Button>
    </div>
  );
};

export default Match1;