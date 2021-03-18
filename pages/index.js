import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import { useEffect, useState, useRef } from "react"
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { MenuItem } from "../components/MenuItem"
import { useBasket } from "../context/BasketContext";
import Banner from "../components/Banner";
import { BlueH1, BlackH2, HandH2 } from "../components/StyledComponents/Headings";
import { Flex, Box } from "reflexbox";
import { useUser } from "../context/UserContext";
import Skeleton from "../components/Skeleton";
import { Button } from "../components/StyledComponents/Button";
import { Overlay } from "../components/StyledComponents/Overlay";

function Home({userData, food}) {

    const [orderNumber, setOrderNumber] = useState(null);
    const basket = useBasket();
    const userContext = useUser();
    const router = useRouter();
    const [count, setCount] = useState(0)

    //FIND TODAYS DATE
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    
    //GET USER-ID AND USERNAME
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    let userName;
    
    
    userData.forEach(user => {
        if (user.id === userId) {
            userName = user.firstName
            userContext.getUserName(userName);
        }
    })
    

//------------------------------------------------------------------------------------------------    
























    //GET NUMBER OF EXISTING ORDERS AND SET ORDERNUMBER
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
            setOrderNumber(data.length + 101)
        })

    }, []);


    useEffect(() => {
        let ref = firebaseInstance
        .firestore()
        .collection("globals").doc("counter")

        ref.onSnapshot((snapshot) => {
            console.log("snapshot", snapshot.data().count);
            snapshot.data().count
            setCount(snapshot.data().count);
        })

    }, []);





    const handleAdd = async () => {
        const counterRef = firebaseInstance.firestore().collection("globals").doc("counter")

        //const newDoc = firebaseInstance.firestore().collection("order").doc("counter") 
        //const newDocRef = newDoc.set({test: 234})
        orderRef = await orderOcllection.add({

        })

        const counter = firebaseInstance.firestore().runTransaction((transaction) => {
            return transaction.get(counterRef).then((doc) => {

                const count =  doc.data().count;
                let newCount = count + 1;
                if (count < 61) {
                    newCount = 1
                }
            
                transaction.update(counterRef, {count: newCount});
            })
        })

        return counter
       
    }

   
    //ADD TO AN ORDER
    const onAdd = async (data) => {

        let price;
        let addOns = basket.listAddOns(data.addOns)
        let addOnsPrice = 15 * addOns.length;
        let sizeIndex = data.size.charAt(0);

        //Use the sizeIndex to access the right price in the food-item's pricearray.
        food.forEach(item => {
    
            item.details.forEach(el => {
                if (el.name === data.name) {
                    price = el.prices[sizeIndex] 
                }
            })
        })

        //Calculate total basePrice and add the orderItem to the order
        price = (Number(price) + addOnsPrice) * data.count;

        let newData = data;
        newData = {...newData, price: price, basePrice: price}
        
        basket.addProductLine(newData)
  
    }

    //MAP OUT THE MENU
    const menu = food.map((category) => {
 
    return(
        <div id="menu">
            <BlackH2>{category.id}</BlackH2>
        
            <Flex 
            width="90%" 
            justifyContent="center" 
            flexWrap="wrap"
            mb={3}>
                
                {category.details.map((item, index) => {
                        
                    return <MenuItem 
                        isLoggedIn={isAuthenticated} 
                        handleAdd={onAdd} 
                        index={index} 
                        itemData={item} 
                        key={item.name}
                        foodData={food} />
                })} 
                
            </Flex> 
        </div>
    )
    });


    //SEND THE ORDER TO THE DATABASE
    async function sendOrder(event) {
        
        if (isAuthenticated) {

            try {

                const collection = firebaseInstance.firestore().collection("orders");
                await collection.doc().set({
                    userId: userId,
                    isOrdered: true,
                    isPrepared: false,
                    isPickedUp: false,
                    orderList: basket.productLines,
                    orderDate: date,
                    orderNumber: count,
                })
                
                basket.emptyProductLine([]);
                router.push("/userStatus");
                handleAdd();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    //REMOVE ITEM FROM CART
    function handleRemove(event) {
        let index = event.target.id.replace(/[^0-9.]/g, "");
        basket.removeItem(index);
    }

    //CHANGE AMOUNT OF PRODUCTS IN CART
    function handleChange(event) {
        let index = event.target.id.replace(/[^0-9.]/g, "");
        let value = Number(event.target.value);
        basket.updateProductLines(index, value);   
    }    


//---------------------------------------------------------------------------------------------
    
    
    if (loading) {
        return <Skeleton/>
    }

    return(
        <Layout home>

            <Banner bgImg={'url("/images/dinerFurniture.jpg")'}>
                <HandH2>Beste burgeren på Østlandet</HandH2>

                <Flex>
                    <Link href={isAuthenticated ? "#menu" : "/login"}>
                        <Button p={3} fontSize="md" bgClr="black">{isAuthenticated ? "Bestill nå" : "Logg inn"}</Button>
                    </Link>

                    {!isAuthenticated && (
                    <Link href="/addUser">
                        <Button bgClr="black">Registrer ny bruker</Button>
                    </Link>
                    )}

                </Flex>
            </Banner>
        
            <BlueH1>Meny</BlueH1>
            
            {menu}  

            {basket.isCartChecked && (
            <>
            <Cart 
                sendOrder={event => sendOrder(event)} 
                handleRemove={event => handleRemove(event)} 
                handleChange={event => handleChange(event)}/>
            
            <Overlay height="200vh"/>
            </>
            )}
        
        </Layout>
    )
}


export default Home;


Home.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        const orderData = await readCollection("orders");
        const food = await readCollection("newfood");
        return { userData, orderData, food }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}




