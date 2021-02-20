import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";


function OrderItem( {data} ) {

    let buttonClr;
    let buttonInnerText;

    if (data.state === 1) {
        buttonClr = "red";
        buttonInnerText = "Klar til henting"
    } else if ( data.state === 2) {
        buttonClr = "yellow";
        buttonInnerText = "Hentet"
    } else {
        buttonClr = "green";
        buttonInnerText = "Fullført"
    }

    return(
        <>
        <h3>Bestilling {data.orderNumber}</h3>

        <FlexContainer flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            <ul>
                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.burgerType + ", " + data.burgerSize}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.bread + " brød"}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.sideDish + ", " + data.sideDishSize}/>
                </ListItem>

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.drink + ", " + data.drinkSize}/>
                </ListItem>

            </ul>

            <Button id={data.orderNumber} btnColor={buttonClr} txtColor="black" type="submit" >
                {buttonInnerText}
            </Button>
            
        </FlexContainer>
    
        </>
    )
}

export default OrderItem;
