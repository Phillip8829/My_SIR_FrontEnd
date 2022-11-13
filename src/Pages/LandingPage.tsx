import React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function LandingPage() {

    return(
        <Box justifyContent={'center'} display={'flex'}>
           <img  src={"/cat.gif"} />
            <Link to={"/report"}>
                <Button variant={"contained"}>Report Submit Page</Button>

            </Link>
        </Box>

    )
}