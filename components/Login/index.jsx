import styled from "styled-components"
import Input from "../Input"
import { Button } from "../Button"
import Link from "next/link";

export const LoginBase = styled.article`
    background: gray;
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1em;
    
`

function Login() {
    return(
        <LoginBase>
        <h3>Logg inn for å bestille deilig mat</h3>
        <Input inputType="text" inputId="userNameInp" labelText="Brukernavn"/>
        <Input inputType="text" inputId="passwordInp" labelText="Passord"/>
        <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
        <p>Ikke kunde fra før?<Link href="/burger/addUser"><a>Registrer deg her</a></Link></p>
        </LoginBase>
    )
}

export default Login;