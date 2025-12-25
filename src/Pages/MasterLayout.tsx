import {Outlet} from "react-router-dom"
import Navigation from "../Components/Navigation.tsx";
export  default  function MasterLayout(){
    return (
        <div className="h-screen w-screen bg-black">
            <header>
                <Navigation/>
            </header>

            <main>
                <Outlet/>
            </main>

        </div>
    )
}