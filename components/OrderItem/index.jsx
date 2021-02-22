import styled from "styled-components"
import Checkbox from "../Checkbox";
import Button from "../Button";
import FlexContainer from "../FlexContainer";
import ListItem from "../ListItem";


function OrderItem( {data} ) {
    console.log(data.order);

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

    let list = data.order;
    let tempList = []

    for (let i = 1; i < list.length; i++) {
       // console.log(list[i]);
        tempList.push(list[i]);

    }

    console.log(tempList);

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
    <h3>Bestilling</h3>
    <FlexContainer flexWidth="100%" flexHeight="auto" direction="row" justify="space-between" align="center">
            
         
    
        {tempList.map(item => {
            
            return(
                <ul>
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
