import { Col, Container, Form, Row } from "react-bootstrap";
import{MatchInputSelectPhase,MatchInputText, MatchInputSelectTeamB, MatchInputDate, MatchInputTime, MatchInputSelectTeamA} from "..//..//components/MatchInputs/MatchInputs";
import React, {useState} from "react";
import "./Match.scss";


const PHASES = [
    { id: "1", label: "Fase 1",},
    { id: "2", label: "Fase 2" },
    { id: "3", label: "Fase 3" },
    { id: "4", label: "Fase 4" },
];

const TEAMS = [
    { id: "Qat", label: "Qatar",},
    { id: "ECU", label: "Ecuador" },
    { id: "SEN", label: "Senegal" },
    { id: "NED", label: "Países Bajos" },
];

/**
 * Form required to register a match
 * @returns 
 */
const Match = () => {
    /**
   * Sets @macth object initial values.
   * If match already exists, it returns the same object
   * If null, creates a new object with initial values
   * @param {Object} match
   * @returns {Object} match object to be edited in form
   */
    const initMatch = (match) => {
        const newMatch = {
            teama: "",
            teamb: "",
            startdate:"",
            starttime:"",
            location:"",
            phase: "",
            admin:""
        };
        return !!match ? match : newMatch;
      };
    
    /**
     * match object
     */
    const [match, setMatch] = useState(initMatch)

    /**
   * Updates match object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateMatch = (updatedFields) => {
        setMatch({ ...match, ...updatedFields });
    };

    return <div className="Match">
        <form>
            <h2 className="title">Crear partido</h2>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="Location">
                            <label>Sede*</label>
                            <MatchInputText 
                            placeholder="Digite la sede del partido"
                            updateMatch={updateMatch}
                            errorMessage="La sede no puede ser un espacio vacio"
                            match={match}/> 
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="Phase">
                            <label>Fase del torneo*</label>
                            <MatchInputSelectPhase
                            options={PHASES} 
                            placeholder="Seleccione la fase del torneo"
                            updateMatch={updateMatch}
                            errorMessage="Debe seleccionar una fase"
                            match={match}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="Date">
                            <label>Fecha del partido*</label>
                            <MatchInputDate
                            placeholder="Seleccione la fecha del partido"
                            updateMatch={updateMatch}
                            errorMessage="Debe elegir una fecha para el partido"
                            match={match}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="Date">
                            <label>Hora del partido UTC* </label>
                            <MatchInputTime 
                            placeholder="Seleccione la hora del partido"
                            updateMatch={updateMatch}
                            errorMessage="Debe elegir una hora para el partido"
                            match={match}/>
                        </Form.Group>
                    </Col>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="TeamA">
                            <label>Equipo A*</label>
                            <MatchInputSelectTeamA
                            options={TEAMS}  
                            placeholder="Seleccione el primer equipo"
                            updateMatch={updateMatch}
                            errorMessage="Debe seleccionar un equipo"
                            match={match}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="TeamB">
                            <label>Equipo B*</label>
                            <MatchInputSelectTeamB
                            options={TEAMS}  
                            placeholder="Seleccione el segundo equipo"
                            updateMatch={updateMatch}
                            errorMessage="Debe seleccionar un equipo"
                            match={match}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            <button>Crear partido</button>
        </form>
    </div>
}

export default Match;