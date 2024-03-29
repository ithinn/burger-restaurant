//-----------------------------------------------------------------------Firebase/React
import { useState, useEffect } from "react"
import firebaseInstance from "../../config/firebase"
//-----------------------------------------------------------------------Components
import { Box, Flex } from "reflexbox/styled-components"
import { BlackH2 } from "../StyledComponents/Headings"
import { Ul, Li } from "../StyledComponents/Lists";


function StatusList( {id, heading} ) {

    const [orderedOrders, setOrderedOrders] = useState(null);
    const [preparedOrders, setPreparedOrders] = useState(null)

//-----------------------------------------------------------------------Realtime listeners on "orders"
    //Get incoming orders
    useEffect(() => {
        
        let ref = firebaseInstance
        .firestore()
        .collection("orders")
        .where("isOrdered", "==", true)

        return ref.onSnapshot((snapshot) => {
         
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

        return ref.onSnapshot((snapshot) => {
       
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

//------------------------------------------------------------------------------------Render

    return(
        <Box variant="card" width="44%">
            <BlackH2>{heading}</BlackH2>
            
            <Ul padding="3em">
                <Flex height="auto" flexWrap="wrap">
                {orderedOrders !== null && id === "ordered" &&(
                    <>
                    {orderedOrders.map((item, index) => {
                        console.log("ITEM", item);
                        return (
                            <Flex alignItems="center" justifyContent="center" variant="number">
                                <Li>
                                    <BlackH2 textAlign="left">{item.orderNumber}</BlackH2>
                                </Li>
                            </Flex>
                            )  
                    })}
                    </>
                )}

                {preparedOrders !== null && id === "prepared" &&(
                    <>
                    {preparedOrders.map((item, index) => {
                        return (
                            <Flex alignItems="center" justifyContent="center" variant="number">
                                <Li>
                                    <BlackH2 textAlign="left">{item.orderNumber}</BlackH2>
                                </Li>
                            </Flex>
                            )
                    })}
                    </>
                )}
                </Flex>
            </Ul>
        </Box>  
    );
}

export default StatusList;