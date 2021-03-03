import Layout from "../components/Layout";
import OrderItem from "../components/OrderItem"
import { useState, useEffect } from "react";
import readCollection from "./database/readCollection";
import Button from "../components/Button";
import firebaseInstance from "../config/firebase";

function Kitchen( {userData} ) {
    //console.log(orderData);
    console.log(userData);

  /*
    firebaseInstance.firestore().collection("orders").where("orderNumber", "==", "3")
        .onSnapshot((querySnapshot) => {
            console.log(querySnapshot);
            let orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data())
            })
            console.log(orders);
        })
        
   */
    const [allOrders, setAllOrders] = useState([]);
    const [testList, setTestList] = useState(null);
    let buttonIndex;

    const ref = firebaseInstance.database().ref("liveOrders");
  
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
    }, [])

    /*
    function sortOrders() {
        let sortedList = allOrders.sort((a,b) => (a.orderNumber < b.orderNumber) ? 1 : -1 );
        console.log(sortedList);
    }

    sortOrders();*/

    function removeFinished() {

    }


    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.id);
        const formNum = Number(event.target.id.replace(/\D/g,''))
        let id;
        allOrders.forEach((item, index) => {
            //console.log(item.content.order.orderNumber);
            console.log(index);
            console.log(formNum);
            console.log(item.content.order.state)
     
            if (index === formNum) {
                buttonIndex = index;
                id = item.orderId;

            }

        })
        
        let newArr = [...allOrders];
        newArr[buttonIndex].content.order.state = newArr[buttonIndex].content.order.state === 1 ? 2 : 3
 
        setAllOrders(newArr);

        console.log(id);
        const orderRef = firebaseInstance.database().ref(`liveOrders/${id}/order/state`);
        //cons  t theOrder = orderRef.child("order/state");
        console.log(orderRef);
        
        orderRef.transaction(function(currentState) {
            return currentState === 1 ? 2 : 3
        });

    }

    let buttonClr;
    let buttonInnerText;

    console.log(allOrders);
    
    const orders = allOrders.map((order, index) => {
      
        if (order.content.order.state === 1) {
            buttonClr = "red";
            buttonInnerText = "Klar til henting"
        } else if ( order.content.order.state === 2) {
            buttonClr = "yellow";
            buttonInnerText = "Hentet"
        } else {
            buttonClr = "green";
            buttonInnerText = "Fullført"
        }

        return(
            <form
                key={order.orderId}
                name={"form" + order.content.order.orderNumber}
                id={"form" + index}
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
                >

               <OrderItem data={order} userData={userData} ></OrderItem>
               <Button id={"btn" + order.Id} btnColor={buttonClr} txtColor="black" type="submit" >
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
        const userData = await readCollection("users")
        return { userData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}