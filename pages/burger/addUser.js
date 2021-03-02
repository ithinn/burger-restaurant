import { useState, useEffect } from "react";
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
    const [userId, setUserId] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
    
      useEffect(() => {
        if (isRegistered === true) {
            if (!(user || loading)) {
                router.push('/burger/user')
                console.log("login");
            }

            return <p>Redirecting...</p>
        }


      }, [isRegistered, user, loading])
    

        const today = new Date();
        const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    
    console.log(date);


    async function handleSubmit(event) {
        event.preventDefault();


        
        try{
            const userCredential =  
            await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
      
            console.log(userCredential);

            const user = userCredential.user.uid;
                setIsRegistered(true);
                //setUserId(user);
                console.log(typeof user);
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
                    
                })
            
            

            console.log("User is added to base")
        }
        catch(error) {
            console.log(error)
            //alert(error);
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
            <Input inputType="email" inputId="mailInp" labelText="Epost (brukernavn): " inputChangeHandler={event => handleChange(event)} ></Input>
            <Input inputType="password" inputId="passwordInp" labelText="Passord: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="nameInp" labelText="Navn: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="adressInp" labelText="Adresse: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="zipInp" labelText="Postnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="text" inputId="cityInp" labelText="Sted: " inputChangeHandler={event => handleChange(event)}></Input>
            <Input inputType="number" inputId="phoneInp" labelText="Telefonnummer: " inputChangeHandler={event => handleChange(event)}></Input>
            <Button type="submit" btnColor="blue" txtColor="white">Registrer deg</Button>
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
