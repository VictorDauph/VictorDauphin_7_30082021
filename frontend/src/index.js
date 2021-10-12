//composants nécessaires à React
import React from 'react';
import ReactDOM from 'react-dom';
//BrowserRouter est le router spécifique à react qui gère le changement de page onepage
import {BrowserRouter} from "react-router-dom"; //BrowserRouter est l'élément qui permet de gérer le changement de pages dans React

//fichier de style CSS
import './style/CSS/style.css';

//chargement du fichier App qui gère le code Javascript et met en place les composants
import App from './App';

ReactDOM.render(
      <BrowserRouter>
      <App />
    </ BrowserRouter>,
  document.getElementById('root')
);

