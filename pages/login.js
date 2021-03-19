//-----------------------------------------------------------Firebase, Next, React
import { useState } from "react";
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";
import firebaseInstance from "../config/firebase"
import Link from "next/link"
//-----------------------------------------------------------Components
import Skeleton from "../components/Skeleton";
import { LoginBase, FormBase } from "../components/StyledComponents/Bases";
import { Input } from "../components/StyledComponents/Inputs"
import { Label } from "../components/StyledComponents/Labels"
import { Button } from "../components/StyledComponents/Button"
import Layout from "../components/Layout"


function Login() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const {loading, isAuthenticated} = useAuth();
    const router = useRouter();


    //Log in to the page
    function handleSubmit(event) {
        event.preventDefault();

        firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                router.push("/");})
            .catch((error) => {  
                setError(error.message);
            });
    }


    //Set state of email and password
    function handleChange(event) {
        event.target.id === "mailInp" ? 
        setEmail(event.target.value) : setPassword(event.target.value);
    }


    //Show the error message 
    function logError() {
        if (error) {
            return<p>{error}</p>
        }
    }


    if (loading) {
        return <Skeleton/>
    }

    return(
        <Layout login isLoggedIn={isAuthenticated}>
        
        {isAuthenticated === false ?     
            <LoginBase>
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
                <Skeleton/>
            </LoginBase>}
        </Layout>
    )
}

export default Login;
