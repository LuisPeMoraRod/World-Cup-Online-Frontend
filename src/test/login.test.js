import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../store/store";
import LogIn from "../pages/LogIn/LogIn";
import {BrowserRouter as Router} from 'react-router-dom';

test('Contains the "¡Bienvenido a World Cup Online!" title',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <LogIn/>
                                </Router>
                            </Provider>)
    component.getByText('¡Bienvenido a World Cup Online!')
})

test('Contains the "Correo Electrónico:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <LogIn/>
                                </Router>
                            </Provider>)
    component.getByText('Correo Electrónico:')
})

test('Contains the "Contraseña:" title',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <LogIn/>
                                </Router>
                            </Provider>)
    component.getByText('Contraseña:')
})



test('Contains the "Registrarme" option',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <LogIn/>
                                </Router>
                            </Provider>)
    component.getByText('Registrarme')
})

test('Contains the "Iniciar Sesión" option',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <LogIn/>
                                </Router>
                            </Provider>)
    component.getByText('Iniciar Sesión')
})