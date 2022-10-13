import React from "react"
import {Cart3,Shop} from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'

function NavBar(){
    const [data, setData] = useState(null)

    //gets cart count
    useEffect(() => {
        fetch('/api/cart/count')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, []);

    return(
        <header id="NavBar">
            <h1>E-commerce</h1>
            
            <div id="NavButtons">
                {/* to shop view */}
                <a href="/">
                    <div>
                        <Shop/>
                    </div>
                </a>
                {/* to cart view */}
                <a href="/cart">
                    <div>
                        <Cart3/>
                        <p>{!data ? '?': data}</p>
                    </div>
                </a>

            </div>
        </header>
    )
}
export default NavBar