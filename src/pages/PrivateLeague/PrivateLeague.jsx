import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "../../api/axios";
import "./PrivateLeague.scss"


const NAME_REGEX =  /^[A-z0-9-_]{5,30}$/;
const TOURNAMENTS_URL = '/Tournaments';
const LEAGUE_URL = '/Leagues';

const PrivateLeague = () => {
    const username = useSelector((state) => state.user.username);
    const [window, setWindow] = useState(0);

    const nameRef = useRef();
    const tournamentRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [tournament, setTournament] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [validTournament, setValidTournament] = useState(false);
    const [tournamentFocus, setTournamentFocus] = useState(false);

    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidTournament(tournament!='');
    }, [tournament])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LEAGUE_URL,
                JSON.stringify({username, name, tournament}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            setSuccess(true);
            setName('');
            setTournament('');
            //navigate('/privateLeagues');    
            //console.log(response.data.code);
            setCode(response.data.code);
            setWindow(4);   
            console.log(code);   
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No ha habido respuesta del servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Nombre de usuario o correo ya registrado');
            } else {
                setErrMsg('Registro fallido')
            }
            errRef.current.focus();
        }
    }

    useState(() => {
        axios.get(TOURNAMENTS_URL)
          .then(res => {
            const tournamentsData = res.data;
            const result = Array.from(tournamentsData).map(element => element);
            setTournaments(result);
          })
        }
    )


    return (
        <>  {window === 0 ? (
                    <div className="options">
                        {/* AVAILABLE OPTIONS */}
                        <button
                        className="optionsButton"
                        onClick={(e) => setWindow(1)}>
                            Crear Liga Privada
                        </button>
                        <button
                        className="optionsButton"
                        onClick={(e) => setWindow(2)}>
                            Unirme a una Liga Privada
                        </button>
                        <button
                        className="optionsButton"
                        onClick={(e) => setWindow(3)}>
                            Mis Ligas Privadas
                        </button>
                    </div>
                
            ) : window === 1 ? (
                <div>
                    <form className="newLeagueForm">
                        <div className="newLeague">
                            {/* CREATE PRIVATE LEAGUE */}
                            <label className="leagueLabel" htmlFor="name">
                                Nombre de la liga: 
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}/>
                            <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                El dato ingresado debe ser entre 5 y 30 caracteres.<br />
                            </p> 


                            {/* Country*/}
                            <label htmlFor="tournament" className="tournament">
                                Torneo asociado:
                                <FontAwesomeIcon icon={faCheck} className={validTournament ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validTournament || !tournament ? "hide" : "invalid"} />
                            </label>
                            <Select
                                className="tournamentSelect"
                                id="tournament"
                                options={tournaments}
                                ref={tournamentRef}
                                placeholder="Seleccione un torneo"
                                onChange={(e) => setTournament(e?.value)}
                                aria-invalid={validTournament ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setTournamentFocus(true)}
                                onBlur={() => setTournamentFocus(false)}
                            />
                        
                            <p id="uidnote" className={tournamentFocus && tournament && !validTournament ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Debe seleccionar un torneo.<br />
                            </p>

                            <div className="formDiv">
                                <button
                                    className="formButton"
                                    onClick={(e) => setWindow(0)}>
                                        Volver
                                </button>
                                <button
                                    className="formButton"
                                    onClick={handleSubmit}
                                    disabled={ !validTournament || !validName  ? true : false}>
                                        Enviar
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            ) : window === 2 ?(
                <div>
                    <label>UNIRME LIGA PRIVADA</label>
                </div>
            ) : window === 3? (
                <div>
                    <label>MIS LIGAS PRIVADAS</label>
                </div>
            ):(
                <div className="divCreatedLeague">
                    <p className="createdLeague">Liga privada {name} creada satisfactoriamente <br/> Código de acceso: {code}</p>
                </div>
            )}
        </>
        
    )
}

export default PrivateLeague
