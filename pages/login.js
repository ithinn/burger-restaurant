import { useState, useEffect } from "react";
import { LoginBase, FormBase } from "../components/StyledComponents/Bases";
import { Input } from "../components/StyledComponents/Inputs"
import { Label } from "../components/StyledComponents/Labels"
import { Button } from "../components/StyledComponents/Button"
import Link from "next/link"
import Layout from "../components/Layout"
import firebaseInstance from "../config/firebase"
import { useRouter } from "next/router";
import {useAuth} from "../config/auth";
import Skeleton from "../components/Skeleton";

function Login() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
        
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    const router = useRouter();

    
    //Login to the page
    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            .then(() => {router.push("/");})
            .catch((error) => {  
                setError(error.message);
            });
    }

    
    //Set state of email and password
    function handleChange(event) {
        event.target.id === "mailInp" ? 
        setEmail(event.target.value) : setPassword(event.target.value);
    }


    function logError() {
        if (error) {
            return<p>{error}</p>
        }
    }

    if (loading) {
        return <p>loading loading</p>
    }

 

    return(
        <Layout login isLoggedIn={isAuthenticated}>
        
        {isAuthenticated === false ?     
            <LoginBase>
            
                <h3>Logg inn</h3>
            
                <FormBase variant="card" p="2em">
                    <form
                        onSubmit={event => handleSubmit(event)}
                        name="login"
                        action="/"
                        method="POST"
                        id="loginUser">
                        
                        <Label htmlFor="mailInp">Epost</Label>
                        <Input id="mailInp" type="email" onChange={event => handleChange(event)} error={error}/>
                        
                        <Label htmlFor="passwordInp">Passord</Label>
                        <Input id="passwordInp" type="password" onChange={event => handleChange(event)} error={error}/>

                        {logError()}
                
                        <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
                    </form>

                    <Link href="/addUser">
                        <a>...eller registrer deg som ny bruker</a>
                    </Link>
                </FormBase>
            </LoginBase> 
        
            :

            <LoginBase>
                <Skeleton text="Du sendes til siden"/>
            </LoginBase>}
        </Layout>
    )
}

export default Login;
