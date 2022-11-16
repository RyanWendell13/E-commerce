import React from "react"
import CartBar from "./CartBar"
import InCartCount from "./InCartCount"
import ShopBar from "./ShopBar"

interface props{
    img:string
    name:string
    price:number
    description:string
    id:number
    isInCart:boolean
}

//displays the data for an specific product
function Card(props: props){
    return(
        <div id="Card">
            <div id="Item">
                <img src={props.img} width={100} height={100}/>
                <h2>{props.name}</h2>
                <p>${props.price}</p>
                <p>{props.description}</p>
                <InCartCount id = {props.id}/>
            </div>
            {RenderBar(props)}
        </div>

        
    )
}

//swaps out the bottem bar depending on whether it is in the cart view or shop view
function RenderBar(props: props){

    if(props.isInCart == true){
        return (
            <CartBar id = {props.id}/>
        )
    }
    else{
        return (
            <ShopBar id = {props.id}/>
        )
    }
}
export default Card