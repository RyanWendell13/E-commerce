import React from "react"
import {Cart3,Shop} from 'react-bootstrap-icons'
import { useEffect, useState, useContext } from 'react'
import Login from "./Login"
import SignUp from "./SignUp"
import { CurrentUser } from "../contexts/CurrentUser"

function NavBar():React.ReactElement{

    const {currentUser} = useContext(CurrentUser)
    
    const [data, setData] = useState(null)
    const [hideLogin, setHideLogin] = useState(true)
    const [hideSignUp, setHideSignUp] = useState(true)
    

    function ToggleLogin(){
        setHideLogin(!hideLogin)
        setHideSignUp(true)
    }
    function ToggleSignUp(){
        setHideSignUp(!hideSignUp)
        setHideLogin(true)
    }

    //gets cart count
    useEffect(() => {
        fetch('/api/cart/count')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
    }, []);


    function manageLoginActions():React.ReactElement{
        if(currentUser){
            return(
                <b>Logged In As {currentUser.email}</b>
            )
        }
        else{
            return(
                <>
                    <button onClick={ToggleSignUp} >Signup</button>
                    <button onClick={ToggleLogin}>Login</button>
                </>
            )
        }
        
    }

    return(
        <header id="NavBar">
            <h1>E-commerce</h1>

            <div id="NavButtons">
                {manageLoginActions()}
                {/* to shop view */}
                <a href="/">
                    <div>
                        <Shop/>
                    </div>
                </a>
                {/* to cart view */}
                <a href="/cart">
                    <div>
                        <Cart3/>
                        <p>{data}</p>
                        {/* <p>{!data ? '?': data}</p> */}
                    </div>
                </a>

            </div>

            {!hideLogin &&<Login close = {ToggleLogin}/>}
            {!hideSignUp &&<SignUp close = {ToggleSignUp}/>}
        </header>
    )
}
export default NavBar