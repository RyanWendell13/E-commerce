import React from "react"

function Login(){
    return(
        <div id="AccountPopup">
            <p>Login</p>
            <form>
                <label>Username</label>
                <input id="username" name="username" type="text"/>
                <label>Password</label>
                <input id="password" name="password" type="password"/>
                <input id="Submit" type="submit"/>
            </form>
        </div>
    )
}

export default Login