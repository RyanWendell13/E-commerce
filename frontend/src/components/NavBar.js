import React from "react"
import {Cart3,Shop} from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import Login from "./Login"
import SignUp from "./SignUp"

function NavBar(){
    const [data, setData] = useState(null)
    const [hideLogin, setHideLogin] = useState(true)
    const [hideSignUp, setHideSignUp] = useState(true)

    


    function ToggleLogin(){
        setHideLogin(!hideLogin)
    }
    function ToggleSignUp(){
        setHideSignUp(!hideSignUp)
    }

    //gets cart count
    useEffect(() => {
        fetch('/api/cart/count')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, []);

    return(
        <header id="NavBar">
            <h1>E-commerce</h1>

            <div id="NavButtons">
                {/* to signup view */}
                <button onClick={ToggleSignUp} >
                    signup
                </button>
                {/*login popup */}
                <button onClick={ToggleLogin}>
                    login
                </button>
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
                        <p>{!data ? '?': data}</p>
                    </div>
                </a>

            </div>

            {!hideLogin &&<Login/>}
            {!hideSignUp &&<SignUp/>}
        </header>
    )
}
export default NavBar