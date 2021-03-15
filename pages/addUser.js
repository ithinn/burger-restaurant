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
import {string, number, date, object} from "yup"
import { ItalicP } from "../components/StyledComponents/Headings"
import {BlackH2, BlueH1, WhiteH1, Paragraph} from "../components/StyledComponents/Headings";


const schema = object().shape({
    
    email: string().email().required("Eposten må ha dette formatet: brukernavn@domene.landkode"),
    password: string()
    .matches(/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/, 
    "Passordet må bestå av minst 8 tegn. Minst ett av dem må være et tall, ett må være en bokstav, og ett må være et spesialtegn som @,%,&." ).required(),

    firstName: string().required("Du må skrive fornavnet ditt."),

    famName: string().required("Du må skrive etternavnet ditt."),
    
    adress: string().required("Du må skrive adressen din"),
    
    zip: 
        string()
        .matches(/(\d{4})/, "Postnummeret må bestå av 4 sifre")
        .required(),
    city: string(),
    phone: string().matches(/(\d{8})/, "Telefonnummeret må bestå av 8 sifre").required(),
  
})



function AddUser() {

    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    const [error, setError] = useState(null)
    const [formError, setFormError] = useState(null);
    const router = useRouter()
    const {
        register, 
        handleSubmit, 
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

        if (errors) {
            setFormError(errors)
        }

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

    useEffect(() => {
        console.log("errors", errors)

        //setFormError(errors); 
    }, [errors])

    console.log(formError);

    return(
        <Layout>
            <LoginBase register>
            <BlueH1>Registrer deg</BlueH1>   
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
                    error={errors.email} 
                />

                {errors.email && (<p>{errors.email?.message}</p>)}
                   
                <Label htmlFor="passwordInp">Passord</Label>
                <Input 
                    type="password"
                    name="password"
                    ref={register} 
                    id="passwordInp" 
                    error={errors.password}
                />

                {errors.password && (<p>{errors.password?.message}</p>)}
                
                <Label htmlFor="firstNameInp">Fornavn</Label>
                <Input 
                    type="text"
                    name="firstName"
                    ref={register} 
                    id="firstNameInp" 
                    error={errors.firstName}
                />

                {errors.firstName &&(<p>{errors.firstName?.message}</p>)}
                
                <Label htmlFor="famNameInp">Etternavn</Label>
                <Input 
                    type="text"
                    name="famName"
                    ref={register} 
                    id="famNameInp"
                    error={errors.famName} 
                />
                {errors.famName && (<p>{errors.famName?.message}</p>)}

                <Label htmlFor="adressInp">Adresse</Label>
                <Input 
                    type="text"
                    name="adress"
                    ref={register} 
                    id="adressInp"
                    error={errors.adress} 
                />

                {errors.adress && (<p>{errors.adress?.message}</p>)}
                
                <Label htmlFor="zipInp">Postnummer</Label>
                <Input 
                    type="text"
                    name="zip"
                    ref={register} 
                    id="zipInp"
                    error={errors.zip} 
                />

                {errors.zip && (<p>{errors.zip?.message}</p>)}
                
                <Label htmlFor="cityInp">Sted</Label>
                <Input 
                    type="text"
                    name="city"
                    ref={register} 
                    id="cityInp" 
                />
                
                <Label htmlFor="phoneInp">Telefonnummer</Label>
                <Input 
                    type="text"
                    name="phone"
                    ref={register} 
                    id="phoneInp"
                    error={errors.phone} 
                />

                {errors.phone && (<p>{errors.phone?.message}</p>)}

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
