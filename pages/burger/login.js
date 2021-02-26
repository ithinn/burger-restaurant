import { useState } from "react";
import styled from "styled-components"
import {LoginBase} from "../../components/Login";
import Input from "../../components/Input"
import Button from "../../components/Button"
import Link from "next/link"
import Layout from "../../components/Layout"
import firebaseInstance from "../../config/firebase"
import readCollection from "../database/readCollection";
import { useRouter } from "next/router";

function AddUser({ handleSubmit, users }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [userNumber, setUserNumber] = useState(null);
    const [added, setAdded] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //Signed in
                let user = userCredential.user;
                console.log(user);
                console.log("signed in")
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


    return(
        <Layout>
 
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
       
        </Layout>
    )
}

export default AddUser
