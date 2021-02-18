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
    const [added, setAdded] = useState(false);


    function generateUserNumber() {
  
        let userNum = Math.floor(Math.random()* 100000000)

        let tempList = []

        users.forEach(user => {
     
            if (userNum === user.usernumber ) {
                tempList.push(user.usernumber);
            }
        })

        if (tempList.length === 0) {
            setUserNumber(userNum);
        } else {
            generateUserNumber();
        }

        
    }

    function handleSubmit(event) {
        event.preventDefault();
        generateUserNumber();

        console.log(name, email, city, userNumber);

        const collection = firebaseInstance.firestore().collection("users");
        collection.doc().set({
            adress: adress,
            email: email,
            city: city,
            name: name,
            phone: phone,
            password: password,
            usernumber: userNumber,
            zip: zip,
        })
        .then(() => {
            console.log("lagt til")
            setAdded(true)
            
            //State - endre grensesnittet - melding. Eller send dem til en annen side. 
        })
        .catch(error => {
            console.error(error)
        })
   
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

/*
     <Route exact path="/burger/addUser" render={() => (
            added ? (
            <Redirect to="/burger/user"/>
            ) : null
            )}/>

*/ 


    return(
        <Layout>
       

        <LoginBase>
            <h3>Registrer deg</h3>
            <form 
                onSubmit={event => handleSubmit(event)}
                name="add-user"
                action="/"
                method="GET"
                id="addUser"
                            >
            <Input inputType="email" inputId="mailInp" labelText="Epost (brukernavn): " inputChangeHandler={event => handleChange(event)} ></Input>
            <Input inputType="text" inputId="nameInp" labelText="Navn: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="adressInp" labelText="Adresse: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="zipInp" labelText="Postnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="cityInp" labelText="Sted: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="phoneInp" labelText="Telefonnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="password" inputId="passwordInp" labelText="Passord: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="password" inputId="passwordValidate" labelText="Bekreft passord: " ></Input>
            
            <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
            </form>

            <button onClick={generateUserNumber}>testbutton</button>
     

            <Link href="/burger/user">
                <a>Til login-siden</a>
            </Link>

        </LoginBase>
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
*/ 
