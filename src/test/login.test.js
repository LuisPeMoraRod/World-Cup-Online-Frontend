import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../store/store";
import LogIn from "../pages/LogIn/LogIn";
import {BrowserRouter as Router} from 'react-router-dom';


describe('Testing <Login/> page', () => {
    let component

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Router>
                    <LogIn/>
                </Router>
            </Provider>)
    })

    test('Contains the "¡Bienvenido a World Cup Online!" title',  () => {
        expect(component.getByText('¡Bienvenido a World Cup Online!'))
    })
    
    test('Contains the "Correo Electrónico:" label',  () => {
        expect(component.getByText('Correo Electrónico:'))
    })
    
    test('Contains the "Contraseña:" title',  () => {
        expect(component.getByText('Contraseña:'))
    })
    
    test('Contains the "Registrarme" option',  () => {
        expect(component.getByText('Registrarme'))
    })
    
    test('Contains the "Iniciar Sesión" option',  () => {
        expect(component.getByText('Iniciar Sesión'))
    })
})


