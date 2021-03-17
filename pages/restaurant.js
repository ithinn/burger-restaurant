import Layout from "../components/Layout";
import StatusList from "../components/StatusList";
import FlexContainer from "../components/FlexContainer";
import {useAuth} from "../config/auth";
import firebaseInstance from "../config/firebase";
import {useEffect, useState} from "react"
import {SectionBase} from "../components/StyledComponents/Bases"
import {Flex, Box} from "reflexbox/styled-components"

function Restaurant() {

    const [orderedOrders, setOrderedOrders] = useState(null);
    const [preparedOrders, setPreparedOrders] = useState(null)
    
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isOrdered", "==", true)
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

    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPrepared", "==", true)
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
            setPreparedOrders(data);
        })

    }, []);

    console.log(orderedOrders);
    console.log(preparedOrders);



    return(
        
        <Layout restaurant>
       
        <SectionBase
               flexDirection="row" width="100%" alignItems="flex-start" justifyContent="space-between">
            <SectionBase m="0" width="13em" minHeight="100vh" bgImg='url("/images/dinerChairs.jpg")'></SectionBase>
            <StatusList array={orderedOrders} heading="Vi jobber med:"/>
            <StatusList array={preparedOrders} heading="Du kan hente:"/>
            <SectionBase bgPosition="top" m="0" width="13em" height="100vh" bgImg='url("/images/dinerFurniture.jpg")'></SectionBase>
            
        </SectionBase>
        
        </Layout>
    
    )
}

export default Restaurant;

//<Header heading="Snart får du mat"/>
        