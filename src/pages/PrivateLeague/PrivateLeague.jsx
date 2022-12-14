import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "../../api/axios";
import "./PrivateLeague.scss"

//constants used for validations and http requests
const NAME_REGEX =  /^[A-z0-9-_]{5,30}$/;
const ACCESSCODE_REGEX =  /^[A-z0-9-_]{1,30}$/;
const TOURNAMENTS_URL = '/League/Tournaments';
const LEAGUE_URL = '/League';
const JOIN_LEAGUE_URL = '/League/Join';

/**
 * Contains all the operations related to the process of private leagues
 * @returns private league graphic interface
 */
const PrivateLeague = () => {
    //get the username from redux
    const username = useSelector((state) => state.user.username);
    //constant used to decide which window to render
    const [window, setWindow] = useState(0);

    
    const nameRef = useRef();
    const tournamentRef = useRef();
    const accessCodeRef = useRef();
    const errRef = useRef();

    //properties for the private league
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [tournament, setTournament] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [validAccessCode, setValidAccessCode] = useState(false);
    const [accessCodeFocus, setAccessCodeFocus] = useState(false);

    const [validTournament, setValidTournament] = useState(false);
    const [tournamentFocus, setTournamentFocus] = useState(false);

    const [tournaments, setTournaments] = useState([]);

    /**
     * validate the name of the private league
     */
    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    /**
     * Validate if a tournament is selected
     */
    useEffect(() => {
        setValidTournament(tournament!='');
    }, [tournament])

    /**
     * validate the access code for a private league
     */
    useEffect(() => {
        setValidAccessCode(ACCESSCODE_REGEX.test(accessCode));
    }, [accessCode])


    /**
     * Http post used to create a private league
     * @param {*} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LEAGUE_URL,
                JSON.stringify({userid: username, name, tournamentid:tournament}),
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
            } else if (err.response?.status === 400) {
                setErrMsg('Usted ya pertenece a una liga privada en este torneo');
            } else {
                setErrMsg('Registro de liga privada fallido')
            }
            errRef.current.focus();
        }
    }

    const setDefaultValues = () =>{
        setWindow(0);
        setErrMsg('');
    }

    /**
     * Http Post used to join into a private league
     * @param {*} e 
     */
    const joinHandleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(JOIN_LEAGUE_URL,
                JSON.stringify({username,accesscode:accessCode}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            setSuccess(true);
            setAccessCode('');
            setCode(response.data.code);
            setWindow(5);   
            console.log(code);   
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El c??digo de acceso ingresado es incorrecto');
            } else if (err.response?.status === 400) {
                setErrMsg('El c??digo de acceso ingresado es incorrecto');
            }else if (err.response?.status === 409) {
                setErrMsg('Usted ya pertenece a una liga privada en este torneo');
            } else {
                setErrMsg('No se pudo unir a la liga privada')
            }
            errRef.current.focus();
        }
    }

    /**
     * Http get used to get all the active tournaments from the db
     */
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
                        <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
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
                                    onClick={setDefaultValues}>
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
                    <form className="newLeagueForm">
                        <div className="newLeague">
                            <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live="assertive">{errMsg}</p>
                            {/* JOIN PRIVATE LEAGUE */}
                            <label className="leagueLabel" htmlFor="accessCode">
                                Codigo de acceso a la liga privada: 
                                <FontAwesomeIcon icon={faCheck} className={validAccessCode ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validAccessCode || !accessCode ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="name"
                                ref={accessCodeRef}
                                autoComplete="off"
                                onChange={(e) => setAccessCode(e.target.value)}
                                value={accessCode}
                                required
                                aria-invalid={validAccessCode ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setAccessCodeFocus(true)}
                                onBlur={() => setAccessCodeFocus(false)}/>
                            <p id="uidnote" className={accessCodeFocus && accessCode && !validAccessCode ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                El codigo de acceso es requerido.<br />
                            </p> 

                            <div className="formDiv">
                                <button
                                    className="formButton"
                                    onClick={setDefaultValues}>
                                        Volver
                                </button>
                                <button
                                    className="formButton"
                                    onClick={joinHandleSubmit}
                                    disabled={ !validAccessCode  ? true : false}>
                                        Unirme
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            ) : window === 3? (
                <div>
                    <label>MIS LIGAS PRIVADAS</label>
                </div>
            ): window === 4?(
                <div className="divCreatedLeague">
                    <p className="createdLeague">Liga privada {name} creada satisfactoriamente <br/> C??digo de acceso: {code}</p>
                    <button
                        className="backButton"
                        onClick={setDefaultValues}>
                            Volver
                    </button>
                </div>

            ) : (
                <div className="divCreatedLeague">
                    <p className="createdLeague">Te has unido a la liga privada satisfactoriamente <br/> C??digo de acceso: {code}</p>
                    <button
                        className="backButton"
                        onClick={setDefaultValues}>
                            Volver
                    </button>
                </div>
            )}
        </>
        
    )
}

export default PrivateLeague
