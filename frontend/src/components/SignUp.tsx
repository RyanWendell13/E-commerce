import {React, useState } from "react"
import {X} from 'react-bootstrap-icons'

function SignUp(props){

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch('/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        props.close()
    }

    return(
        <div id="AccountPopup">
            <button id="ClosePopupButton" onClick={props.close}><X/></button>
            <p>Sign Up </p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input required id="email" name="email" type="text" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
                <label>Password</label>
                <input required id="password" name="password" type="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
                <input value="Submit" id="Submit" type="submit"/>
            </form>

        </div>
    )
}


export default SignUp