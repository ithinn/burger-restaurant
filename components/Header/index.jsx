import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";


const HeaderBase = styled.header`
display: flex;
width: 100%;
height: 20vh;
background: black;
color: white;
align-items: center;
`

const Logo = styled.img`
    width: 70px;
    height: 70px;
    margin-right: 1em;
`

function Header({heading}) {
    return(
        <HeaderBase>
            <Link href="/burger">
                <Logo/>
            </Link>
            
            <h1>{heading}</h1>

            <Image
             src="/../../../images/Ida.jpg"
             alt="user image"
             width= {50}
             height= {50}
             border-radius="50%"
            />
                
           

        </HeaderBase>
    )
}

export default Header;
