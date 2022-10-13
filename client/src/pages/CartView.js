import React from "react"
import { useEffect, useState } from 'react'
import Card from "../components/Card"
import NavBar from "../components/NavBar"


function CartView(){
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
function CreateCards(data){
    return(
      <div id='ItemsList'>
        {data.map((d) => {
          console.log (data)
          return(
            <Card img = {d.images[0]} name = {d.title} price = {d.price} description = {d.description} id = {d.id}  isInCart = {0}/>
          )
        })}
      </div>
  
    )
  }

export default CartView
