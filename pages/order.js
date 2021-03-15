import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import FlexContainer from "../components/FlexContainer";
import { Button } from "../components/StyledComponents/Button";
import {useEffect, useState, useRef } from "react"
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";
import {useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import Router, { useRouter } from "next/router";
import { render } from "react-dom";
import Image from "next/image";
import Cart from "../components/Cart";
import {MenuItem} from "../components/MenuItem"
import {BasketConsumer, useBasket} from "../context/BasketContext";
import Banner from "../components/Banner";
import { BlueH1, BlackH2 } from "../components/StyledComponents/Headings";
import { Flex, Box } from "reflexbox";
import { useUser } from "../context/UserContext";
const schema = object().shape({
    
})


function Order({userData, food}) {

    const [userHasOrdered, setUserHasOrdered] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null);
    const basket = useBasket();
    const userContext = useUser();

    let userName;
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;

    const router = useRouter();
    
  
    //Get number of existing orders
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPickedUp", "==", false)
        ref.onSnapshot((snapshot) => {
            console.log(snapshot);
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

   
    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            userName = user.firstName
            console.log(userName);
            userContext.getUserName(userName);
        }

        
    })


    function listAddOns(item) {
        let addOns = [];
        for (let add in item) {
            if (item[add] === true) {
                addOns.push(add)
            }
        }

        

        return addOns;
    }
  
    //Add to order
    const onAdd = async (data) => {
        console.log("DATA", data);

        let price;
        let addOns = listAddOns(data.addOns)
        let addOnsPrice = 15 * addOns.length;
        let sizeIndex = data.size.charAt(0);

        food.forEach(item => {
    
            item.details.forEach(el => {
                if (el.name === data.name) {
                    price = el.prices[sizeIndex] 
                }
            })
        })

        price = (Number(price) + addOnsPrice) * data.count;

        console.log("NEW PRICE", price);

        let newData = data;

        newData = {...newData, price: price, basePrice: price}
        
        basket.addProductLine(newData)
  
    }

    
    const menu2 = food.map((category) => {
 
    return(
        <div>
        <BlackH2>{category.id}</BlackH2>
      

        <Flex width="90%" justifyContent="center" flexWrap="wrap">
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

    })


    //Send order to database
    async function sendOrder(event) {
      
        if (isAuthenticated) {
            console.log("submitted");
     
            try {
                const collection = firebaseInstance.firestore().collection("orders");
                await collection.doc().set({
                    userId: userId,
                    isOrdered: true,
                    isPrepared: false,
                    isPickedUp: false,
                    orderList: basket.productLines,
                    orderDate: date,
                    orderNumber: orderNumber
                    
                })
                setUserHasOrdered(true);
                basket.addProductLine([]);
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    function handleRemove(event) {
        //console.log("REMOVE", event.target);
        let index = event.target.id.replace(/[^0-9.]/g, "");
        basket.removeItem(index);

    }


    function handleChange(event) {
        let index = event.target.id.replace(/[^0-9.]/g, "");
        let value = Number(event.target.value);
        basket.updateProductLines(index, value);   
    }    


    console.log("PRODUCTLINES IN ORDER", basket.productLines);
    
    //RENDER------------------------------------------------------------------
    
    function renderLoginFirst() {
        return(
            <>
            <BlackH2>
                <Link href="/login"><a className={utilStyles.link}>Logg inn</a></Link> for å bestille mat</BlackH2>
            </>
        )
    }

    function renderPage() {
        return(
            
            <section>
                <BlackH2>Velkommen {userName}</BlackH2>
                
                <BlueH1>Meny</BlueH1>

                {menu2}   
            </section>
        )
        
    }
    
    if (loading) {
        return <p>loading loading</p>
    }

    console.log("cart", basket.isCartChecked);

    return(
        <Layout user>
       
        <Banner isLoggedIn={isAuthenticated} userId={userId}/>
       
        {isAuthenticated ? renderPage() : renderLoginFirst()}
        
        {basket.isCartChecked && (<Cart foodData={food} sendOrder={event => sendOrder(event)} handleRemove={event => handleRemove(event)} handleChange={event => handleChange(event)}/>)}
        
        </Layout>
    )
}


export default Order;


Order.getInitialProps = async () => {
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





















   /*
    //Add to order
    const onSubmit = async (data) => {
        let basket.productLine = [];
        console.log("Added to chart")

        let type;
 
        let sizeTest;
        
        console.log(data);


        for (let item in data.type) {
            
            if (data.type[item]) {
                type = item;

                for (let size in data.typeSize) {
                    
                    if (size === item) {
                        //console.log(data.typeSize[size], item, count);
                        sizeTest = data.typeSize[size]
                    }   
                }
                console.log(type, sizeTest);
                basket.productLine = [...basket.productLine, [type, sizeTest, 1]] 
            }
        }
        console.log(basket.productLine);
        basket.addProductLine(basket.productLine);
    }


    
   

        /*
        for (let item in data.type) {
            
            if (data.type[item]) {
                type = item;

                for (let size in data.typeSize) {
                    
                    if (size === item) {
                        //console.log(data.typeSize[size], item, count);
                        sizeTest = data.typeSize[size]
                    }   
                }
                console.log(type, sizeTest);
                tempArray = [...tempArray, [type, sizeTest, 1]] 
            }



                /*
    //Get userId
    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {

            if (user) {
                let uid = user.uid
                setUserId(uid);
                setIsLoggedIn(true);

            } else {
                console.log(user + "is signed out")
                setIsLoggedIn(false);
            }
        })

    }, []);


        }*/


