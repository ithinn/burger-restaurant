//-------------------------------------------------------------Context
import {useBasket} from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
//-------------------------------------------------------------Style
import styled from "styled-components";
import utilStyles from '../../styles/utils.module.css'
import Logo from "../Logo";
import { RoundBtn } from "../StyledComponents/Button"
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons"
import { ImUser } from "react-icons/im";
import { Count } from "../StyledComponents";
import { NavBase } from "../StyledComponents/Bases";
import { SmallP, BlueH1 } from "../StyledComponents/Headings";
import { Flex } from "reflexbox/styled-components";


function Header({heading, isUser, isCart }) {

 
    const basket = useBasket();
    const userContext = useUser();
    const userName = userContext.userName;
    
    const HeadingWrapper = styled(Flex)`
        position: absolute;
        justify-content: center;
        width: 100%;
        margin: 0 auto;
    `

    return(
        <header>
            <HeadingWrapper>
                    {heading && (<BlueH1 textAlign="center">{heading}</BlueH1>)}
            </HeadingWrapper>

            <NavBase align="center">

                <Logo/>
        
                <Flex height="auto">
                    {isUser && (
                        <>
                        {!userContext.isUserIconChecked && (
                            <div className={utilStyles.buttonWrapper}>
                                <RoundBtn handleClick={event => userContext.checkUserInfo(event)}>
                                    {<IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                                        <ImUser/> 
                                    </IconContext.Provider>}
                                </RoundBtn>
                                
                                {userName !== undefined && (
                                    <SmallP >{userName}</SmallP>
                                )} 
                            </div>
                        )}
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

