import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";


function OrderItem( {data} ) {
    

    let buttonClr;
    let buttonInnerText;

    if (data.order.state === 1) {
        buttonClr = "red";
        buttonInnerText = "Klar til henting"
    } else if ( data.order.state === 2) {
        buttonClr = "yellow";
        buttonInnerText = "Hentet"
    } else {
        buttonClr = "green";
        buttonInnerText = "Fullført"
    }

    let list = data.order;
    let tempList = []

    for (let i = 0; i < list.length; i++) {
       // console.log(list[i]);
        tempList.push(list[i]);

    }

    //console.log(tempList);

    //console.log(orderList);

/*
    return(
        <>
     
        <FlexContainer flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            
            
            <ul>
                { data.burger !== undefined ?

                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.burgerType + ", " + data.burgerSize}/>
                </ListItem> : null}

                { data.bread !== undefined ?
                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.bread + " brød"}/>
                </ListItem> : null}
                
                { data.sideDish !== undefined ?
                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.sideDish + ", " + data.sideDishSize}/>
                </ListItem> : null}
                
                { data.drink !== undefined ?
                <ListItem>
                    <Checkbox className="orderCheckbox" labelText={data.drink + ", " + data.drinkSize}/>
                </ListItem> : null}

            </ul>

            <Button id={data.orderNumber} btnColor={buttonClr} txtColor="black" type="submit" >
                {buttonInnerText}
            </Button>
            
        </FlexContainer>
    
        </>
    )*/
    return(<>
    <h3>{"Bestilling" + " " + data.order.orderNumber}</h3>
    <FlexContainer border="1px solid black" flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            
         
    
        {data.order.orderList.map((item, index) => {
            
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
    

    
    </>)
}

export default OrderItem;
