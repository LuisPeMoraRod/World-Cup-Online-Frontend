import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./LogIn.scss"
import axios from "../../api/axios";
const LOGIN_URL = '/auth';

const LogIn = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])
    
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
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            navigate(from, { from:true })

        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Correo electrónico o contraseña faltantes');
            } else if (err.response?.status === 401) {
                setErrMsg('No Autorizado');
            } else {
                setErrMsg('Inicio de sesión fallido');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="LogIn"> 
            <section className="logInForm"> 
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="welcome">¡Bienvenido a World Cup Online!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Iniciar Sesión</button>
            </form>
            <p>
                ¿Aún no tienes una cuenta? Regístrate ahora <br/>
                <span className="line">
                    {/**put router link here*/}
                    <a className="register" href="#">Registrarme</a>
                </span>
            </p>
            </section>
        </div>
    )
}

export default LogIn