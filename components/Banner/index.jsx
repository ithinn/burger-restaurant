import {BlueH1} from "../StyledComponents/Headings";
import styled from "styled-components";
import Link from "next/link";
import {Button} from "../StyledComponents/Button";

const BannerBase = styled.section`
    width: 100%;
    height: 80vh;
    background-image: url("/images/dinerFurniture.jpg");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
            <BlueH1>Beste burgeren på Østlandet</BlueH1>
            <Link href="/login">
            <Button bgClr="black">{isLoggedIn ? "Bestill nå" : "Logg inn"}</Button>
            </Link>
            
        </BannerBase>

    )
}

export default Banner;