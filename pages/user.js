import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
//import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import { Button } from "../components/StyledComponents/Button";
import {useEffect, useState, useRef } from "react"
//import RadioInput from "../components/RadioInput";
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
//import {LabelAsButton, InvisibleInput} from "../components/Checkbox";
//import InputBlock from "../components/InputBlock";
import Cart from "../components/Cart";
import {MenuItem} from "../components/MenuItem"
import {BasketConsumer, useBasket} from "../context/BasketContext";
import Banner from "../components/Banner";
import { BlueH1, BlackH2 } from "../components/StyledComponents/Headings";
//import { Button }from "../components/StyledComponents/Button";


function TestMenu({food}) {
    const [orderNumber, setOrderNumber] = useState(null);
    const basket = useBasket();
    let userName;
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;

    const router = useRouter();
    

    const onAdd = async (data) => {

        basket.addProductLine([...basket.productLines, data])
  
    }

    console.log(food)

    function createMenu() {

        const menu = food.map((category) => {
 
            return(
                <div>
                <BlackH2>{category.id}</BlackH2>
                <Flex width="90%" justifyContent="center">
                    {category.details.map((item, index) => {
                            
                        return <MenuItem 
                            isLoggedIn={isAuthenticated} 
                            handleAdd={onAdd} 
                            index={index} 
                            itemData={item} 
                            key={item.name} />
                       
                    })}  
                </Flex>
                
                </div>
            )
            

       
            
        })

        /*

        const burgers = food[0].burger;
        const drinks = food[1]
    
        console.log(drinks)

        const burgerMenu = burgers.map((item, index) => {
 
            return(
                <MenuItem handleAdd={onAdd} index={index} itemData={item} key={item.id} />
            )
        })
        */
        /*
        const drinkMenu = drinks.name.map((item, index) => {

            return(
                <MenuItem handleAdd={onAdd} index={index} itemData={drinks} key={item.id} />
            )
        })*/

        

       

        return(
            <>
            <p>Meny</p>
            {menu}
            </>
        )
    }

    return(
        <>
        {createMenu()}
        </>
    )

}

export default TestMenu;


TestMenu.getInitialProps = async () => {
    try {
       
        const food = await readCollection("newfood");
        return { food }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}