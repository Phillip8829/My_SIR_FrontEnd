import * as React from 'react';
import {Link} from "react-router-dom";


export default function ButtonAppBar() {
    return (

       <div>

           <div className={"Links"} style={{backgroundColor: "#FFF500" , padding: 30, color: "Black"}}>
               <h1 style={{textDecoration: "underline"}}>Capstone Project</h1>
               <img style={{backgroundColor: "black", padding: 5}} src={"https://afcwebsite.blob.core.usgovcloudapi.net/uploads/assets/sf_logo_1c_776c839b0c.svg"} alt={""}/>
               <div>
                   <Link  style={{color: "inherit", padding: 20}}  to={"/"}>Home Page</Link>
                   <Link style={{color: "inherit", padding: 20}} to={"/Report"}>Submit SIR Report</Link>
                   <Link style={{color: "inherit", padding: 20}} to={"/SupervisorView"}>View All SIR Report</Link>
               </div>

           </div>
       </div>

    );
}