
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
import {Input, InvisibleCheckbox} from "../StyledComponents/Inputs";
import firebaseInstance from "../../config/firebase"
import { useEffect } from "react";

const schema = object().shape({
    
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

    console.log(orderData);
    useEffect(() => {
        console.log(errors)
    }, [errors])



    const onSubmit =async (data, event) =>  {
        console.log("DATA", data);

        console.log(event.target.id);

        let id = data.orderId;
      

        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

        
        if (event.target.id === "todoForm") {
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

        } else if (event.target.id === "preparedForm") {
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







        //handleAdd(data);
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


            <form id={listId + "Form"} onSubmit={handleSubmit(onSubmit)}>
           
                {orderData.orderList.map(item => {
           
                    return (

                    <div>
                        <Input type="checkbox" name={item.type} ref={register}/>
                        <Label>{item.size.split(",").pop()} {item.name}</Label>
                    </div>)

                })}
                
                <Button type="submit">Submit</Button>
            </form>
        </Flex>
    )
}

export default OrderItem;