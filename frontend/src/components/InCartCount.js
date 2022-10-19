import { useEffect, useState } from 'react'

function InCartCount(props){

    const [data, setData] = useState(null)
    //gets the count for the specific item it represents
    useEffect(() => {
        fetch(`/api/cart/count/${props.id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
    }, []);

    return(
        <>
            <p>In Cart: {!data ? 'Loading...': data}</p>
        </>
    )
}
export default InCartCount