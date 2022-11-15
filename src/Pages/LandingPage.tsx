import React from 'react';
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function LandingPage() {

    return(
        <Box sx={{ paddingLeft: 2, borderBottom: 1, textAlign: "Center" }}>
           <img  src={"/cat.gif"}  alt={""}/>
            <div className={"Links"} style={{backgroundColor: "yellow" , padding: 30, color: "Black"}}>
                <img style={{backgroundColor: "black", padding: 5}} src={"https://afcwebsite.blob.core.usgovcloudapi.net/uploads/assets/sf_logo_1c_776c839b0c.svg"}/>
                <div>
                    <Link  style={{color: "inherit", padding: 20}}  to={"/"}>Home Page</Link>
                    <Link style={{color: "inherit", padding: 20}} to={"/Report"}>Submit SIR Report</Link>
                    <Link style={{color: "inherit", padding: 20}} to={"/SupervisorView"}>View All SIR Report</Link>
                </div>
                <img  src={"/cat.gif"}  alt={""}/>        <img  src={"/cat.gif"}  alt={""}/>         <img  src={"/cat.gif"}  alt={""}/>
                <img  src={"/cat.gif"}  alt={""}/>        <img  src={"/cat.gif"}  alt={""}/>
            </div>
        </Box>

    )
}