//-------------------------------------------------------------React, Next, Firebase
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { string, object } from "yup"
import firebaseInstance from "../config/firebase"
import { useAuth } from "../config/auth";
import Link from "next/link"
import { useRouter } from "next/router";
//-------------------------------------------------------------Components
import Skeleton from "../components/Skeleton";
import Layout from "../components/Layout"
import { Button } from "../components/StyledComponents/Button"
import { LoginBase, FormBase } from "../components/StyledComponents/Bases";
import { Input } from "../components/StyledComponents/Inputs";
import { Label } from "../components/StyledComponents/Labels";


const schema = object().shape({
    
    email: string().email().required("Eposten må ha dette formatet: brukernavn@domene.landkode"),
    password: 
        string()
        .matches(/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/, 
        "Passordet må bestå av minst 8 tegn. Minst ett av dem må være et tall, ett må være en bokstav, og ett må være et spesialtegn som @,%,&." )
        .required(),
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

//---------------------------------------------------------------------------------Definitions

    const router = useRouter()
    const {
        register, 
        handleSubmit, 
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
            mode: "onChange",
            resolver: yupResolver(schema)
        })

    const { loading } = useAuth();

    //Get todays date
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();

//----------------------------------------------------------------------------------Functions       
    
    //Submit registration form
    const onSubmit = async (data) => {
    
        try{
            
            const userCredential = await firebaseInstance
            .auth().createUserWithEmailAndPassword(data.email, data.password)
      
            const user = userCredential.user.uid;
   
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
            router.push("/")

        }
        catch(error) {
            console.log(error);
        }
    }

    //------------------------------------------------------------------------------Render

    if(loading) {
        return <Skeleton/>
    }

    return(
        <Layout register>
            <LoginBase> 
                <FormBase variant="card" p="2em"> 
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        name="add-user"
                        action="/"
                        method="post"
                        id="addUser">

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

                        <Button type="submit" >Registrer deg</Button>
                    </form>
                </FormBase>

                <Link href="/login">
                    <a>Jeg er allerede bruker</a>
                </Link>

            </LoginBase>
        </Layout>
    )
}

export default AddUser;

