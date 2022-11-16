import React from "react"
import {Search,Dash} from 'react-bootstrap-icons'

//bar for cart view
function CartBar(props){
    return(
        <div id="InputBar">
            {/* removes from cart */}
            <form method="POST" action= '/api/removeitem?_method=DELETE'> 
                <button name="id" value={props.id}><Dash/></button>
            </form>
            {/* changes the count of the item in cart */}
            <form method="POST" action= {`/api/cart/count/${props.id}?_method=PUT`}>
                <input type="number" name="count" min="0"/>
            </form>
            {/* go to product view */}
            <a href={`/products/${props.id}`}>
                <Search/>
            </a>
        </div>
    )
}
export default CartBar