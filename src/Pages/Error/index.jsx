
import { Link } from "react-router-dom"
import Erro404 from "../../assets/undraw_page_not_found_re_e9o6.svg"
import "./style.css"
import { Header } from "../../Components/Header"


export const Error = () => {

    return (
        <>
            <Header />
            <main className="container-error">
                <figure>
                    <img src={Erro404} alt="Erro 404 essa pagina não existe" />
                </figure>
                <div>
                    <h2 className="title-erro">Essa pagina não foi encontrada </h2>
                    <p>Essa pagina não foi encontratada por favor volte a pagina inicial</p>
                    <Link to="/">Voltar</Link>
                </div>
            </main>
        </>
    )
}