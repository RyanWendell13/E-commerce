import {Search,Plus} from 'react-bootstrap-icons'

interface props{
    id: number
}

function ShopBar(props:props){
    return(
        <div id="InputBar">
            {/* add to cart */}
            <form action="/api/additem" method="POST" name="id">
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