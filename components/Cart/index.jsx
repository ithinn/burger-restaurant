//------------------------------------------------------------React
import React from "react"
import {useBasket} from "../../context/BasketContext";
//------------------------------------------------------------Styling
import {Box, Flex} from "reflexbox/styled-components";
import { Label } from "../StyledComponents/Labels";
import { Input } from "../StyledComponents/Inputs";
import { Button, RoundBtn } from "../StyledComponents/Button";
import { BlueH2, BlueH3, BlackH2, Pa } from "../StyledComponents/Headings";
import { Ul, Li } from "../StyledComponents/Lists";
import { SectionBase } from "../StyledComponents/Bases";


function Cart({ handleChange, handleRemove, sendOrder }) {
    let sizeText;
    const basket = useBasket();
    
    return(
        <SectionBase 
            variant="card" 
            p={3} 
            width={[1, 1/2, 1/4]} 
            position="absolute" 
            zIndices="3">
                
            <Flex 
                width="300px" 
                alignItems="center" 
                justifyContent="space-around">
                 
                <BlackH2>Handlekurv</BlackH2>
                <RoundBtn 
                    btnWidth="40px" 
                    btnHeight="40px" 
                    id="closeCartBtn" 
                    handleClick={() => basket.checkCart()}>X
                </RoundBtn>
            </Flex>

            <Box>
                {basket.productLines.length < 1 &&(
                    <Pa>Du har ikke handlet noe enda</Pa>
                )}

                <Ul>
                    {basket.productLines && (basket.productLines.map((item, index) => {
                
                        let addOns = basket.listAddOns(item.addOns);
                        let size = item.size;
                        sizeText = size.split(",").pop();

                        return (
                            <Li key={item, index}>
                                <Flex 
                                    width="300px" 
                                    flexDirection="column" 
                                    variant="card" 
                                    alignItems="center" 
                                    justifyContent="space-around" 
                                    marginBottom="2em">

    
                                    <RoundBtn 
                                        width="40px" 
                                        height="40px" 
                                        onClick={event => handleRemove(event)} 
                                        id={"removeBtn" + index}>X
                                    </RoundBtn>
                                
                                    <Box>
                                        <BlueH3 >{item.name + ", " + sizeText}  </BlueH3>
                                        <Ul padding="1em">

                                            {addOns.map(addon => {
                                                return <Li listStyle="default" key={addon}>{addon} </Li>
                                            })}

                                        </Ul>
                                    
                                        <Flex alignItems="center">
                                            <Label htmlFor={item + "inp"}>Antall: </Label>
                                            <Input 
                                                marginB="0" 
                                                inpWidth="4em" 
                                                onChange={event => handleChange(event)} 
                                                type="number" 
                                                id={"count" + index} 
                                                defaultValue={item.count}/>
                                        </Flex>

                                        <BlueH3 textAlign="left" color="#a62d2d">Pris: {item.price},-</BlueH3>
                                    </Box>
                                </Flex>
                            </Li>
                        ) 
                    }))}
                </Ul>
            </Box>

            <Flex flexDirection="column" alignItems="center">
                <BlueH2 >Total: {basket.total},-</BlueH2>
                <Button 
                    fontSize="md" 
                    handleClick={event => sendOrder(event)}>Send bestilling
                </Button>
            </Flex>

        </SectionBase>  
    )
}

export default Cart;

