import Layout from "../../components/Layout";
import OrderItem from "../../components/OrderItem"
import { useState, useEffect } from "react";
import readCollection from "../database/readCollection";
import Button from "../../components/Button";
import firebaseInstance from "../../config/firebase";

function Kitchen( {orderData} ) {
   
    const [orderList, setOrderList] = useState(orderData);
    let index;

    function sortOrders() {
        let sortedList = orderList.sort((a,b) => (a.order[0].orderNumber < b.order[0].orderNumber) ? 1 : -1 );
        console.log(sortedList);
    }

    sortOrders();

    function handleSubmit(event) {
        event.preventDefault();
      
        const formNum = Number(event.target.id.replace(/\D/g,''))

        orderList.forEach(item => {

            if (item.order[0].orderNumber === formNum) {
                index = orderList.indexOf(item);
            }

        })

        let newArr = [...orderList];
        newArr[index].order[0].state = newArr[index].order[0].state === 1 ? 2 : 3
 
        setOrderList(newArr);
    }

    let buttonClr;
    let buttonInnerText;

    const orders = orderList.map(order => {

        if (order.order[0].state === 1) {
            buttonClr = "red";
            buttonInnerText = "Klar til henting"
        } else if ( order.order[0].state === 2) {
            buttonClr = "yellow";
            buttonInnerText = "Hentet"
        } else {
            buttonClr = "green";
            buttonInnerText = "Fullført"
        }

        return(
            <form
                key={order.id}
                name={"form" + order.order[0].orderNumber}
                id={"form" + order.order[0].orderNumber}
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
                >

               <OrderItem data={order}></OrderItem>
               <Button id={order.order.orderNumber} btnColor={buttonClr} txtColor="black" type="submit" >
                {buttonInnerText}
                </Button>
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