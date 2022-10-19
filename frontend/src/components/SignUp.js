import React from "react"

function SignUp(){
    return(
        <div id="AccountPopup">
            <p>Sign Up</p>
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


export default SignUp