import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";

import { Button } from "../components/StyledComponents/Button";
import {useEffect, useState, useRef } from "react"
//import RadioInput from "../components/RadioInput";
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";
import {useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import { useRouter } from "next/router";
import { render } from "react-dom";


function UserOrders({userData, food}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [burger, setBurger] = useState(null);
    const [burgerSize, setBurgerSize] = useState(null);
    const [drink, setDrink] = useState(null);
    const [drinkSize, setDrinkSize] = useState(null);
    const [bread, setBread] = useState(null);
    const [sides, setSides] = useState(null);
    const [sidesSize, setSidesSize] = useState(null);
    const [userId, setUserId] = useState(null)
    const [order, setOrder] = useState(null)

    const [onlyOrder, setOnlyOrder] = useState(null);
    let userName;
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();

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

    //Get number of existing orders
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPickedUp", "==", false)
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

    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            userName = user.name
        }
    })

    function handleChange(event) {
        switch( event.target.name) {
            case "burgers":
                setBurger(event.target.id);
                break;
            case "drinks":
                setDrink(event.target.id);
                break;
            case "sides":
                setSides(event.target.id);
                break;
            case "bread":
                setBread(event.target.id);
                break;
        }

        switch(event.target.id) {
            case "burgerssize":
                setBurgerSize(event.target.value);
                break;
            case "drinkssize":
                setDrinkSize(event.target.value);
                break;
            case "sidessize":
                setSidesSize(event.target.value);
                break;
        }
    }

    function handleAdd() {
        console.log("added to order");

        
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(burger, drink, sides);
    }


    let menu = food.map(category => {
      
        return(
            <>
            <h3>{category.id}</h3>
            <div>
        
                    {category.type.map((type, index) => {
                        return(
                        <div>

                          

                            <RadioInput handleChange={event => handleChange(event)} radioName={category.id} radioId={type} labelText={type}/>
                            
{/*
                            {category.sizes !== undefined ?
                    
                    <Select requiredCondition={category.type} handleChange={event => handleChange(event)} key={category.id + "size"} inputId={category.id + "size"} labelText="Velg størrelse">
    
                    {category.sizes.map((el, index) => {
                    return(
                    
                    index === 1 ? <option selected value={el}>{el}</option> : <option value={el}>{el}</option> )
                    })}

                    </Select> : null}*/}
                        </div>
                        
                        )
                    })}

                    

                

            </div>
            </>
        )
    })

    return(
        <Layout user>
        <h1>Prøv igjen</h1>
        <form onSubmit={event => handleSubmit(event)}>
        {menu}
        <Button btnColor="green" txtColor="white" type="submit">Submit</Button>
        </form>
        
        </Layout>

    )
}

export default UserOrders;

UserOrders.getInitialProps = async () => {
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