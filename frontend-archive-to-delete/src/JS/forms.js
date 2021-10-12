import React from "react";
import ReactDOM from "react-dom";
import Client from "../JS/Client"; // importation du composant Client
import ClientForm from "../JS/clientForm";

class App extends React.Component {
  //Le composant Réact gère ses états, ses affichages, ses comportements.

  //state est un état React qui permet de stocker des données, on simule une réponse qu'aurait pu envoyer une API
  state = {
    clients: [
      { id: 1, nom: "Po Damberg" },
      { id: 2, nom: "Palpatox" },
      { id: 3, nom: "Dark Vadim" }
    ]
  };

  handleDelete = (id) => {
    //On utilise une fonction fléchée pour faciliter la gestion des this.
    console.log("id to delete", id);
    const clients = this.state.clients.slice(); // On copie le tableau afin de pouvoir le modifier puis remplacer le state par le nouveau tableau.
    const clientId = clients.findIndex(function (client) {
      return client.id === id;
    });
    clients.splice(clientId, 1);
    this.setState({ clients: clients });
  };

  handleAdd = (client) => {
    const clients = this.state.clients.slice(); // Copie du tableau clients depuis le State à modifier.
    clients.push(client); // on ajoute le client au tableau de clients
    this.setState({ clients: clients }); //On remplace le tableau clients dans le state par celui que l'on vient de modifier et on vide la valeur de nouveauClient pour effacer ce qui a été entré.
  };

  //render est la fonction au sein de App qui permet de gérer l'affichage.
  render() {
    const title = "Liste des clients";
    //on appelle ici l'état du componasant (state), on le map pour pouvoir utiliser les données qu'il contient et on écrit une fonction pour manipuler les données
    const elements = this.state.clients.map((client) => (
      <Client details={client} onDelete={this.handleDelete} /> //affichage du composant Client, défini dans Client.jsx. details est une props qui permet de faire passer la variable client au composant. onDelete est une autre props qui permet d'appeler une fonction
    ));
    //return n'affiche qu'un seul élément. Cet élément peut contenir plusieurs éléments. C'est pourquoi on englobe tout ce qu'on veut afficher dans une div.
    return (
      <div>
        <h1 class="text-primary">{title}</h1>
        {/* .bind sert à dire à la fonction handleclick qu"elle doit utiliser this dans le contexte du bouton*/}
        <ul class="text-primary">{elements}</ul>
        <ClientForm onClientAdd={this.handleAdd} />{" "}
        {/* OnClientAdd est une props qui représente une fonction à passer à l'élément ClientForm */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
