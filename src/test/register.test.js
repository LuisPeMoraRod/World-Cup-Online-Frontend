import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../store/store";
import Register from '../pages/Register/Register'
import {BrowserRouter as Router} from 'react-router-dom';


describe('Testing <Login/> page', () => {
    let component
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Router>
                    <Register/>
                </Router>
            </Provider>)
    })

    test('Contains the "Registro World Cup Online" title',  () => {
        expect(component.getByText('Registro World Cup Online'))
    })
    
    test('Contains the "Nombre de usuario:" label',  () => {
        expect(component.getByText('Nombre de usuario:'))
    })
    
    test('Contains the "Nombre:" label',  () => {
        expect(component.getByText('Nombre:'))
    })
        
    test('Contains the "Apellido:" label',  () => {
        expect(component.getByText('Apellido:'))
    })
    
    test('Contains the "Correo Electrónico:" label',  () => {
        expect(component.getByText('Correo Electrónico:'))
    })
    
    test('Contains the "Contraseña:" label',  () => {
        expect(component.getByText('Contraseña:'))
    })
    
    test('Contains the "Fecha de nacimiento:" label',  () => {
        expect(component.getByText('Fecha de nacimiento:'))
    })
    
    test('Contains the "País de procedencia:" label',  () => {
        expect(component.getByText('País de procedencia:'))
    })
    
    test('Contains the "términos y condiciones" option',  () => {
        expect(component.getByText('términos y condiciones'))
    })


})


