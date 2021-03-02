import Layout from "../../components/Layout";
import OrderItem from "../../components/OrderItem"
import { useState, useEffect } from "react";
import readCollection from "../database/readCollection";
import Button from "../../components/Button";
import firebaseInstance from "../../config/firebase";

function Kitchen( {orderData} ) {
    //console.log(orderData);


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
    let index;

    const ref = firebaseInstance.database().ref("liveOrders");

    useEffect(() => {
        ref.on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            let tempArray = []

            for (let key in data) {
                tempArray.push(key);
            }

            console.log(tempArray);
            //setAllOrders([data]);
        })
    }, [])

    /*
    function sortOrders() {
        let sortedList = allOrders.sort((a,b) => (a.orderNumber < b.orderNumber) ? 1 : -1 );
        console.log(sortedList);
    }

    sortOrders();*/



    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.id);
        const formNum = Number(event.target.id.replace(/\D/g,''))

        allOrders.forEach(item => {
            console.log(item.order.orderNumber);
            console.log(formNum);
            if (item.order.orderNumber === formNum) {
                index = allOrders.indexOf(item);
            }

        })
        console.log(index);
        let newArr = [...allOrders];
        newArr[index].order.state = newArr[index].order.state === 1 ? 2 : 3
 
        setAllOrders(newArr);
    }

    let buttonClr;
    let buttonInnerText;

    console.log(allOrders);
    /*
    const orders = allOrders!== null ? allOrders.map(order => {

        if (order.order.state === 1) {
            buttonClr = "red";
            buttonInnerText = "Klar til henting"
        } else if ( order.order.state === 2) {
            buttonClr = "yellow";
            buttonInnerText = "Hentet"
        } else {
            buttonClr = "green";
            buttonInnerText = "Fullført"
        }

        return(
            <form
                key={order.id}
                name={"form" + order.order.orderNumber}
                id={"form" + order.order.orderNumber}
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
                >

               <OrderItem data={order}></OrderItem>
               <Button id={order.orderNumber} btnColor={buttonClr} txtColor="black" type="submit" >
                {buttonInnerText}
                </Button>
            </form>
            
        )
    }) : null

*/
    return(

        <>
        <Layout kitchen>
        
        <h2>Bestillinger</h2>
        
       
        
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