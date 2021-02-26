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
    
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [userNumber, setUserNumber] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);


    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //Signed in
                let user = userCredential.user;
                setIsRegistered(true);
                console.log(user);
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


    function renderForm() {
        return( 
        <LoginBase>
            <h3>Registrer deg</h3>
            <form 
                onSubmit={event => handleSubmit(event)}
                name="add-user"
                action="/"
                method="post"
                id="addUser"
                            >
            <Input inputType="email" inputId="mailInp" labelText="Epost (brukernavn): " inputChangeHandler={event => handleChange(event)} ></Input>
            <Input inputType="password" inputId="passwordInp" labelText="Passord: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="adressInp" labelText="Adresse: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="zipInp" labelText="Postnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="cityInp" labelText="Sted: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="phoneInp" labelText="Telefonnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
            </form>

            <Link href="/burger/user">
                <a>Til login-siden</a>
            </Link>

        </LoginBase>
        )
    }

    function renderRegistered() {
        return(
            <LoginBase>
                <h3>Du er registrert</h3>
                <Link href="/burger/user">
                    <a>Til login-siden</a>
                </Link>
            </LoginBase>
        )
    }
console.log(isRegistered);

    return(
        <Layout>
       
       
       
        {isRegistered ? renderRegistered() : renderForm()}
        
     
       
        </Layout>
    )
}

export default AddUser

AddUser.getInitialProps = async () => {
    
    try {
        const users = await readCollection("users")
        return { users }
    }
    catch (error) {
        return {
            error: error.message
        }
    }
    

}

/*
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>

 <Input inputType="text" inputId="nameInp" labelText="Navn: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="adressInp" labelText="Adresse: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="zipInp" labelText="Postnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="cityInp" labelText="Sted: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="phoneInp" labelText="Telefonnummer: " inputChangeHandler={event => handleChange(event)}></Input>
*/ 
