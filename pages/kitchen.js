import Layout from "../components/Layout";
//import OrderItem from "../components/OrderItem"
import { useState, useEffect } from "react";
import { Button } from "../components/StyledComponents/Button";
import firebaseInstance from "../config/firebase";

function Kitchen( {userData} ) {

    console.log(userData);
 
    const [orderedOrders, setOrderedOrders] = useState(null);
    
    //Listen for realtime updates on the orders in the server
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPickedUp", "==", false)
        ref.onSnapshot((snapshot) => {
            console.log(snapshot);
            let data = [];
            let test = []
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })

                test.push(doc.data());
            })

            console.log(data);
            console.log(test);
           setOrderedOrders(data);
        })

    }, []);

    console.log(orderedOrders);
    
    //Change state of the order
    function handleClick(event) {
        console.log(event.target.parentNode.id)

        let id = event.target.id.substring(3);
      
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

/*
    orderedOrders.map((order, index) => {
        
                if(order.isOrdered) {
        
                    return(
                        <article id="orders">

                            <p>Ordrenummer: {order.orderNumber}</p> 
                            <ul>
                                {order.orderList.map(item => {
                                    return <li>{item}</li>
                                })}
                            </ul>
                            
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
                            <ul>
                                {order.orderList.map(item => {
                                    return <li>{item.title}</li>
                                })}
                            </ul>
                            <button id={"btn" + order.id} type="submit" onClick={event => handleClick(event)}>Ferdig</button>
                    </article>
                      
                    )
                }
                        
            })
        )}*/

    return(

        <>
        <Layout kitchen>
        
        <h2>Bestillinger</h2>

        <h2>Må lages nå</h2>
        {orderedOrders !== null &&(
            
            orderedOrders.map((order, index) => {
                if (order.isOrdered === true) {
                    return (
                        <article id="orders">

                            <p>Ordrenummer: {order.orderNumber}</p> 
                            <ul>
                                {order.orderList.map(item => {
                                    return <li>{item.count + " stk " + item.title + " " + item.size  }</li>
                                })}
                            </ul>
                            
                            <button id={"btn" + order.id} type="submit" onClick={event => handleClick(event)}>Ferdig</button>
                        </article>
                    )
                }
            })

        )}


        <h2>Klar til henting</h2>
                {orderedOrders !== null &&(
                    
                    orderedOrders.map((order, index) => {
                        if (order.isPrepared === true) {
                            return (
                                <article id="prepared">
                                    <p>Ordrenummer: {order.orderNumber}</p>  
                                    <ul>
                                        {order.orderList.map(item => {
                                            return <li>{item.count + " stk " + item.title + " " + item.size  }</li>
                                        })}
                                    </ul>
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

Kitchen.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        
        return { userData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}

  /*<article id="prepared">
                            <p>Ordrenummer: {order.orderNumber}</p>  
                            <p>{order.orderList}</p>
                            <button id={"btn" + order.id} type="submit" onClick={event => handleClick(event)}>Ferdig</button>
                    </article>*/
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