
import { Button } from "../StyledComponents/Button";
import { BlueH2, BlueH3, Paragraph } from "../StyledComponents/Headings"
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object, bool} from "yup"
import utilStyles from "../../styles/utils.module.css"
import styled from "styled-components";
import { Select } from "../StyledComponents/Inputs";
import { Label, LabelAsButton } from "../StyledComponents/Labels";
import {Flex, Box} from "reflexbox/styled-components"
import {Input, Cb, InvisibleCheckbox} from "../StyledComponents/Inputs";
import firebaseInstance from "../../config/firebase"
import { useEffect } from "react";
import { InlineLi, Ul, Li } from "../StyledComponents/Lists";


function OrderItem( {listId, orderData} ) {
    const {
        register, 
        handleSubmit, 
        reset, 
        watch, 
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
        mode: "onChange",
        defaultValues: {
           
        }
    })

    
    useEffect(() => {
        console.log(errors)
    }, [errors])

    
    function listAddOns(item) {
        let addOns = [];
        for (let add in item) {
            if (item[add] === true) {
                addOns.push(add)
            }
        }
        return addOns;
    }
    

    const onSubmit =async (data, event) =>  {
     
        let id = event.target.id
        id = id.substring(0, id.length-4);

        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

            return orderRef.update({
                isOrdered: false,
                isPrepared: true
            })
            .then(() => {
                console.log("updated")
            })
            .catch((error) => {
                console.log(error);
            })

    }


    function onDelivery(event) {
        console.log("ONDELIVERY", event.target.id);
        
        let id = event.target.id;
        id = id.substring(0, id.length-3);

        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

        return orderRef.update({
            isPickedUp: true,
            isPrepared: false,
            orderNumber: "-"
        })
        .then(() => {
            console.log("updated")
        })
        .catch((error) => {
            console.log(error);
        })
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

                    let addOns = listAddOns(item.addOns);
                    let mappedAddOns = addOns.map(addOn => {
                        return <InlineLi>{addOn}, </InlineLi>})
                    
                        
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
                            
                        </Box>
                        )

                    })}
                    
                    <Button type="submit">Ferdig</Button>
                </form>
            )}



            {orderData.isPrepared && (
                
                <Box>
                    {orderData.orderList.map(item => {

                    let addOns = listAddOns(item.addOns);
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