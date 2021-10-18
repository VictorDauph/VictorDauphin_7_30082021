//Importation de l'élément personnalisé DropdownMenu. Cet élément affiche un menu différent en fonction de la variable HeaderType.
import CustomDropdownMenu from "./CustomDropdownMenu";

function Header(props) {
    
    //Fonction d'appel de la fonction logout depuis le contexte.

        const title= "Groupomania";
        return(
                <header className=" bg-secondary">
                    <div className="container"> 
                        <div className="raw d-flex flex-row align-items-center">
                            <div className="col-1"></div>
                            <img src="./ressources/logos/miniature-white.png" alt="logo Groupomania" class="col-1 my-3"></img>
                            <h1 className="text-light col-6">{title}</h1>
                            <div className="col-2"></div>
                            <CustomDropdownMenu headerType={props.headerType} />
                            <div className="col-1"></div>
                        </div>
                    </div>
                </header>
        );
}

export default Header