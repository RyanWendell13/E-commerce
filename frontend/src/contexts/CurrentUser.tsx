import React, { createContext, SetStateAction, useEffect, useState } from "react";
import { User, UserContext } from "../types/User";

interface ContextProps {
    children: React.ReactNode
}
export const CurrentUser = createContext<UserContext>({currentUser:null, setCurrentUser:null})

function CurrentUserProvider({children}: ContextProps ){

    const [currentUser, setCurrentUser]:[User|null, React.Dispatch<SetStateAction<User|null>>] = useState<User|null>(null)
    //*
    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch('/users/profile', {
                credentials: 'include'
            })
            console.log(response)
            let user = await response.json()
            console.log(user)

            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])
    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider