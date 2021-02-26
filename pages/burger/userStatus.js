import firebaseInstance from "../../config/firebase";
import readCollection from "../database/readCollection";
import { useState, useEffect } from "react";
import OrderStatusCircle from "../../components/OrderStatusCircle";
//import {handleSignOutClick} from "../burger/user";
import Button from "../../components/Button";

function UserStatus({orders}) {
   
    const [user, setUser] = useState(null);
    const [allOrders, setAllOrders] = useState(orders);
    const [usersOrders, setUsersOrders] = useState([])
    
    if(usersOrders[0] !== undefined) {
        console.log("userOrders")
        firebaseInstance.firestore().collection("orders").doc(usersOrders[0].orderId)
        .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        })
    }

    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
            if (user) {
                //User is signed in
                let uid = user.uid
              
                setUser(uid);
            } else {
                console.log(user + "is signed out")
            }
        })

       
    }, []);

    //console.log(allOrders)

    console.log(user);

    useEffect(() => {
        let tempArr = [];

        allOrders.forEach(order => {
            if (order.order.userId === user) {
                console.log("Order: " + order.id);
                tempArr.push({
                    orderId: order.id,
                    orderNumber: order.order.orderNumber,
                    state: order.order.state
                })
            }
        })

        setUsersOrders(tempArr);
    }, [user])

    useEffect(() => {
        console.log(usersOrders[0]);
        /*
        
        */
        if(usersOrders[0] !== undefined) {
            console.log("userOrders")
            firebaseInstance.firestore().collection("orders").doc(usersOrders[0].orderId)
            .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
    })
        }
        
    })
    
    //console.log(usersOrders[0].orderId);
  /*
    
    firebaseInstance.firestore().collection("orders").doc(usersOrders[0].orderId)
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    })
*/
    return (
        <article>
         <h2>Din bestilling er sendt.</h2>
            {usersOrders.map(item => {
                return(
                    <article key={item.orderId}>
                    <p>Bestillingsnummer: {item.orderNumber}</p>
                    <OrderStatusCircle background={item.state === 1 ? "yellow" : "green"}>
                        <p>{item.state === 1 ? "Maten blir forberedt på kjøkkenet" : "Du kan hente maten din"}</p>
                    </OrderStatusCircle>
                </article>
                )
            })}
        
        </article>
        
    )
}

export default UserStatus;

UserStatus.getInitialProps = async () => {
    try {
        const orders = await readCollection("orders")
        return { orders }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}

