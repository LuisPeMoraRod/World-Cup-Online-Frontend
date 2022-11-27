import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Register.scss"
import axios from "../../api/axios";


const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const NAME_REGEX = /^([A-z0-9]){1,23}$/;
const PWD_REGEX = /^([A-z])(?=.*[0-9]).{6,8}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const REGISTER_URL = '/Users';
const COUNTRIES_URL = '/Country';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [lastName, setlastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [birthDate, setBirthDate] = useState('');
    const [validBirthDate, setValidBirthDate] = useState(false);
    const [birthDateFocus, setBirthDateFocus] = useState(false);

    const [country, setCountry] = useState('');
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);

    const [conditions, setConditions] = useState(true);
    const [validConditions, setValidConditions] = useState(false);
    const [conditionsFocus, setConditionsFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [countries, setCountries] = useState([]);
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUser(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidConditions(conditions == true);
    }, [conditions])

    useEffect(() => {
        var today = new Date();
        var birthday = new Date(birthDate);
        var age = today.getFullYear() - birthday.getFullYear();
        var month = today.getMonth() - birthday.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        setValidBirthDate(age>=18);
    }, [birthDate])

    useEffect(() => {
        setValidCountry(country!='');
    }, [country])

    useEffect(() => {
        setErrMsg('');
    }, [user, name, lastName, email, pwd, country, birthDate])

    useState(() => {
        axios.get(COUNTRIES_URL)
          .then(res => {
            const countriesData = res.data;
            const result = Array.from(countriesData).map(element => element);
            setCountries(result);
          })
        }
    )
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({username: user, name, lastName, email, countryid: country, birthDate, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            
            setSuccess(true);
            setUser('');
            setPwd('');
            setEmail('');
            setBirthDate('');
            setName('');
            setlastName('');
            setCountry('');
            navigate('/logIn')
            
            
            
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


    return (
        <div className="RegisterDiv">
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="welcome">Registro World Cup Online</h1>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <label htmlFor="username" className="registerLabel">
                    Nombre de usuario:
                    <FontAwesomeIcon icon={faCheck} className={validUser ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validUser ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Su nombre de usuario debe empezar por una letra.<br/>
                    Su nombre de usuario debe contener dos caracteres como mínimo.
                </p>


                {/* Name */}
                <label htmlFor="name" className="registerLabel">
                    Nombre:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="name"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                />
                <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Su nombre debe ser solamente con letras.<br />
                </p>


                {/* LastName */}
                <label htmlFor="lastname" className="registerLabel">
                    Apellido:
                    <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="lastname"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                    required
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                />
                <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Su apellido debe ser solamente con letras.<br />
                </p>


                {/* LastName */}
                <label htmlFor="email" className="registerLabel">
                    Correo Electrónico:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    El dato ingresado debe ser de la forma email@email.com.<br />
                </p>


                {/* Password */}
                <label htmlFor="pwd" className="registerLabel">
                    Contraseña:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="pwd"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="uidnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    La contraseña debe ser dentro de 6 y 8 caracteres.<br />
                    Debe contener un número.<br />
                    Debe contener una como mínimo una letra mayúscula y una minúscula.<br />
                </p>

                {/* Birth Date */}
                <label htmlFor="birthdate" className="registerLabel">
                    Fecha de nacimiento:
                    <FontAwesomeIcon icon={faCheck} className={validBirthDate ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validBirthDate || !birthDate ? "hide" : "invalid"} />
                </label>
                <input
                    type="date"
                    id="birthdate"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthDate}
                    required
                    aria-invalid={validBirthDate ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setBirthDateFocus(true)}
                    onBlur={() => setBirthDateFocus(false)}
                />
                <p id="uidnote" className={birthDateFocus && birthDate && !validBirthDate ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Para registrarse debe tener al menos 18 años.<br />
                </p>

                {/* Country*/}
                <label htmlFor="country" className="registerLabel">
                    País de procedencia:
                    <FontAwesomeIcon icon={faCheck} className={validCountry ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validCountry || !country ? "hide" : "invalid"} />
                </label>
                <Select
                    className="countrySelect"
                    id="country"
                    options={countries}
                    ref={userRef}
                    placeholder="Seleccione un pais"
                    onChange={(e) => setCountry(e?.value)}
                    aria-invalid={validCountry ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setCountryFocus(true)}
                    onBlur={() => setCountryFocus(false)}
                />
               
                <p id="uidnote" className={countryFocus && country && !validCountry ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Debe seleccionar un país.<br />
                </p>
                 {/* CONDITIONS */}
                <input
                    type="checkbox"
                    id="conditions"
                    ref={userRef}
                    onChange={(e) => setConditions(e.target.checked)}
                    value={conditions}
                    required
                    aria-invalid={validConditions ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setConditionsFocus(true)}
                    onBlur={() => setConditionsFocus(false)}
                />
                <label className="registerLabel">Acepto los <a href="terms&conditions" className="registerA">términos y condiciones</a> de la X-FIFA para completar mi registro</label>
                
                <p id="uidnote" className={conditionsFocus && !validConditions && !conditions ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Para poder registrarse debe aceptar los términos y condiciones .<br />
                </p>

                <button className="registerButton" disabled={ !validConditions || !validEmail || !validBirthDate || !validLastName || !validUser || !validName || !validPwd || !validCountry ? true : false}>Registrarme</button>
            </form>
            <p className="registerP">
                ¿Ya tienes cuenta?<br />
                <span className="line">
                    <a href="logIn" className="registerA">Iniciar Sesión</a>
                </span>
            </p>
            </section>
        </div>
    )
    }

export default Register
