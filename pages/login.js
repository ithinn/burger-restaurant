import { useState, useEffect } from "react";
import styled from "styled-components"
import {LoginBase} from "../components/Login";
import Input from "../components/Input"
import Button from "../components/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import readCollection from "./database/readCollection";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Login({ handleSubmit, users }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [userId, setUserId] = useState(null);
    const [added, setAdded] = useState(false);

    
    // Here you would fetch and return the user
    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
    
      useEffect(() => {
        if (isLoggedIn === true) {
            if (!(user || loading)) {
                router.push('/user')
                console.log("login");
            }

            return <p>Redirecting...</p>
        }


        
      }, [isLoggedIn, user, loading])
    
      
    






        firebaseInstance.auth().onAuthStateChanged((user) => {
            if (user) {
                //User is signed in
                let uid = user.uid
               // console.log(uid);
                setUserId(uid);
                setIsLoggedIn(true);
            } else {
                console.log(user + "is signed out")
            }
        })

        
   // }, []);

    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //Signed in
                let user = userCredential.user;
                console.log(user);
                console.log("signed in")
                isLoggedIn(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }
    
    function handleChange(event) {
        switch (event.target.id) {
            case "nameInp":
                setName(event.target.value);
                generateUserNumber();
                break;
            case "mailInp":
                setEmail(event.target.value);
                break;
            case "adressInp":
                setAdress(event.target.value);
                break;
            case "zipInp":
                setZip(event.target.value);
                break;
            case "phoneInp":
                setPhone(event.target.value);
                break;
            case "cityInp":
                setCity(event.target.value);
                break;
            case "passwordInp":
                setPassword(event.target.value);
                break;
        }
    }

    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
        console.log( userId + "is signed out")
        }).catch((error) => {
            console.log(error);
        });

        setIsLoggedIn(false);
      
    }

   

    return(
        <Layout login isLoggedIn={isLoggedIn}>
        
        {isLoggedIn === false ?     
        <LoginBase>
            <h3>Logg inn</h3>
            <form
                onSubmit={event => handleSubmit(event)}
                name="login"
                action="/"
                method="POST"
                id="loginUser">
                
                <Input inputType="email" inputId="mailInp" labelText="Epost (brukernavn): " inputChangeHandler={event => handleChange(event)} ></Input>
           
                <Input inputType="password" inputId="passwordInp" labelText="Passord: " inputChangeHandler={event => handleChange(event)}></Input>
           
           <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
            </form>
            
        </LoginBase> 
        :

        <LoginBase>
            <h3>{ userId + ", du er logget inn"}</h3>
        
            <Button
                id="signOutBtn"
                onClick={() => handleSignOutClick()}
                btnColor="purple"
                txtColor="white"
            >Logg ut</Button>
        </LoginBase> }
        </Layout>
    )
}

export default Login;
