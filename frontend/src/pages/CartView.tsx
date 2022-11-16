import React from "react"
import { useEffect, useState } from 'react'
import Card from "../components/Card"
import NavBar from "../components/NavBar"
import { Item } from "../types/Item"



function CartView():React.ReactElement{
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/cart')
        .then((res) => res.json())
        .then((data) => {
          setData(data)})
    }, []);

    return(
      <div id='App'>
        <NavBar/>
        {!data ? 'Loading...': CreateCards(data)}
      </div>
    )
}



function CreateCards(data: Item[]):React.ReactElement{
    return(
      
      <div id='ItemsList'>
        {data.map((d) => {
          return(
            <Card key = {d.id} img = {d.images[0]} name = {d.title} price = {d.price} description = {d.description} id = {d.id}  isInCart = {true}/>
          )
        })}
      </div>
  
    )
  }

export default CartView
