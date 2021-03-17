import {BlueH1, HandH2, WhiteH1, H1} from "../StyledComponents/Headings";
import styled from "styled-components";
import Link from "next/link";
import {Button} from "../StyledComponents/Button";
import { SectionBase } from "../StyledComponents/Bases";
import { Flex } from "reflexbox/styled-components"


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

        <SectionBase bgImg='url("/images/dinerFurniture.jpg")' flexDirection="column" height="60vh" bgPosition="top">
            <HandH2>Beste burgeren på Østlandet</HandH2>

            <Flex>
            <Link href="/login">
                <Button bgClr="black">{isLoggedIn ? "Bestill nå" : "Logg inn"}</Button>
            </Link>

            {!isLoggedIn && (
            <Link href="/addUser">
                <Button bgClr="black">Registrer ny bruker</Button>
            </Link>
            )}
            </Flex>
            
        </SectionBase>

    )
}

export default Banner;