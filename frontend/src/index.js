//composants nécessaires à React
import React from 'react';
import ReactDOM from 'react-dom';
//BrowserRouter est le router spécifique à react qui gère le changement de page onepage
import {BrowserRouter} from "react-router-dom"; //BrowserRouter est l'élément qui permet de gérer le changement de pages dans React

//fichier de style CSS
import './style/CSS/style.css';

//chargement du fichier App qui gère le code Javascript et met en place les composants
import App from './App';

//Il est impératif que les composants du contexte englobent l'entièreté du projet pour pouvoir être pris en compte à n'importe quel niveau.
import {AuthContextProvider} from "./authentification/authContext"
import { GetPostsContextProvider } from './ApiHandling/getPostsContext';


ReactDOM.render(
  <AuthContextProvider>
    <GetPostsContextProvider>
        <BrowserRouter>
          <App />
      </ BrowserRouter>
    </GetPostsContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

