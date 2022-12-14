import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./LogIn.scss"
import axios from "../../api/axios";
import { userActions } from "../../store/slices/user/user";
import { useDispatch } from "react-redux";

//constants used for validations and http requests
const LOGIN_URL = 'Users/Auth';
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

/**
 * Contains all the operations related to the process of log in
 * @returns login graphic interface
 */
const LogIn = () => {
    
    const dispatch = useDispatch();

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])
    
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const res = response?.data;
            dispatch(userActions.setUsername(res.username)) //ser user name in redux-store
            if (res.username === "luismorarod9") dispatch(userActions.setIsAdmin(true));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            navigate('/tournaments')

        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Correo electr??nico o contrase??a incorrectos');
            } else if (err.response?.status === 401) {
                setErrMsg('No Autorizado');
            } else {
                setErrMsg('Inicio de sesi??n fallido');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="LogIn"> 
            <section className="logInForm"> 
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="welcome">??Bienvenido a World Cup Online!</h1>
            <form className="logInForm" onSubmit={handleSubmit}>
                <label className="logInLabel" htmlFor="email">
                    Correo Electr??nico:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}/>
                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    El dato ingresado debe ser de la forma email@email.com.<br />
                </p>    
                <label className="logInLabel" htmlFor="pwd">
                    Contrase??a:
                </label>
                <input
                    type="password"
                    id="pwd"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <button className="logInButton" disabled={ !validEmail  ? true : false}>Iniciar Sesi??n</button>
            </form>
            <p className="registerText">
                ??A??n no tienes una cuenta? Reg??strate ahora <br/>
                <span className="line">
                    <a className="register" href="register">Registrarme</a>
                </span>
            </p>
            </section>
        </div>
    )
}

export default LogIn