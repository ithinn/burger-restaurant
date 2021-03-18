//---------------------------------------------------------React/Firebase
import { useState, useEffect } from "react";
import firebaseInstance from "../../config/firebase";
//---------------------------------------------------------Style
import { Flex } from "reflexbox/styled-components" 
import OrderItem from "../OrderItem";
import { BlueH2 } from "../StyledComponents/Headings"


function KitchenList({ handleAddOns, toDoFocus, prepFocus}) {

    const [orders, setOrders] = useState(null)

    useEffect(() => {

        let ref = firebaseInstance
        .firestore()
        .collection("orders")
        .where("isPickedUp", "==", false)

        ref.onSnapshot((snapshot) => {
   
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

           setOrders(data);
        })

    }, []);


    return (
        <>
        {orders !== null && (
        
        <div>
            {toDoFocus && (
                <>
                <BlueH2>Bestilte ordre</BlueH2>
                
                <Flex as="article" flexWrap="wrap" justifyContent="center">
                    
                    {orders.map(order => {
                        if (order.isOrdered) {
                        return <OrderItem handleAddOns={handleAddOns} orderData={order}/>
                        } 
                    })}

                </Flex>

                </>
                
            )}

            {prepFocus && (
                <>
                <BlueH2>Klar til henting</BlueH2>
                
                <Flex as="article" flexWrap="wrap" justifyContent="center">
                    
                    {orders.map(order => {
                        if (order.isPrepared) {
                        return <OrderItem handleAddOns={handleAddOns} orderData={order} />
                        } 
                    })}

                </Flex>
                </>
            )}
        </div>
        )}
        </>
    )
}

export default KitchenList