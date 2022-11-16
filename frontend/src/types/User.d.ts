import React from "react"

export interface User{
_id: string
email:string
password:string
items: string[]
_v:number
}



export interface UserContext {
    currentUser: User|null
    setCurrentUser: any
}