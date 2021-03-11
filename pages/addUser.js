import { useState, useEffect } from "react";
import {LoginBase} from "../components/Login";
import Input from "../components/Input"
import Button from "../components/StyledComponents/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import readCollection from "./database/readCollection";
import { useRouter } from "next/router";

function AddUser() {

    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [adress, setAdress] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    const [error, setError] = useState(null)

 
    //Register user in auth and firestore  
    async function handleSubmit(event) {
        event.preventDefault();
   
        try{
            
            const userCredential = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
      
            const user = userCredential.user.uid;
                setIsRegistered(true);
                console.log(user + "is addded to auth");
            
            const collection = firebaseInstance.firestore().collection("users");
                
            await collection.doc(user).set({
                name: name,
                adress: adress,
                zip: zip,
                city: city,
                email: email,
                usersOrders: [],
                registered: date,
                phone: phone        
            })
            
            console.log("User is added to base")
        }
        catch(error) {
            console.log(error)
            setError(error.message)
        }
        
    }


    function handleChange(event) {
        switch (event.target.id) {
            case "nameInp":
                setName(event.target.value);
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

    //Redirect to "user-page" when registration is successfull
    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
       
    useEffect(() => {
        if (isRegistered === true) {
            if (!(user || loading)) {
                router.push('/user')
            }
            
            return <p>Redirecting...</p>
        }
    }, [isRegistered, user, loading])
       
       


    return(
        <Layout>
            <LoginBase register>
            <h3>Registrer deg</h3>
            <form 
                onSubmit={event => handleSubmit(event)}
                name="add-user"
                action="/"
                method="post"
                id="addUser"
                            >
                <Input 
                    inputType="email" 
                    inputId="mailInp" 
                    labelText="Epost (brukernavn): " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="password" 
                    inputId="passwordInp" 
                    labelText="Passord: " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="text" 
                    inputId="nameInp" 
                    labelText="Navn: " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="text" 
                    inputId="adressInp" 
                    labelText="Adresse: " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="number" 
                    inputId="zipInp" 
                    labelText="Postnummer: " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="text" 
                    inputId="cityInp" 
                    labelText="Sted: " 
                    inputChangeHandler={event => handleChange(event)}/>
                <Input 
                    inputType="number" 
                    inputId="phoneInp" 
                    labelText="Telefonnummer: " 
                    inputChangeHandler={event => handleChange(event)}/>

                <Button type="submit" btnColor="blue" txtColor="white">Registrer deg</Button>
            </form>

            <Link href="/user">
                <a>Til login-siden</a>
            </Link>

        </LoginBase>
       
       
       
      
        {error && (<p>{error}</p>)}
     
       
        </Layout>
    )
}

export default AddUser;


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

/*

    function renderForm() {
        return( 
        <LoginBase register>
            <h3>Registrer deg</h3>
            <form 
                onSubmit={event => handleSubmit(event)}
                name="add-user"
                action="/"
                method="post"
                id="addUser"
                            >
            <Input 
                inputType="email" 
                inputId="mailInp" 
                labelText="Epost (brukernavn): " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="password" 
                inputId="passwordInp" 
                labelText="Passord: " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="text" 
                inputId="nameInp" 
                labelText="Navn: " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="text" 
                inputId="adressInp" 
                labelText="Adresse: " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="number" 
                inputId="zipInp" 
                labelText="Postnummer: " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="text" 
                inputId="cityInp" 
                labelText="Sted: " 
                inputChangeHandler={event => handleChange(event)}/>
            <Input 
                inputType="number" 
                inputId="phoneInp" 
                labelText="Telefonnummer: " 
                inputChangeHandler={event => handleChange(event)}/>

            <Button type="submit" btnColor="blue" txtColor="white">Registrer deg</Button>
            </form>

            <Link href="/user">
                <a>Til login-siden</a>
            </Link>

        </LoginBase>
        )
    }

    
    function renderRegistered() {
        return(
            <LoginBase>
                <h3>Du er registrert</h3>
                <Link href="/user">
                    <a>Til login-siden</a>
                </Link>
            </LoginBase>
        )
    }*/
