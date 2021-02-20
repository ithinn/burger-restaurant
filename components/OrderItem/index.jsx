import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";
import {useRef} from "react"



function OrderItem( {data} ) {

   

    return(
        <>
        <h3>Bestilling {data.orderNumber}</h3>

        <FlexContainer flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            <ul>
                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.burger + ", " + data.burgerSize}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.bread + " brød"}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.side + ", " + data.sideSize}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.drink + ", " + data.drinkSize}/>
                </ListItem>

            </ul>

            <Button id={data.orderNumber} btnColor={data.state === "pending" ? "red" : "yellow"} txtColor="black" type="submit" >
                {data.state === "pending" ? "Klar til henting" : "Hentet" }</Button>
            
        </FlexContainer>
    
        </>
    )
}

export default OrderItem;
