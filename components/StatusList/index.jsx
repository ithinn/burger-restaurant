//---------------------------------------------------------------Firebase/React
import { useState, useEffect } from "react"
import firebaseInstance from "../../config/firebase"
//---------------------------------------------------------------Style
import { Box, Flex } from "reflexbox/styled-components"
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

    console.log("ORDEREDORDERS", orderedOrders)
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
        <Box variant="card" width="44%">
            <BlackH2>{heading}</BlackH2>
            
            <Ul padding="3em">
                <Flex>
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