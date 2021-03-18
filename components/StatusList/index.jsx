//---------------------------------------------------------------Firebase/React
import { useState, useEffect } from "react"
import firebaseInstance from "../../config/firebase"
//---------------------------------------------------------------Style
import { Box } from "reflexbox/styled-components"
import { BlackH2, BlueH2, BlueH1 } from "../StyledComponents/Headings"
import { Ul, Li } from "../StyledComponents/Lists";


function StatusList( {id, heading} ) {

    const [orderedOrders, setOrderedOrders] = useState(null);
    const [preparedOrders, setPreparedOrders] = useState(null)
    
    //Get incoming orders
    useEffect(() => {
        
        let ref = firebaseInstance
        .firestore()
        .collection("orders")
        .where("isOrdered", "==", true)

        ref.onSnapshot((snapshot) => {
         
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setOrderedOrders(data);
        })

    }, []);

    
    //Get orders that are ready for pickup
    useEffect(() => {
        
        let ref = firebaseInstance
        .firestore()
        .collection("orders")
        .where("isPrepared", "==", true)

        ref.onSnapshot((snapshot) => {
       
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPreparedOrders(data);
        })

    }, []);

    return(
        <Box>
            <BlueH1>{heading}</BlueH1>
            
            <Ul>
                {orderedOrders !== null && id === "ordered" &&(
                    <>
                    {orderedOrders.map((item, index) => {
                        return 
                            <Li listStyle="default">
                                <BlackH2 textAlign="left">{item.orderNumber}</BlackH2>
                            </Li>
                    })}
                    </>
                )}

                {preparedOrders !== null && id === "prepared" &&(
                    <>
                    {preparedOrders.map((item, index) => {
                        return 
                            <Li listStyle="default">
                                <BlackH2 textAlign="left">{item.orderNumber}</BlackH2>
                            </Li>
                    })}
                    </>
                )}
            </Ul>
        </Box>  
    );
}

export default StatusList;