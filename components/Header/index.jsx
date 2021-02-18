import styled from "styled-components";
import Link from "next/link";

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
        </HeaderBase>
    )
}

export default Header;
