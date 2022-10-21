import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Tournament2 = ({ tournament, updateTournament, lastStep, nextStep }) => {
  return (
    <div className="centered">
      <h3 className="mb-5 fw-light">Creación de nuevo torneo</h3>
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
