import React from "react"
import {useBasket} from "../../context/BasketContext";
import FlexContainer from "../FlexContainer"
import styled from "styled-components";
import {Box, Flex} from "reflexbox";
import {SelectLabel} from "../MenuItem";
import Button from "../Button";


const CartBase = styled.article`
    width: 100%;
    height: auto;
    background: white;
    position: absolute;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CloseCartBtn = styled.button`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    color: ${props => props.theme.colors.blue};
    background-color: white;
    border: 2px solid ${props => props.theme.colors.blue};
    position: relative;
    
    &&:hover {
        background-color: ${props => props.theme.colors.blue};
        color: white;
    }

`

const RemoveBtn = styled(CloseCartBtn)`
    position: static;
    margin-left: 1em;

`

const CartLi = styled.li`
    list-style: none;
`

const CartP = styled.p`
    font-size: 1rem;
    color: #346f83;
    font-family: "oswald";
    
`

const CartInp = styled.input`
    font-size: 1rem;
    border: 2px solid #346f83;
    color: #346f83;
    font-family: "oswald";
    width: 3em;
`


function Cart({handleChange, handleRemove, sendOrder}) {

    const basket = useBasket();

    return(
        <CartBase>
            <Flex width="300px" alignItems="center" justifyContent="space-around">
                
            
            <h2>Handlekurv</h2>

            <CloseCartBtn id="closeCartBtn" onClick={event => basket.checkCart(event)} >X</CloseCartBtn>
            </Flex>


            {basket.productLines.length < 1 &&(<CartP>Du har ikke handlet noe enda</CartP>)}

            <ul>
                {basket.productLines && (basket.productLines.map((item, index) => {
                    return (
                        
                    <CartLi key={item, index}>

                        <Flex width="300px" alignItems="center" justifyContent="space-around" marginBottom="2em">
                        
                            <div>
                                <CartP>{item.title + ", " + item.size}  </CartP>
                
                                <SelectLabel htmlFor={item + "inp"}>Velg antall: </SelectLabel>
                                <CartInp onChange={event => handleChange(event)} id={item + "inp"} type="number" id={"count" + index} placeholder="velg antall" defaultValue={item.count}/>
                            </div>
                        
                        <RemoveBtn onClick={event => handleRemove(event)} id={"removeBtn" + index}>X</RemoveBtn>
                    
                        </Flex>
                    
                    </CartLi>)
                }))}
            </ul>

            <Button onClick={event => sendOrder(event)} >Send inn</Button>
        
        </CartBase>
       
        
    )
}

export default Cart;