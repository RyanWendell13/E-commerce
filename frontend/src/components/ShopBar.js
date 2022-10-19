import React from "react"
import {Search,Plus} from 'react-bootstrap-icons'

function ShopBar(props){
    console.log(props.id)
    return(
        <div id="InputBar">
            {/* add to cart */}
            <form action="/api/additem" method="POST" name="id" value={props.id}>
                <button name="id" value={props.id}><Plus/></button>
            </form>
            {/* go to product view */}
            <a href={`/products/${props.id}`}>
                <Search/>
            </a>
        </div>
    )
}

export default ShopBar