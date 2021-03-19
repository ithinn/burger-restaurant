//-------------------------------------------------------------------------React, Next, Context, Firebase
import firebaseInstance from "../config/firebase";
import { useRouter } from "next/router";
import {useAuth} from "../config/auth";
import { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import { useUser } from "../context/UserContext";
//-------------------------------------------------------------------------Components
import Skeleton from "../components/Skeleton"
import Layout from "../components/Layout";
import BurgerSvg from "../components/BurgerSvg";
import {Flex, Box} from "reflexbox/styled-components"
import { BlackH2, BlueH3 } from "../components/StyledComponents/Headings"
import { SectionBase } from "../components/StyledComponents/Bases";
import { Button } from "../components/StyledComponents/Button";
import { Ul, Li, InlineLi } from "../components/StyledComponents/Lists"


function UserStatus() {
//------------------------------------------------------------------------Definitions
    const [usersOrders, setUsersOrders] = useState([])
    const [preparedOrders, setPreparedOrders] = useState([]);
    const router = useRouter()
    const {user, loading, isAuthenticated} = useAuth();
    const basket = useBasket();
    
    //Get userId and userName
    const userId = user ? user.uid : false;
    const userContext = useUser();
    const userName = userContext.userName;
    

//------------------------------------------------------------------------Realtime listeners
    //Get all the users orders that hasn't been picked up yet
    useEffect(() => {
        if (userId) {
            let ref = firebaseInstance
            .firestore()
            .collection("orders")
            .where("userId", "==", userId)
            .where("isPickedUp", "==", false)

            return ref.onSnapshot((snapshot) => {

                let data = [];
                snapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                setUsersOrders(data);
            })
        }
    }, [userId]);


    //Filter out the user's orders where isPrepared === true
    useEffect(() => {
        if (usersOrders) {
            let ref = firebaseInstance
            .firestore()
            .collection("orders")
            .where("userId", "==", userId)
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
        }
       
    }, [usersOrders]);

//-------------------------------------------------------------------------Functions 
    
    //Sign out 
    function handleSignOutClick() {
    
        firebaseInstance.auth().signOut().then(() => {

            let orderId;
            let ref = firebaseInstance.firestore().collection("orders");

            //Update all the prepared orders
            preparedOrders.forEach(order => {
                orderId = order.id
                ref.doc(orderId)
                .update({
                    isPrepared: false,
                    isPickedUp: true,
                })
                .then(() => {
              
                })
                .catch(error => {
                    console.log(error);
                })
            })

          }).catch((error) => {
            console.log(error);
          });
            
    }

    
    if (loading) {
        return <Skeleton/>
    }

    if (!isAuthenticated) {
        router.push('/');
        return <Skeleton text="Du er ikke logget inn"/>
    }


    return (
        <Layout status>
            <SectionBase
                as="section"
                flexDirection="column" 
                border="1px solid blue"
                m="2em auto"
                >

                <BlackH2>{"Hei, " + userName + "! Takk for bestillingen"}</BlackH2>
                <Flex 
                    direction="row"
                    p={1}
                    m="0 auto" 
                    maxWidth="40em" 
                    width="100%"
                    border="1px solid red" 
                    justify="center"
                    align="center"
                    flexWrap="wrap">

                    {usersOrders && (
                        usersOrders.map((order, index) => {
                            
                            if (!order.isPickedUp) {
                                
                                return(
                                    <Flex variant="card" key={order+index} >
                                        <Box width="50%" p={1}>
                                            <BlueH3 textAlign="left">Bestillingsnummer: {order.orderNumber}</BlueH3>
                                            <Ul padding="1.2em">
                                                {order.orderList.map(item => {
                                                    
                                                    let addOns = basket.listAddOns(item.addOns);
                                                    let mappedAddOns = addOns.map((addOn, index) => {
                                                        return <InlineLi key={addOn + index}>{addOn}, </InlineLi>
                                                    })
                                                    
                                                    return (
                                                    <Li listStyle="default" key={"listItem" + item.name}>
                                                        {item.count + " stk " + item.name + " " + item.size.split(",").pop()}
                                                        <Ul>
                                                            {addOns.length > 0 && (
                                                                <>
                                                                <span> med </span>
                                                                {mappedAddOns}
                                                                </>
                                                            )}
                                                        </Ul>
                                                    </Li>)
                                                })}
                                            </Ul>
                                        </Box>

                                        <Box width="50%" p={1}>
                                            <Box>
                                                <BurgerSvg 
                                                    color={order.isOrdered ? "lightgray" : "green"}
                                                    stroke={order.isOrdered ? "#346f83" : "green"}
                                                    opacity={order.isOrdered ? ".3" : "1"}
                                                ></BurgerSvg>
                                            </Box>
                                            <BlueH3 color={order.isOrdered ? "gray" : "green"}>
                                                {order.isOrdered ? "Maten blir forberedt" : "Du kan hente maten i kassen"}
                                            </BlueH3>
                                        </Box>
                                    </Flex>
                                )
                            } 
                        })
                    )}
                </Flex>

                <Button btnColor="purple" txtColor="white" handleClick={handleSignOutClick}>Logg ut</Button>
            </SectionBase> 
        </Layout>
           
    )
}

export default UserStatus;

