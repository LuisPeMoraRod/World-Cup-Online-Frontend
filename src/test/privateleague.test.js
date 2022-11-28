import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import PrivateLeague from '../pages/PrivateLeague/PrivateLeague'
import { Provider } from "react-redux";
import store from "../store/store";

test('Contains the "Crear una liga" option',  () => {
    const component = render(<Provider store={store}><PrivateLeague/></Provider>)
    component.getByText('Crear Liga Privada')
})

test('Contains the "Unirme a una Liga Privada" option',  () => {
    const component = render(<Provider store={store}><PrivateLeague/></Provider>)
    component.getByText('Unirme a una Liga Privada')
})

test('Contains the "Mis Ligas Privadas" option',  () => {
    const component = render(<Provider store={store}><PrivateLeague/></Provider>)
    component.getByText('Mis Ligas Privadas')
})

