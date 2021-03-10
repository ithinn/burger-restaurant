import React from "react"

function Cart(handleClick, handleChange, data ) {
    console.log(data);
    return(
        <>
        <h2>Handlekurv</h2>

        
        

        <button onClick={event => sendOrder(event)} >Send inn</button>
        
        </>
       
        
    )
}

export default Cart;