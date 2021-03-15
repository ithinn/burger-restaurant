import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import utilStyles from '../../styles/utils.module.css'
//import {LabelAsButton, InvisibleInput} from "../Checkbox";
//import {PageHeading} from "../Headings";
import {useBasket} from "../../context/BasketContext";
import { RoundButton } from "../StyledComponents/Button"
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons"
import { ImUser } from "react-icons/im";
import {Flex, Box} from "reflexbox"
import {Count} from "../StyledComponents";


const HeaderBase = styled.header`
width: 100%;
height: 20vh;
background: #f9f9f8;
color: #346f83;

`



function Header({heading, isUser, isLoggedIn}) {

    const basket = useBasket();

    return(
        <HeaderBase>
            
            {!basket.isCartChecked && (

            



                
                <Flex width="100px" flexDirection="column">   
                    <RoundButton position="fixed" id="cartBtn" handleClick={() => basket.checkCart()}>
                        <IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                            <FiShoppingCart/>
                            {basket.productLines.length > 0 && (
                                <Count>{basket.productLines.length}</Count>
                            )} 
                        </IconContext.Provider>
                    </RoundButton>

                    
                </Flex>
                
                )}
            
                <Flex width="100%" justifyContent="center" marginTop="1em">
                    
                    <Link href="/">
                        <Image
                            src="/images/logo-01.png"
                            width={155}
                            height={180}
                            alt={"logo"}
                            className={utilStyles.logo}
                        />
                    </Link>

                    <RoundButton position="relative" top="5vh" right="40vw" left="none" id="cartBtn" handleClick={event => basket.checkCart(event)}>
                    {<IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                        <ImUser/> 
                    </IconContext.Provider>}
                    </RoundButton>
                    
                </Flex>
                
  

            
            
                
        </HeaderBase>
    )
}

export default Header;

/*
{isUser === true &&
    (<Image
    src={isLoggedIn ? "/images/Ida.jpg" : "/images/IMG_0119.jpg" }
    alt="user image"
    width= {40}
    height= {40}
    className={utilStyles.roundImg}
   />)
}
*/
