import firebaseInstance from "../config/firebase";
import readCollection from "./database/readCollection";
import { useState, useEffect } from "react";

import { Button } from "../components/StyledComponents/Button";
import FlexContainer from "../components/FlexContainer";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import {useAuth} from "../config/auth";
import Icon from "../components/BurgerSvg";
import {Flex, Box} from "reflexbox/styled-components"
import { BlueH1, BlackH2, BlueH3, Pa } from "../components/StyledComponents/Headings"
import { Ul, Li } from "../components/StyledComponents/Lists"
import { SectionBase } from "../components/StyledComponents/Bases";
import { useUser } from "../context/UserContext";
import { useContext } from "react";

function UserStatus({userData}) {
   
    //const [userId, setUserId] = useState(null);
    const [usersOrders, setUsersOrders] = useState([])
    //const [isLoggedIn, setIsLoggedIn] = useState(true);
    //let userName;
    const router = useRouter()
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    

    const userContext = useUser();
    const userName = userContext.userName;

    console.log("USERNAME", userName);
    /*
    //Get userName from Firestore
    userData.forEach(user => {
        if (userId) {
            if (user.id === userId) {
                userName = user.firstName
            }
        }
        
    })*/


    //Get all the users orders that hasn't been picked up yet
    useEffect(() => {
        if (userId) {
            let ref = firebaseInstance.firestore().collection("orders").where("userId", "==", userId)
            ref.onSnapshot((snapshot) => {

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


    //Sign out 
    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
            console.log("is signed out")
          }).catch((error) => {
            console.log(error);
          });
            
    }

    
    if (loading) {
        return <p>loading loading</p>
    }

    if (!isAuthenticated) {
        router.push('/login');
        return <p>Ikke logget inn</p>
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
                                    <Flex variant="card" >
                                        <Box width="50%"  p={1}>
                                            <BlueH3 textAlign="left">Bestillingsnummer: {order.orderNumber}</BlueH3>
                                            <Ul>
                                                {order.orderList.map(item => {
                                                    return (<Li listStyle="default" key={"listItem" + item.name}>{item.count + " stk " + item.name + " " + item.size.split(",").pop()  }</Li>)
                                                })}
                                            </Ul>
                                        </Box>

                                        <Box width="50%" p={1}>
                                            <Box>
                                                <Icon 
                                                    color={order.isOrdered ? "lightgray" : "green"}
                                                    stroke={order.isOrdered ? "#346f83" : "green"}
                                                    opacity={order.isOrdered ? ".3" : "1"}
                                                ></Icon>
                                            </Box>
                                            <BlueH3 color={order.isOrdered ? "gray" : "green"}>{order.isOrdered ? "Maten blir forberedt" : "Du kan hente maten i kassen"}</BlueH3>
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


UserStatus.getInitialProps = async () => {
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

