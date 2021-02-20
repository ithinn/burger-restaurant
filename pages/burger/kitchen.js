import Layout from "../../components/Layout";
import OrderItem from "../../components/OrderItem"
import { useState } from "react";
import firebase from "../../config/firebase";
import readCollection from "../database/readCollection";

function Kitchen( {labelText, orderData} ) {

    console.log(orderData);

    const [button, setButton] = useState(1)
    const [orderList, setOrderList] = useState(orderData);

let index;

    function handleSubmit(event) {
        event.preventDefault();
   
        const formNum = Number(event.target.id.replace(/\D/g,''))
        console.log(formNum);
        orderList.forEach(order => {
            console.log(order);
            if (order.orderNumber === formNum) {
                index = orderList.indexOf(order);
            }
        })


        let newArr = [...orderList];

        newArr[index].state = newArr[index].state === 1 ? 2 : 3
 
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
                <OrderItem data={order}/>
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