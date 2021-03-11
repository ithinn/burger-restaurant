import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import Button from "../components/Button";
import {useEffect, useState, useRef } from "react"
import RadioInput from "../components/RadioInput";
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import Router, { useRouter } from "next/router";
import { render } from "react-dom";
import Image from "next/image";
//import {utilStyles} from "../styles/utils.module.css"
import {LabelAsButton, InvisibleInput} from "../components/Checkbox";
import InputBlock from "../components/InputBlock";
import Cart from "../components/Cart";
import MenuItem from "../components/MenuItem"
import {BasketConsumer, useBasket} from "../context/BasketContext";
import Banner from "../components/Banner";
import { PageHeading } from "../components/Headings";


const schema = object().shape({
    
})


function Order({userData, food}) {

    
    const [orderNumber, setOrderNumber] = useState(null);
    const basket = useBasket();
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
            userName = user.name
        }
    })


    //Add to order
    const onAdd = async (data) => {

        basket.addProductLine([...basket.productLines, data])
  
    }

    console.log("cart: ", basket.isCartChecked);
    //Create menu
    let sizes;
    const menu = food.map(category => {

        sizes=category.sizes

        return(
            <>
            <h2>{category.id}</h2>
            <FlexContainer flexWidth="90%" border="1px solid pink" direction="row" justify="center">
                

                {category.name.map((type, index) => {
                    return(

                        <MenuItem isLoggedIn={isAuthenticated} handleAdd={onAdd} type={type} index={index} sizes={sizes} />

                    )
                })}

            </FlexContainer>
            </>
        )
    })

    
    //Send order to database
    async function sendOrder(event) {
      
        if (isLoggedIn) {
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

    function renderLoginFirst() {
        return(
            <>
            <h2>
                <Link href="/login"><a className={utilStyles.link}>Logg inn</a></Link> for å bestille mat</h2>
            </>
        )
    }

    function renderPage() {
        return(
            
            <section>
                <h2>Velkommen {userName}</h2>
                
                <PageHeading>Meny</PageHeading>

                {menu}

                    
            
                
            </section>
        )
        
    }


/*
    //Redirect after sending the order
    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
    
      useEffect(() => {
        if (userHasOrdered === true) {
            if (!(user || loading)) {
                router.push('/userStatus')
                console.log("ordered");
            }

            return <p>Redirecting...</p>
        }

      }, [userHasOrdered, user, loading])
    
      */
    function handleRemove(event) {

        let index = event.target.id.replace(/[^0-9.]/g, "");
        let tempArray = [...basket.productLines];
        tempArray.splice(index, 1);
        basket.addProductLine(tempArray);

    }


    function handleChange(event) {

        let index = event.target.id.replace(/[^0-9.]/g, "");
        let tempArray = [...basket.productLines];
        let value = Number(event.target.value);

        tempArray[index] = {...tempArray[index], count: value}


        console.log(tempArray);
        basket.addProductLine(tempArray);

        
        //tempArray[index].splice(2, 1, value);
        let emptyArray = [];
        
/* 
        tempArray = tempArray.forEach(item => {
            emptyArray.push({
                type: item[0],
                size: item[1],
                count: item[2]
            })
              
        })
      
        console.log(emptyArray);*/
        //basket.addProductLine(tempArray);
    }

/*
    function renderCart(event) {
        return(
            <Cart/>
            <InvisibleInput type="checkbox" id="cart"/>
            <LabelAsButton htmlFor="cart">Handlekurv</LabelAsButton>
            <button onClick={renderCart}>Handlekurv</button>
        )

        



    }*/


    console.log(basket.productLines);
    if (loading) {
        return <p>loading loading</p>
    }

    if (!isAuthenticated) {
        //router.push('/login');
        return <p>Ikke logget inn</p>
    }

    return(
        <Layout user>
       
        <Banner isLoggedIn={isAuthenticated} userId={userId}/>
            
        {isAuthenticated ? renderPage() : renderLoginFirst()}
        
        {basket.isCartChecked && (<Cart sendOrder={event => sendOrder(event)} handleRemove={event => handleRemove(event)} handleChange={event => handleChange(event)}/>)}
        
        

        </Layout>
    )
}


export default Order;


Order.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        const orderData = await readCollection("orders");
        const food = await readCollection("food");
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


