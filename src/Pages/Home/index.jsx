import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import api from "../../services/api";
import { Link, useSearchParams } from "react-router-dom";
import "./Home.css"
import { Loading } from "../../Components/Loading";
import { Pagination } from "../../Components/Pagination";

const Home = () => {
    const [searchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function LoadMovies() {

            await api.get("movie/now_playing", {
                params: {
                    api_key: "b6914f5abde98f1f6e2de0a482f5a52c",
                    page: searchParams.get("page") === null ? 1 : searchParams.get("page"), //verificar se tem um SearchParams se não tiver retorn 1 
                    language: "pt-BR"
                }
            }).then((response) =>setMovies(response.data))
            setIsLoading(false) //trocar o stado de loading para concluido
        }
        LoadMovies()
    }, [movies])
    return (
        <>
            <Header />
            <div className="container">
                <div className="list-filmes">

                    {
                        isLoading && <Loading />
                    }
                    {
                        !isLoading && movies.results.map((movie) => {
                            return (
                                <article key={movie.id}>

                                    <strong>{movie.title}</strong>
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                    <Link to={`/filmes/${movie.id}`}>Acessar</Link>

                                </article>
                            )
                        })
                    }

                </div>
               
            </div>
             <Pagination max={movies.total_pages} page={movies.page}/>
        </>
    )
}

export default Home;