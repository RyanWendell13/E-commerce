import {React, useContext, useState } from "react"
import { CurrentUser } from "../contexts/CurrentUser"
import {X} from 'react-bootstrap-icons'

function Login(){
    const {setCurrentUser} = useContext(CurrentUser)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch('/users/authentication/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()

        if(response.status === 200){
            setCurrentUser(data.user)
            console.log('Logged in')
        }
        else{
            setErrorMessage(data.message)
        }
    }
    return(
        <div id="AccountPopup">
            {/* <button id="ClosePopupButton"><X/></button> */}
            <p>Login</p>
            <p>Login and Signup don't work yet</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input required id="email" name="email" type="text" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
                <label>Password</label>
                <input required id="password" name="password" type="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
                {errorMessage !== null ? <p color="red">{errorMessage}</p>:null}
                <input value="Submit" id="Submit" type="submit"/>
            </form>
        </div>
    )
}

export default Login