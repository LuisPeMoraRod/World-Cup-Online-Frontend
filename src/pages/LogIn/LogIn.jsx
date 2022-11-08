import { useRef, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user/userSlice";
import "./LogIn.scss"

const LogIn = () => {

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.focus();
    }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        dispatch(
            login({
                email: email,
                password: pwd,
                loggedIn: true
            })
        )
        setEmail('');
        setPwd('');
    }

    return (
        <div className="LogIn">
            <section> 
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>¡Bienvenido a World Cup Online!</h1>
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
                    <a href="#">Registrarme</a>
                </span>
            </p>
            </section>
        </div>
    )
}

export default LogIn