import React from "react"
import NavBar from "../components/NavBar"

function Error404():React.ReactElement{
    return(
        <div id='App'>
            <NavBar/>
            <h1 id="Error404">Error 404</h1>
        </div>   
    )
}

export default Error404
