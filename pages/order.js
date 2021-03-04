import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import Button from "../components/Button";
import {useEffect, useState} from "react"
import RadioInput from "../components/RadioInput";
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";

function Order() {

    const [userId, setUserId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const userContext = useAuth();

    //Get userId
    useEffect(() => {
        console.log(userContext);
        if (userContext !== undefined) {
            //console.log("if", userContext.uid)
            //setUserId(userContext.uid);
            //setIsLoggedIn(true)
            console.log("if", userContext)
        }

    }, [userContext])
    

    return(
        <>
        <h1>Order</h1>
        </>
    )
}

export default Order;