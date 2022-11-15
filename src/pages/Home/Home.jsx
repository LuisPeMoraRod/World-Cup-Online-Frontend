// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { logout, selectUser } from '../../store/slices/user/userSlice';

// const Home = () => {
//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();
//     const handleLogOut = (e) => {
//         e.preventDefault();
//         dispatch(logout());
//     }

//     return (
//         <div>
//             <h1>Bienvenido {user.email}</h1>
//             <button onClick={(e) => handleLogOut(e)}>Cerrar Sesión</button>
//         </div>

//     )
// }

// export default Home