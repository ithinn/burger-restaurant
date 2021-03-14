import React from "react"
import {useBasket} from "../../context/BasketContext";
import FlexContainer from "../FlexContainer"
import styled from "styled-components";
import {Box, Flex} from "reflexbox";
import { Label } from "../StyledComponents/Labels";
import { Button, RoundButton } from "../StyledComponents/Button";
import { BlueH2, BlueH3, BlackH2 } from "../StyledComponents/Headings";
import { Li } from "../StyledComponents/Lists";

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
    
   

`

const RemoveBtn = styled(CloseCartBtn)`
    position: static;
    margin-left: 1em;

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

let addOnTest = [];
let sizeIndex;
let sizeText;

function Cart({handleChange, handleRemove, sendOrder, foodData}) {

    const basket = useBasket();
    
 
    function listAddOns(item) {
        let addOns = [];
        for (let add in item) {
            if (item[add] === true) {
                addOns.push(add)
            }
        }

        return addOns;
    }


    function findPrice(index, course) {
        
        let price;
        let addOns = listAddOns(course.addOns);
        let addOnsPrice = (15 * addOns.length);

        //Uses index to get the right price for this course from the database
        foodData.forEach(item => {
    
            item.details.forEach(el => {
                if (el.name === course.name) {
                    price = el.prices[index] 
                }
            })
        })

        price = (Number(price) + addOnsPrice) * course.count;

        basket.addSum(course.name, price);
   
        return(<BlueH3>{price},- </BlueH3>)
    }

  
    return(
        <CartBase>
            <Flex width="300px" alignItems="center" justifyContent="space-around"> 

                <BlackH2>Handlekurv</BlackH2>
                <RoundButton btnWidth="40px" btnHeight="40px" id="closeCartBtn" onClick={event => basket.checkCart(event)} >X</RoundButton>

            </Flex>


            {basket.productLines.length < 1 &&(<CartP>Du har ikke handlet noe enda</CartP>)}

            <ul>
                {basket.productLines && (basket.productLines.map((item, index) => {

                    let addOns = listAddOns(item.addOns);
                    let size = item.size;
                    sizeIndex = item.size.charAt(0);
                    sizeText = size.split(",").pop();

                return (
                        
                    <Li key={item, index}>
                        <Flex width="300px" alignItems="center" justifyContent="space-around" marginBottom="2em">
                        
                            <div>
                                <BlueH3>{item.name + ", " + sizeText}  </BlueH3>
                                <ul>
                                {addOns.map(addon => {
                                    return <Li key={addon}>{addon}</Li>
                                })}
                                </ul>
                                
                                <Label htmlFor={item + "inp"}>Velg antall: </Label>
                                <CartInp onChange={event => handleChange(event)} id={item + "inp"} type="number" id={"count" + index} placeholder="velg antall" defaultValue={item.count}/>
                            </div>

                            {findPrice(sizeIndex, item)}
                        
                        <RemoveBtn onClick={event => handleRemove(event)} id={"removeBtn" + index}>X</RemoveBtn>
                                
                        </Flex>

                        
                    
                    </Li>)
                }))}
            </ul>

            

            <Button handleClick={event => sendOrder(event)} >Send inn</Button>
        
        </CartBase>
       
        
    )
}

export default Cart;