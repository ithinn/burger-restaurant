import {PageHeading} from "../Headings";
import styled from "styled-components";
import Link from "next/link";

const BannerBase = styled.section`
    width: 100%;
    height: 80vh;
    background-image: url("/images/beefBurger.jpg");
    background-size: cover;
    display: flex;
    flex-direction: column;
`

const Sign = styled.button` 
    padding: 2em;
    border: none;
    background-color: #a62d2d;
    color: white;
    font-family: "gastromond";
    font-size: 1rem;
    margin: 0 auto;

    &&:hover {
        background: white;
        color: #a62d2d;
        border: 4px solid #a62d2d;
    }
`
function Banner({isLoggedIn}) {

    

    return(

        <BannerBase>
            <PageHeading>Catchy slagord</PageHeading>
            <Link href="/login">
            <Sign>{isLoggedIn ? "Bestill nå" : "Logg inn"}</Sign>
            </Link>
            
        </BannerBase>

    )
}

export default Banner;