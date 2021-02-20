import Layout from "../../components/Layout";
import OrderItem from "../../components/OrderItem"
import { useState } from "react";
import firebase from "../../config/firebase";
import readCollection from "../database/readCollection";

function Kitchen( {labelText, orderData} ) {

    console.log(orderData);

    const [button, setButton] = useState(1)
    const [orderList, setOrderList] = useState([
        {
            burger: "storfe",
            burgerSize: "500g",
            bread: "grovt",
            drink: "Sprite",
            drinkSize: "500ml",
            side: "Pommes Frites",
            sideSize: "300g",
            orderNumber: 300,
            userNumber: 101,
            state: "pending"
        },
        {
            burger: "fisk",
            burgerSize: "200g",
            bread: "grovt",
            drink: "Fanta",
            drinkSize: "250ml",
            side: "Salat",
            sideSize: "300g",
            orderNumber: 301,
            userNumber: 120,
            state: "pending"
        }
    ])
//Hent alle bestillinger med status "pending"
//Lagre dem i state(?)
//Map ut ett order-item for hvert - send inn state som props til labelText og andre detaljer
let index;
    function handleSubmit(event) {
        event.preventDefault();
   
        const formNum = Number(event.target.id.replace(/\D/g,''))
        

        orderList.forEach(order => {
     
            if (order.orderNumber === formNum) {
                index = orderList.indexOf(order);
            }
        })


        let newArr = [...orderList];
        newArr[index].state = "pending" ? "kitchen" : "completed"

        console.log(newArr);
       
        setOrderList(newArr);
 
        
        
        //console.log(orderList.state);
        
    }

    const orders = orderList.map(order => {
        return(
            <form
                name={"form" + order.orderNumber}
                id={"form" + order.orderNumber}
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
                >
                <OrderItem data={order} state={order.state} buttonState={button}/>
            </form>
            
        )
    })


    return(

        <>
        <Layout kitchen>
        
        <h2>Bestillinger</h2>
        
        {orders}
        
        
        </Layout>
        </>
    )
}

export default Kitchen;

Kitchen.getInitialProps = async () => {
    try {
        const orderData = await readCollection("orders")
        return { orderData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}