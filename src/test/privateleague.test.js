import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react';
import PrivateLeague from '../pages/PrivateLeague/PrivateLeague'
import { Provider } from "react-redux";
import store from "../store/store";


describe('Testing <PrivateLeagues/> page', () => {

    let component 

    beforeEach(() => {
        component = render(<Provider store={store}><PrivateLeague/></Provider>)
    })

    test('Contains the "Crear una liga" option',  () => {
        expect(component.getByText('Crear Liga Privada'))
    })
    
    test('Contains the "Unirme a una Liga Privada" option',  () => {
        expect(component.getByText('Unirme a una Liga Privada'))
    })
    
    test('Contains the "Mis Ligas Privadas" option',  () => {
        expect(component.getByText('Mis Ligas Privadas'))
    })
    
    test('Click on the "Create Private League" button and check if it contains a specific label', () => {
        const button = component.getByText('Crear Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Nombre de la liga:'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific label', () => {
        const button = component.getByText('Crear Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Torneo asociado:'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific label', () => {
        const button = component.getByText('Crear Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Enviar'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific label', () => {
        const button = component.getByText('Crear Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Volver'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific label', () => {
        const button = component.getByText('Unirme a una Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Codigo de acceso a la liga privada:'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific button', () => {
        const button = component.getByText('Unirme a una Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Volver'))
    })

    test('Click on the "Create Private League" button and check if it contains a specific button', () => {
        const button = component.getByText('Unirme a una Liga Privada')
        fireEvent.click(button);
        expect(component.getByText('Unirme'))
    })
    
})
