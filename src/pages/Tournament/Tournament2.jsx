import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MultipleValueTextInput from "react-multivalue-text-input";

const ENTER = 13; //ASCII code for enter key

const Tournament2 = ({ tournament, updateTournament, lastStep, nextStep }) => {
  const phases = tournament.phases;

  const addPhase = (phase) => {
    updateTournament({ phases: [...tournament.phases, phase] });
  };

  const deletePhase = (deletedPhase, phases) => {
    const updatedPhases = phases.filter((phase) => phase !== deletedPhase);
    updateTournament({ phases: updatedPhases });
  };

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
          />
        </Form.Group>
      </Container>
      <Container className="d-flex flex-row mb-3">
        <Button
          variant="outline-secondary"
          onClick={lastStep}
          className="mt-3 mx-1"
        >
          Atrás
        </Button>

        <Button
          variant="outline-primary"
          onClick={nextStep}
          className="mt-3 mr-3"
        >
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default Tournament2;
