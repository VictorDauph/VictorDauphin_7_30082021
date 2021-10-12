import React, { Component } from "react";

class ClientForm extends Component {
  state = {
    nouveauClient: "" //cette donnée sert à stocker ce qu'il y'a ecris dans l'input du formulaire
  };

  handleChange = (event) => {
    const value = event.currentTarget.value; //currentTarget.value est un attribut propre aux inputs et restitue le texte contenu dazns l'input.
    this.setState({ nouveauClient: value }); //Met à jour la valeur nouveauClient du State, à chaque frappe de clavier.
  };

  handleSubmit = (event) => {
    event.preventDefault(); //empêche le rechargement de la page. comportement pas défaut du bouton
    const id = new Date().getTime(); // Contruction d'un Id unique
    const nom = this.state.nouveauClient;
    this.props.onClientAdd({ id, nom });
    this.setState({ nouveauClient: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.nouveauClient}
          onChange={this.handleChange}
          type="text"
          placeholder="Ajouter un client"
        />
        <button>Confirmer</button>
      </form>
    );
  }
}

export default ClientForm;
