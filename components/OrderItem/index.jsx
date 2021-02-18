import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";


function OrderItem( {labelText, size} ) {
    return(
        <>
        <h3>Bestilling 302</h3>

        <FlexContainer flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            <ul>
                <ListItem><Checkbox labelText={labelText + ", " + size}/></ListItem>
                <ListItem><Checkbox labelText={"Cola" + ", " + size}/></ListItem>
                <ListItem><Checkbox labelText={"Pommes Frites" + ", " + size}/></ListItem>
            </ul>

            <Button btnColor="white" txtColor="black">Ferdig</Button>
            
        </FlexContainer>
    
        </>
    )
}

export default OrderItem;