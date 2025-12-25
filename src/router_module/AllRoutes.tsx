import {BrowserRouter,Routes,Route} from "react-router-dom";
import MasterLayout from "../Pages/MasterLayout.tsx";
import Home from "../Pages/Home.tsx";

export  default  function AllRouter(){


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MasterLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/contact" element={<div>contact</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}