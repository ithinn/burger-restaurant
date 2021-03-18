
//-------------------------------------------------------/Style
import { Button } from "../StyledComponents/Button";
import { BlueH3, Pa } from "../StyledComponents/Headings"
import { InlineLi, Ul, Li } from "../StyledComponents/Lists";
import { Label } from "../StyledComponents/Labels";
import { Flex, Box } from "reflexbox/styled-components"
import { Input } from "../StyledComponents/Inputs";
//-------------------------------------------------------/config/react
import firebaseInstance from "../../config/firebase"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBasket } from "../../context/BasketContext";

function OrderItem( { handleAddOns, orderData} ) {
    const {
        register, 
        handleSubmit, 
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
                mode: "onChange",
        });
    
    const basket = useBasket();


    
    
    useEffect(() => {
        console.log(errors)
    }, [errors])


    const onSubmit = async (data, event) =>  {
     
        let id = event.target.id
        id = id.substring(0, id.length-4);

        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

        try {
            await orderRef.update({
                isOrdered: false,
                isPrepared: true
            })
        }
        catch (error) {
            console.log(error);
        }
    }


    const onDelivery = async (event) => {
   
        let id = event.target.id;
        id = id.substring(0, id.length-3);

        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

        try {
            await orderRef.update({
                isPickedUp: true,
                isPrepared: false,
                orderNumber: "-"
            })
        }
        catch (error) {
            console.log(error);
        }
        
    }

    return(
        <Flex variant="card"
            width="20em"
            as="article" 
            margin="1em" 
            bg="white" 
            height="auto" 
            justifyContent="flex-start" 
            alignItems="center" 
            flexDirection="column" 
            >

            <div>
                <BlueH3>Ordernummer: {orderData.orderNumber}</BlueH3>
            </div>


            {orderData.isOrdered && (
                <form id={orderData.id + "Form"} onSubmit={handleSubmit(onSubmit)}>

                    {orderData.orderList.map((item, index) => {
                    
                        let addOns = handleAddOns(item.addOns);
                        
                        let mappedAddOns = addOns.map(addOn => {
                            return <InlineLi>{addOn}, </InlineLi>
                        })
                    
                        
                        return (
                        <Box ml={3}>
                            <input type="hidden" value={orderData.orderId} name="orderId"/>
                            <Input id={index + item.name} type="checkbox" name={item.type} ref={register({ required: "Du må sjekke alle feltene" })}/>
                            <Label htmlFor={index + item.name} ml={3}>
                                {item.size.split(",").pop()} {item.name}
                                
                                {addOns.length > 0 && (
                                    <>
                                    <span> med </span>
                                    <Ul>
                                    {mappedAddOns}
                                    </Ul>
                                    </> )}
                            </Label>

                            {errors[item.type] && (
                                <Pa clr="#a62d2d" fontStyle="italic" textAlign="left">
                                    {errors[item.type].message}
                                </Pa>)}
                            
                        </Box>
                        )

                    })}
                    
                    <Button type="submit">Ferdig</Button>
                </form>
            )}



            {orderData.isPrepared && (
                
                <Box>
                    {orderData.orderList.map(item => {

                    let addOns = basket.listAddOns(item.addOns);
                    let mappedAddOns = addOns.map(addOn => {
                        return <InlineLi>{addOn}, </InlineLi>
                    })

                    return (
                    
                        <Box>
                            <Ul>
                                <Li listStyle="default">
                                {item.size.split(",").pop()} {item.name} 
                                {addOns.length > 0 && (
                                    <>
                                    <span> med </span>
                                    <Ul display="inline">
                                        {mappedAddOns}
                                    </Ul>
                                    </>
                                )}
                                </Li>
                            </Ul>
                            
                           
                        </Box>

                    )

                })}

                <Button width="93%" id={orderData.id+"Btn"} handleClick={event => onDelivery(event)}>Utlevert</Button>
          
                      
                
                
                </Box>

                
            )}


        </Flex>
    )
}

export default OrderItem;