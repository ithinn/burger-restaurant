import { useState, useEffect } from "react";
import styled from "styled-components"
import {LoginBase} from "../components/Login";
import Input from "../components/Input"
import Button from "../components/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import {useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import {firebaseAdmin} from "../config/firebaseAdmin";

import nookies from "nookies";


const schema = object().shape({
    email: string().required("Dette feltet er påkrevd"),
    password: string().required("Dette feltet er påkrevd"),
  });

function Test({  uid, email }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    //const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [userId, setUserId] = useState(null);
    const [added, setAdded] = useState(false);
    const {register, handleSubmit, watch, errors} = useForm({
        mode: "onChange", //Når skal skjemaet valideres
        //defaultValues: {
        //    email: "email@domain.com"},
        resolver: yupResolver(schema)
    });

    console.log(uid);
    
    const [firebaseError, setFirebaseError] = useState(null);


    const onSubmit = async (data) => {
        console.log(data)

        const {email, password} = data;
        console.log(email)
        console.log(password)
    }



    useEffect(() => {
        console.log("errors", errors)
        setFirebaseError(errors)
    }, [errors])

    //console.log(firebaseError);


    return(
        <>
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="email" name="email" ref={register}></input>
            <input type="password" name="password" placeholder="password" ref={register}></input>
            <button type="submit">Send</button>
        </form>

        
        </>
    )
}   
/*
export const getServerSideProps = async (context) => {
    try {
        const cookies = nookies.get(context)
      
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

        const {uid, email} = token;

        //Du kan få tilgang til databasen også, men da sjekker den ikke om det fins regler for hva brukeren skal ha tilgang til - den bare logger

        const db = firebaseAdmin.firestore()
        const snapshot = await db.collection("users").get()
        
        
        const users = [];
        snapshot.forEach((doc) => {
            console.log(doc.data());

        })

        return {
            props: {email, uid}
        }
    }
    catch(error) {
        console.log("Something went wrong")

        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
}
*/
export default Test;

