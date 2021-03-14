import { useState, useEffect } from "react";
import { Button } from "../components/StyledComponents/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import readCollection from "./database/readCollection";
import { useRouter } from "next/router";
import { LoginBase, FormWrap } from "../components/LoginBase";
import {Input} from "../components/StyledComponents/Inputs";
import {Label} from "../components/StyledComponents/Labels";
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"

const schema = object().shape({
    
})

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
    const router = useRouter()
    const {
        register, 
        handleSubmit, 
        reset, 
        watch, 
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
        mode: "onChange",
        defaultValues: {
           
        },
        resolver: yupResolver(schema)
    })


    const onSubmit = async (data) => {
        console.log(data);
        try{
            
            const userCredential = await firebaseInstance.auth().createUserWithEmailAndPassword(data.email, data.password)
      
            const user = userCredential.user.uid;
                setIsRegistered(true);
                console.log(user + "is addded to auth");
            
            const collection = firebaseInstance.firestore().collection("users");
                
            await collection.doc(user).set({
                firstName: data.firstName,
                famName: data.famName,
                adress: data.adress,
                zip: data.zip,
                city: data.city,
                email: data.email,
                registered: date,
                phone: data.phone        
            })
            router.push("/order")
            console.log("User is added to base")
        }
        catch(error) {
            console.log(error)
            setError(error.message)
        }
    }


    return(
        <Layout>
            <LoginBase register>
            <h3>Registrer deg</h3>
            <FormWrap>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                name="add-user"
                action="/"
                method="post"
                id="addUser"
                            >
                <Label htmlFor="mailInp">Email (brukernavn)</Label>
                <Input 
                    type="email"
                    name="email"
                    ref={register} 
                    id="mailInp" 
                />
                   
                <Label htmlFor="passwordInp">Passord</Label>
                <Input 
                    type="password"
                    name="password"
                    ref={register} 
                    id="passwordInp" 
                />
                
                <Label htmlFor="firstNameInp">Fornavn</Label>
                <Input 
                    type="text"
                    name="firstName"
                    ref={register} 
                    id="firstNameInp" 
                />
                
                <Label htmlFor="famNameInp">Etternavn</Label>
                <Input 
                    type="text"
                    name="famName"
                    ref={register} 
                    id="famNameInp" 
                />
                
                <Label htmlFor="adressInp">Adresse</Label>
                <Input 
                    type="text"
                    name="adress"
                    ref={register} 
                    id="adressInp" 
                />
                
                <Label htmlFor="zipInp">Postnummer</Label>
                <Input 
                    type="number"
                    name="zip"
                    ref={register} 
                    id="zipInp" 
                />
                
                <Label htmlFor="cityInp">Sted</Label>
                <Input 
                    type="text"
                    name="city"
                    ref={register} 
                    id="cityInp" 
                />
                
                <Label htmlFor="phoneInp">Telefonnummer</Label>
                <Input 
                    type="number"
                    name="phone"
                    ref={register} 
                    id="phoneInp" 
                />

                <Button type="submit">Registrer deg</Button>
            </form>
            </FormWrap>

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
