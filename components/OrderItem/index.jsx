
import { Button } from "../StyledComponents/Button";
import { BlueH2, BlueH3, Paragraph } from "../StyledComponents/Headings"
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object, bool} from "yup"
import utilStyles from "../../styles/utils.module.css"
import styled from "styled-components";
import { Select } from "../StyledComponents/Inputs";
import { Label, LabelAsButton } from "../StyledComponents/Labels";
import {Flex, Box} from "reflexbox"
import {Input, Cb, InvisibleCheckbox} from "../StyledComponents/Inputs";
import firebaseInstance from "../../config/firebase"
import { useEffect } from "react";
import { InlineLi, Ul, Li } from "../StyledComponents/Lists";


const schema = object().shape({
    /*
    beefBurger: bool().required("Må være checked"),
    chickenBurger: bool().required("Må være checked"),
    soyBurger: bool().required("Må være checked"),
    fishBurger: bool().required("Må være checked"),
    sprite: bool().required("Må være checked"),
    fanta: bool().required("Må være checked"),
    cocaCola: bool().required("Må være checked"),
    sweetPotatoe: bool().required("Må være checked"),
    salad: bool().required("Må være checked"),
    pommesFrites: bool().required("Må være checked"),
   */
})


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
           
        },
        resolver: yupResolver(schema)
    })

    
    useEffect(() => {
        console.log(errors)
    }, [errors])

    

    const onSubmit =async (data, event) =>  {
        console.log("DATA", data);

        console.log(event.target.id);
        let id = event.target.id
        id = id.substring(0, id.length-4);
        console.log(errors);
      
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

    function listAddOns(item) {
        let addOns = [];
        for (let add in item) {
            if (item[add] === true) {
                addOns.push(add)
            }
        }
        return addOns;
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
        <Flex 
            as="article" 
            margin="1em" 
            bg="white" 
            height="auto" 
            justifyContent="center" 
            alignItems="space-between" 
            flexDirection="column" 
            width="93%">

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
                    
                    <Button type="submit">Submit</Button>
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
                            <ul>
                                <Li listStyle="default">
                                {item.size.split(",").pop()} {item.name} 
                            {addOns.length > 0 && (
                            <>
                            <span> med </span>
                            <Ul>
                            {mappedAddOns}
                            </Ul>
                            </>
                            )}
                                </Li>
                            </ul>
                            
                           
                        </Box>

                    )

                })}

                <Button width="93%" id={orderData.id+"Btn"} handleClick={event => onDelivery(event)}>Utlever</Button>
          
                      
                
                
                </Box>

                
            )}


        </Flex>
    )
}

export default OrderItem;