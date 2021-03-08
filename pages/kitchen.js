import Layout from "../components/Layout";
import OrderItem from "../components/OrderItem"
import { useState, useEffect } from "react";
import Button from "../components/Button";
import firebaseInstance from "../config/firebase";

function Kitchen( ) {
 
    const [orderedOrders, setOrderedOrders] = useState(null);
    
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPickedUp", "==", false)
        ref.onSnapshot((snapshot) => {
            console.log(snapshot);
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            console.log(data);
            setOrderedOrders(data);
        })

    }, []);
      
    function handleClick(event) {
        console.log(event.target.parentNode.id)

        let id = event.target.id.substring(3);
        console.log(id);
        
        const orderRef = firebaseInstance.firestore().collection("orders").doc(id);

        if(event.target.parentNode.id === "orders") {
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

        } else if (event.target.parentNode.id === "prepared") {
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
        
    }

    return(

        <>
        <Layout kitchen>
        
        <h2>Bestillinger</h2>
        {orderedOrders !== null &&(
            orderedOrders.map((order, index) => {
        
                if(order.isOrdered) {
        
                    return(
                        <article id="orders">
                            <p>Ordrenummer: {order.orderNumber}</p>  
                            <p>{order.orderList}</p>
                            <button id={"btn" + order.id} type="submit" onClick={event => handleClick(event)}>Ferdig</button>
                        </article>
                    )
                }
                
            })
        )}
        <h2>Klar til henting</h2>

        {orderedOrders !== null &&(
            orderedOrders.map((order, index) => {
                
                if(order.isPrepared) {
                
                    return(
                        <article id="prepared">
                            <p>Ordrenummer: {order.orderNumber}</p>  
                            <p>{order.orderList}</p>
                            <button id={"btn" + order.id} type="submit" onClick={event => handleClick(event)}>Ferdig</button>
                        </article>
                    )
                }
                        
            })
        )}




        
     
      
        
        </Layout>
        </>
    )
}

export default Kitchen;


/*
useEffect(() => {

    ref.on("value", (snapshot) => {
        const data = snapshot.val();

        let orderArray = [];

        for (let item in data) {
            orderArray.push({
                orderId: item,
                content: data[item]
            });
 
        }

        setAllOrders(orderArray);
    })
}, [])*/