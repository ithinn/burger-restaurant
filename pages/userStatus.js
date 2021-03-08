import firebaseInstance from "../config/firebase";
import readCollection from "./database/readCollection";
import { useState, useEffect } from "react";
import OrderStatusCircle from "../components/OrderStatusCircle";
import Button from "../components/Button";
import FlexContainer from "../components/FlexContainer";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function UserStatus({userData}) {
   
    const [userId, setUserId] = useState(null);
    const [usersOrders, setUsersOrders] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    let userName;


    //Get userId
    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
            if (user) {
                //User is signed in
                let uid = user.uid
              
                setUserId(uid);
            } else {
                console.log(user + "is signed out")
            }
        })
    }, []);


    //Get userName from Firestore
    userData.forEach(user => {
        if (user.id === userId) {
            userName = user.name
        }
    })


    //Get all the users orders that hasn't been picked up yet
    useEffect(() => {
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
    }, [userId]);


    //Sign out 
    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
            console.log("is signed out")
          }).catch((error) => {
            console.log(error);
          });
          setIsLoggedIn(false);  
    }

    
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
                                    <article key={order.id + index}>
                            
                                        <OrderStatusCircle 
                                            background={order.isOrdered ? "yellow" : "green"}>

                                            <h3>{order.isOrdered ? "Du har bestilt" : "Bestillingen er klar!"}</h3>
                                            <ul>
                                                {order.orderList.map(item => {
                                                    return (<li>{item}</li>)
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

