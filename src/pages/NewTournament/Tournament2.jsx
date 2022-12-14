import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MultipleValueTextInput from "react-multivalue-text-input";
import "./Tournament.scss";
import useMultiValue from "../../hooks/useMultiValue";
import { useDispatch } from "react-redux";
import { sendNewTournament } from "../../store/slices/tournaments/actions";
import { Link } from "react-router-dom";

const ENTER = 13; //ASCII code for enter key
const MAX_DESCRIPTION = 1000; // max amount of characters in description text input

const Tournament2 = ({ tournament, updateTournament, lastStep, nextStep }) => {
  const dispatch = useDispatch();

  const [descriptionChars, setDescriptionChars] = useState(
    tournament.description.length
  ); // amount of chars typed in description

  const phases = tournament.phases;

  /**
   * Check if phases input is valid
   * @param {Array} phases
   */
  const checkPhases = (phases) => {
    return phases.length > 0;
  };

  /**
   * Hook used to handle phases input validation
   */
  const {
    isValid: phasesIsValid,
    hasError: phasesHasError,
    addItem: addPhase,
    deleteItem: deletePhase,
    inputBlurHandler: phasesBlurHandler,
    style: multiValueStyle,
  } = useMultiValue(updateTournament, checkPhases, "phases", tournament.phases);

  const sendTournament = () => {
    dispatch(sendNewTournament(tournament));
  };

  const btnUrl = phasesIsValid ? "/tournaments" : "/new-tournament";

  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Creación de nuevo torneo</h3>
      <Container>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Fases del torneo:</Form.Label>
          <MultipleValueTextInput
            name="phases"
            onItemAdded={addPhase}
            onItemDeleted={deletePhase}
            values={phases.map((phase) => phase)}
            placeholder="Digite la fase y presione la tecla 'ENTER' para agregarla..."
            charCodes={[ENTER]}
            className={multiValueStyle}
            onBlur={phasesBlurHandler}
          />
          {phasesHasError && (
            <p className="error-text">
              {" "}
              Se debe ingresar por lo menos una fase por torneo
            </p>
          )}
        </Form.Group>
      </Container>
      <Container>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Descripción de las reglas de puntuación:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Escriba aquí una descripción de las reglas de puntuación del torneo..."
            defaultValue={tournament.description}
            maxLength={MAX_DESCRIPTION}
            onChange={(e) => {
              updateTournament({ description: e.target.value }); //updates rules field in tournament object
              setDescriptionChars(e.target.value.length); //update value of text length indicator
            }}
          />
        </Form.Group>
      </Container>
      <Container className="bottom-container">
        <div className="d-flex flex-row mb-3">
          <Button
            variant="outline-secondary"
            onClick={lastStep}
            className="mt-3 mx-1"
          >
            Atrás
          </Button>

          <Link to={btnUrl}>
            <Button
              variant="outline-primary"
              onClick={sendTournament}
              className="mt-3 mr-3"
              disabled={!phasesIsValid}
            >
              Enviar
            </Button>
          </Link>
        </div>
        <h6 className="fw-light">
          {descriptionChars}/{MAX_DESCRIPTION}
        </h6>{" "}
      </Container>
    </div>
  );
};

export default Tournament2;
