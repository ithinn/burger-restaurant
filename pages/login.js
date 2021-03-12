import { useState, useEffect } from "react";
import styled from "styled-components"
import {LoginBase} from "../components/Login";
import Input from "../components/Input"
import Button from "../components/StyledComponents/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import readCollection from "./database/readCollection";
import { useRouter } from "next/router";
import Header from "../components/Header";
import {useAuth} from "../config/auth";
import { route } from "next/dist/next-server/server/router";


function Login({ handleSubmit }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    //const [userId, setUserId] = useState(null);
    const [added, setAdded] = useState(false);
        
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    const router = useRouter();
    
    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //Signed in
                let user = userCredential.user;
                console.log(user);
                console.log("signed in")

                router.push("/order");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }
    
    function handleChange(event) {

        event.target.id === "mailInp" ? 
        setEmail(event.target.value) : setPassword(event.target.value);

    }

    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
        console.log( userId + "is signed out")
        }).catch((error) => {
            console.log(error);
        });

    }

    if (loading) {
        return <p>loading loading</p>
    }

 

    return(
        <Layout login isLoggedIn={isAuthenticated}>
        
        {isAuthenticated === false ?     
        <LoginBase>
            <h3>Logg inn</h3>
            <form
                onSubmit={event => handleSubmit(event)}
                name="login"
                action="/"
                method="POST"
                id="loginUser">
                
                <label htmlFor="mailInp">Epost</label>
                <input id="mailInp" type="email" onChange={event => handleChange(event)} />

                <label htmlFor="passwordInp">Passord</label>
                <input id="passwordInp" type="password" onChange={event => handleChange(event)}/>
           
           <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
        </form>
            
        </LoginBase> 
        :

        <LoginBase>
            <p>Du sendes til siden</p>
        </LoginBase> }
        </Layout>
    )
}

export default Login;
