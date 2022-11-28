import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../store/store";
import Register from '../pages/Register/Register'
import {BrowserRouter as Router} from 'react-router-dom';

test('Contains the "Registro World Cup Online" title',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Registro World Cup Online')
})

test('Contains the "Nombre de usuario:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Nombre de usuario:')
})

test('Contains the "Nombre:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Nombre:')
})



test('Contains the "Apellido:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Apellido:')
})

test('Contains the "Correo Electrónico:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Correo Electrónico:')
})

test('Contains the "Contraseña:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Contraseña:')
})

test('Contains the "Fecha de nacimiento:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('Fecha de nacimiento:')
})

test('Contains the "País de procedencia:" label',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('País de procedencia:')
})

test('Contains the "términos y condiciones" option',  () => {
    const component = render(
                            <Provider store={store}>
                                <Router>
                                    <Register/>
                                </Router>
                            </Provider>)
    component.getByText('términos y condiciones')
})