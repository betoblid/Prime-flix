import { Link } from "react-router-dom"


import "./style.css"

export const Header = () => {

    return(
        <header className="container-header">
            <Link to="/" className="logo">PrimeFlix</Link>

            <Link to="/favorits" className="favorit" >Meus Filmes</Link>
        </header>
    )
}