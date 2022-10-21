import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Form";

const NewTournament = () => {
    return (<div className="centered">
        <h3 className="mb-5 fw-light">Crear nuevo torneo</h3>
        <Form> 
            <Form.Group className="mb-3" controlId="comments">
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
        </Form>
    </div>)
};

export default NewTournament;