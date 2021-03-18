import {BlueH1, HandH2, WhiteH1, H1} from "../StyledComponents/Headings";
import styled from "styled-components";
import Link from "next/link";
import {Button} from "../StyledComponents/Button";
import { SectionBase } from "../StyledComponents/Bases";
import { Flex } from "reflexbox/styled-components"


function Banner({isLoggedIn}) {

    return(

        <SectionBase bgImg='url("/images/dinerFurniture.jpg")' flexDirection="column" width="100%" height="60vh" bgPosition="top">
            <HandH2>Beste burgeren på Østlandet</HandH2>

            <Flex>
            <Link href={isLoggedIn ? "#menu" : "/login"}>
                <Button p={3} fontSize="md" bgClr="black">{isLoggedIn ? "Bestill nå" : "Logg inn"}</Button>
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