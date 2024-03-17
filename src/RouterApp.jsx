import { Error } from "./Pages/Error";
import { Favorits } from "./Pages/Favorits";
import Filmes from "./Pages/Filmes";
import  Home  from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RouterApp = () => {

    return(
        <BrowserRouter>
        
            <Routes>
                <Route  path="/" element={< Home />}/>
                 <Route path="/filmes/:id" element={<Filmes />}/>
                 <Route path="/favorits" element={<Favorits />}/>
                 <Route path="*" element={<Error />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default RouterApp