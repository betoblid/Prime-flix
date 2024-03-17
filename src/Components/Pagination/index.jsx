import { ChevronLeft, ChevronRight, IterationCw } from "lucide-react"
import "./style.css"
import { useSearchParams } from "react-router-dom"


export const Pagination = ({ max, page }) => {

    const [, setSearchParams] = useSearchParams()

    //passar uma pagina para frente com searchParams
    const NextPageMovie = () => {

        setSearchParams((params) => {
            //verificar se não vai passar do limite que a api passa de paginas
            if (params.get("page") <= max) {
                params.set("page", +page + 1)
            }
            return params //retorna o params
        })
    }

    //Retorna para pagina inicial com searchParams
    const ReturnInitialPage = () => {

        setSearchParams((params) => {
            params.set("page", 1) //retorna para pagina principal
        })
    }

    //voltar uma pagina para frente com searchParams
    const PrevPageMovie = () => {

        setSearchParams((params) => {

            if (page > 1) {

                params.set("page", page - 1)
            }
            return params
        })
    }

    return (
        <div className="container-pagination">

            <button onClick={PrevPageMovie} disabled={page <= 1 && true}>
                <ChevronLeft />
            </button>
            <button
                onClick={ReturnInitialPage}
                disabled={1 === page && true}>
                <IterationCw />
            </button>
            <button
                disabled={max <= page && true}
                onClick={NextPageMovie}>
                <ChevronRight />
            </button>
        </div>

    )
}