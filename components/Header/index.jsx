//-------------------------------------------------------------Context & Next
import {useBasket} from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import Link from "next/link"
import Image from "next/image"
//-------------------------------------------------------------Components
import utilStyles from '../../styles/utils.module.css'
import { RoundBtn } from "../StyledComponents/Button"
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons"
import { ImUser } from "react-icons/im";
import { Count } from "../StyledComponents";
import { NavBase, HeadingWrapper } from "../StyledComponents/Bases";
import { SmallP, BlueH1 } from "../StyledComponents/Headings";
import { Flex } from "reflexbox/styled-components";
import { useEffect, useState } from "react";


function Header({heading, isUser, isCart }) {

    const basket = useBasket();
    const userContext = useUser();
    const [userName, setUserName] = useState(null);

    let userTemp = userContext.userName;

    //Forces the header component to re-render when a userName is detected from the UserContext. (Cowboy-solution, but it seems to work)
    useEffect(() => {
        setUserName(userTemp);
    }, [userTemp])

    return(
        <header>
            <HeadingWrapper>
                    {heading && (<BlueH1 textAlign="center">{heading}</BlueH1>)}
            </HeadingWrapper>

            <NavBase align="center">


            <Link passHref href="/">
                <a>
                <Image
                    src="/images/logo-01.png"
                    width={130}
                    height={150}
                    alt="logo"
                />
                </a>
            </Link>
              
        
                <Flex height="auto">
                    {isUser && (
                        <>
                        
                            <div className={utilStyles.buttonWrapper}>
                                
                                <Link passHref href="/userStatus">
                                    <a>
                                    <RoundBtn handleClick={event => userContext.checkUserInfo(event)}>
                                        {<IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                                            <ImUser/> 
                                        </IconContext.Provider>}
                                    </RoundBtn>
                                    </a>
                                </Link>
                                
                                {userName !== undefined && (
                                    <SmallP >{userName}</SmallP>
                                )} 
                            </div>
                        
                        </> 
                    )}

                    {isCart &&(
                        <div className={utilStyles.buttonWrapper}>
                            {!basket.isCartChecked && isUser && (
                                <RoundBtn position="fixed" id="cartBtn" handleClick={() => basket.checkCart()}>
                                    <IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                                        <FiShoppingCart/>
                                        {basket.productLines.length > 0 && (
                                            <Count>{basket.productLines.length}</Count>
                                        )} 
                                    </IconContext.Provider>
                                </RoundBtn>
                            )}
                        </div>
                    )}          
                </Flex>
            </NavBase>
        </header>
    )
};

export default Header;

