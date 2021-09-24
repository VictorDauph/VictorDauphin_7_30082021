import React from "react";

function Client(props) {
  //Ce composant ne nécessite pas de State, il est traité comme un élément fonctionnel. Les props qui lui sont passés sont traités comme des variables.
  const details = props.details;
  {
    /* On charge la props details qui a été passée à ce composant avec la balise <Client details={client} />   */
  }
  const onDelete = props.onDelete;
  return (
    <li>
      {details.nom} <button onClick={() => onDelete(details.id)}>X</button>{" "}
      {/* onDelete(details.id) est une fonction fléchée qui appelle la méthode handleDelete via la props onDelete en luis passant l'id du client à supprimer*/}
    </li>
  );
}

export default Client;
