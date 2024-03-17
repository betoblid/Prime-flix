import { useEffect, useState } from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { Header } from "../../Components/Header"
import { toast } from "react-toastify"

export const Favorits = () => {

    const [FavoritMovie, setFavoritMovie] = useState([])

    useEffect(() => {

        const SaveMovies = JSON.parse(localStorage.getItem("SaveMovie"))
        setFavoritMovie(SaveMovies || [])
    }, [])

    //remover o filme da lista
    const RemoveMovieList = (id) => {
        //tirar o filme com id igual ao que já está na lista
        let newList = FavoritMovie.filter((item) => item.id !== id)
        //salvar nova lista no localstorang
        localStorage.setItem("SaveMovie", JSON.stringify(newList))
        //salvar a nova lista no hook
        setFavoritMovie(newList)

        toast.success("Filme Removido com sucesso")
    }
    return (
        <>
            <Header />
            <main>

                <div className="meus-filmes">
                    <h1>Meus Favoritos</h1>

                    <ul>
                        {FavoritMovie.length < 1 && <p>Adicione filmes a lista</p>}
                        {
                            FavoritMovie && (
                                FavoritMovie.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <span>{item.title}</span>
                                            <div>
                                                <Link to={`/filmes/${item.id}`}>Ver Detalhes</Link>

                                                <button onClick={() => RemoveMovieList(item.id)}>
                                                    Excluir
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })
                            )}
                    </ul>
                </div>
            </main>
        </>
    )
}