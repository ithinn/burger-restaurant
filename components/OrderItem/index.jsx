import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";


function OrderItem( {data, userData} ) {
    
    console.log(userData);
/*
    let buttonClr;
    let buttonInnerText;
    let userName;

    userData.forEach(user => {
        if (user.id === data.content.order.userId) {
            console.log(user.name);
            userName = user.name
        }
    })


    if (data.content.state === 1) {
        buttonClr = "red";
        buttonInnerText = "Klar til henting"
    } else if ( data.content.state === 2) {
        buttonClr = "yellow";
        buttonInnerText = "Hentet"
    } else {
        buttonClr = "green";
        buttonInnerText = "Fullført"
    }

   */
    return(<>
    <h3>test</h3>

    {/*
    <h3>{"Bestillingsreferanse:" + " " + data.orderId}</h3>
    <p>{"Kunde:" + " " + userName }</p>
    <p>{"Kundenummer:" + " " + data.content.order.userId }</p>

    <FlexContainer border="1px solid black" flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            
        {data.content.order.orderList.map((item, index) => {
            
            return(
                <ul key={"key" + index}>
                { item.burgerType !== null  ?

                    <ListItem>
                        <Checkbox className="orderCheckbox" labelText={item.burgerType + "burger, " + item.burgerSize}/>
                    </ListItem> : null}
    
                    { item.bread !== null  ?
                    <ListItem>
                        <Checkbox className="orderCheckbox" labelText={item.bread + " brød"}/>
                    </ListItem> : null}
                    
                    { item.sideDish !== null || item.sideDish !== null ?
                    <ListItem>
                        <Checkbox className="orderCheckbox" labelText={item.sideDish + ", " + item.sideDishSize}/>
                    </ListItem> : null}
                    
                    { item.drink !== null ?
                    <ListItem>
                        <Checkbox className="orderCheckbox" labelText={item.drink + ", " + item.drinkSize}/>
                    </ListItem> : null}
    
                    </ul>
            )
        })}
    
    </FlexContainer>
    
*/}
    
    </>)
}

export default OrderItem;
