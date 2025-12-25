import {Link} from "react-router-dom";
import {navItems} from "../stores/nav.tsx";

export  default  function Navigation(){
    return(
        <div className="bg-gray-800 h-10 ">
           <div className="w-100 block mx-auto h-10">
               <div className="w-full h-full grid grid-cols-4 content-center text-center gap-10 ">
                   {
                       navItems.map((item,index)=>(
                           <div key={index} className="border border-gray-700 rounded-2xl hover:bg-gray-900">
                               <Link to={item.link}>{item.name}</Link>
                           </div>
                       ))
                   }
               </div>
           </div>

        </div>
    )
}