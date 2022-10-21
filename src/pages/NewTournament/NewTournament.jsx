import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewTournament = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (<div className="centered">
        <h3 className="mb-5 fw-light">Crear nuevo torneo</h3>
        <Form>
            <Form.Group className="mb-3" controlId="name">
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
            <Row>
                <Form.Group as={Col} controlId="startDate">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <DatePicker selected={startDate} onChange={(date) => { console.log(date); setStartDate(date); }} />
                </Form.Group>

            </Row>
        </Form>
    </div>)
};

export default NewTournament;