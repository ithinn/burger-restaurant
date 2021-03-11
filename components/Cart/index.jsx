import React from "react"
import {useBasket} from "../../context/BasketContext";
import FlexContainer from "../FlexContainer"
import styled from "styled-components";

const CartBase = styled.article`
    width: 100%;
    height: auto;
    background: white;
    position: absolute;
    padding: 1em;
`


function Cart({handleChange, handleRemove, sendOrder}) {

    const basket = useBasket();

    return(
        <CartBase>
            <h2>Handlekurv</h2>

            <button id="closeCartBtn" onClick={event => basket.checkCart(event)} >Lukk</button>
            
            {basket.productLines.length < 1 &&(<p>Du har ikke handlet noe enda</p>)}

            <ul>
                {basket.productLines && (basket.productLines.map((item, index) => {
                    return (
                    <li key={item, index}>
                        <p>{item.title + ", " + item.size}  </p>
                        
                        <label htmlFor={item + "inp"}>Velg antall: </label>
                        <input onChange={event => handleChange(event)} id={item + "inp"} type="number" id={"count" + index} placeholder="velg antall" defaultValue={item.count}/>
                        <button onClick={event => handleRemove(event)} id={"removeBtn" + index}>Fjern</button>
                    </li>)
                }))}
            </ul>

            <button onClick={event => sendOrder(event)} >Send inn</button>
        
        </CartBase>
       
        
    )
}

export default Cart;