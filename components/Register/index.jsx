import styled from "styled-components"
import {LoginBase} from "../Login";
import Input from "../Input";
import Button from "../Button"

function Register() {
    return(
        <LoginBase>
            <h3>Registrer deg</h3>
            <form>
            <Input inputType="email" inputId="mailInp" labelText="Epost (brukernavn): "></Input>
            <Input inputType="text" inputId="nameInp" labelText="Navn: "></Input>
            <Input inputType="text" inputId="adressInp" labelText="Adresse: "></Input>
            <Input inputType="number" inputId="zipInp" labelText="Postnummer: "></Input>
            <Input inputType="text" inputId="cityInp" labelText="Sted: "></Input>
            <Input inputType="number" inputId="phoneInp" labelText="Telefonnummer: "></Input>
            <Button type="submit" btnColor="blue" txtColor="white">Logg inn</Button>
            </form>
        </LoginBase>
    )
}

export default Register