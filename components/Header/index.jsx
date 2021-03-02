import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import utilStyles from '../../styles/utils.module.css'

const HeaderBase = styled.header`
display: flex;
width: 100%;
height: 20vh;
background: black;
color: white;
align-items: center;
justify-content: space-around;
`

function Header({heading, isUser, isLoggedIn}) {
    return(
        <HeaderBase>
            <Link href="/burger">
                <Image
                    src="/images/IMG_0039.jpg"
                    width={50}
                    height={50}
                    alt={"logo"}
                    className={utilStyles.roundImg}
                />
            </Link>
            
            <h1>{heading}</h1>

            {isUser === true &&
                  (<Image
                  src={isLoggedIn ? "/images/Ida.jpg" : "/images/IMG_0119.jpg" }
                  alt="user image"
                  width= {40}
                  height= {40}
                  className={utilStyles.roundImg}
                 />)
            }
        </HeaderBase>
    )
}

export default Header;
