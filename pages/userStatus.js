import firebaseInstance from "../config/firebase";
import readCollection from "./database/readCollection";
import { useState, useEffect } from "react";
import OrderStatusCircle from "../components/OrderStatusCircle";
import Button from "../components/StyledComponents/Button";
import FlexContainer from "../components/FlexContainer";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import {useAuth} from "../config/auth";

function UserStatus({userData}) {
   
    //const [userId, setUserId] = useState(null);
    const [usersOrders, setUsersOrders] = useState([])
    //const [isLoggedIn, setIsLoggedIn] = useState(true);
    let userName;
    const router = useRouter()
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    
    //Get userName from Firestore
    userData.forEach(user => {
        if (userId) {
            if (user.id === userId) {
                userName = user.name
            }
        }
        
    })


    //Get all the users orders that hasn't been picked up yet
    useEffect(() => {
        if (userId) {
            let ref = firebaseInstance.firestore().collection("orders").where("userId", "==", userId)
            ref.onSnapshot((snapshot) => {
                console.log("snapshot setter inn")
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

    /*
    //Redirect after signing out
    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
    
    useEffect(() => {
        if (isLoggedIn === false) {
            if (!(user || loading)) {
                router.push('/order')
                console.log("Logged out");
            }

            return <p>Redirecting...</p>
        }

      }, [isLoggedIn, user, loading])

    
     */
    
      if (loading) {
        return <p>loading loading</p>
    }

    if (!isAuthenticated) {
        router.push('/login');
        return <p>Ikke logget inn</p>
    }





    console.log(usersOrders);
    return (
        <Layout user>
            <FlexContainer
                direction="column" 
                flexWidth="60%" 
                border="1px solid blue" 
                >

                <h2>{"Hei, " + userName + "! Takk for bestillingen"}</h2>
                <FlexContainer 
                    direction="row" 
                    flexWidth="80%" 
                    border="1px solid red" 
                    justify="center"
                    align="center">

                    {usersOrders && (
                        usersOrders.map((order, index) => {
                            if (!order.isPickedUp) {
                                return (
                                    <article key={"order" + index}>
                            
                                        <OrderStatusCircle 
                                            background={order.isOrdered ? "yellow" : "green"}>

                                            <h3>{order.isOrdered ? "Du har bestilt" : "Bestillingen er klar!"}</h3>
                                            <ul>
                                                {order.orderList.map(item => {
                                                    return (<li key={"listItem" + item.title}>{item.count + " stk " + item.title + " " + item.size  }</li>)
                                                })}
                                            </ul>
                                            <p>{order.isOrdered ? "Maten blir forberedt" : "Du kan hente maten i kassen"}</p>
                                        </OrderStatusCircle>

                                    </article>
                                )
                            } 
                        })
                    )}
                </FlexContainer>

                <Button btnColor="purple" txtColor="white" onClick onClick={handleSignOutClick}>Logg ut</Button>
                </FlexContainer> 
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

