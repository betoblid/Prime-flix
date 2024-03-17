import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../Components/Header"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { Loading } from "../../Components/Loading"

import "./style.css"
import { toast } from "react-toastify"

const Filmes = () => {

    const { id } = useParams() //pegar o parametro da url enviado 
    const navigation = useNavigate()   // usar para navegar para pagina principal caso não tenha o filme com id expesifico
    const [movieInfo, setMovieInfo] = useState({})  //salva as informações do filme
    const [isLoading, setIsLoading] = useState(true)    //controle de loading

    useEffect(() => {

        async function LoadMovieInfo() {
            setIsLoading(true)
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "b6914f5abde98f1f6e2de0a482f5a52c",
                    language: "pt-BR"
                }
            }).then((response) => { setMovieInfo(response.data); setIsLoading(false) })//se ocorrer tudo certo o filme será salvo no state e renderizado na tela
                .catch(() => navigation("/", {
                    replace: true //redirecionar o usuario para a pagina principal e limpar a navegação atual para ao voltar não voltar de novo
                }
                )) //se o usuário tentar digita um filme que não existe voltará para pagina principal
        }
        LoadMovieInfo() //chamando a function
    }, [id, navigation])

    const HandleSaveMovie = () => {

        if(localStorage.getItem("SaveMovie") !== null){

            let list = JSON.parse(localStorage.getItem("SaveMovie"))
            //checar se o filme está na lista antiga se sim então de um retorno e se não adicione no localstorang
            let checkexist = list.some((iten) => iten.id === movieInfo.id)//o some ele compara um item com o outro e se for engual retorna true 

            if(checkexist){
                toast.warn("Esse Filme já está na lista")
                return
            }

            localStorage.setItem("SaveMovie", JSON.stringify([...list, movieInfo]))

        }else {
            //caso não exista uma lista salva então crie essa lista e salve
            localStorage.setItem("SaveMovie", JSON.stringify([movieInfo]))
        }
        //mensagem avisando que foi salvo
        toast.success("Filme Salvo com sucesso")
    }


    return (
        <>
            {
                isLoading && <Loading />
            }
            <Header />
            <main>
                {
                    !isLoading && (

                        <div className="container-info-filme">

                            <h1>{movieInfo.title}</h1>
                            <figure>
                                <img src={`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`} alt={movieInfo.title} />
                            </figure>

                            <h3>Sinopse</h3>
                            <span>
                                {movieInfo.overview}
                            </span>

                            <strong>Avaliação: {movieInfo.vote_average.toFixed(1)} / 10</strong>

                            <div className="area-buttons">
                                <button onClick={HandleSaveMovie}>
                                    Salvar
                                </button>
                                <button>
                                    <a href={`https://youtube.com/results?search_query=${movieInfo.title} trailer`} target="_blank" rel='noreferrer'>Trailler</a>
                                </button>
                            </div>
                        </div>
                    )
                }
            </main>



        </>
    )
}

export default Filmes