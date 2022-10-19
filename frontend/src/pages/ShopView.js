import React from "react"
import { useEffect, useState } from 'react'
import Card from "../components/Card"
import NavBar from "../components/NavBar"
import Login from "../components/Login"
import SignUp from "../components/SignUp"

function ShopView(){
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setData(data.products)
        })
    }, []);

    return (
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
          return(
            <Card img = {d.images[0]} name = {d.title} price = {d.price} description = {d.description} id = {d.id}  isInCart = {1}/>
          )
        })}
      </div>
  
    )
  }

export default ShopView
