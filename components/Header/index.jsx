import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import utilStyles from '../../styles/utils.module.css'
import {useBasket} from "../../context/BasketContext";
import { RoundButton } from "../StyledComponents/Button"
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons"
import { ImUser } from "react-icons/im";
import { Count } from "../StyledComponents";
import { NavBase } from "../StyledComponents/Bases";
import {useRouter} from "next/router"
import {useAuth} from "../../config/auth";
import { SmallP } from "../StyledComponents/Headings";
import { useUser } from "../../context/UserContext";
import UserNav from "../UserNav";
import { useContext } from "react";

function Header({userData, heading, isUser, isLoggedIn}) {
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    const router = useRouter();
    const basket = useBasket();
    const userContext = useUser();
    const userName = userContext.userName;




    return(
        <header>
            <NavBase>

                <div className={utilStyles.buttonWrapper}>
                {!basket.isCartChecked && isUser && (
                    <RoundButton position="fixed" id="cartBtn" handleClick={() => basket.checkCart()}>
                        <IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                            <FiShoppingCart/>
                            {basket.productLines.length > 0 && (
                                <Count>{basket.productLines.length}</Count>
                            )} 
                        </IconContext.Provider>
                    </RoundButton>
                )}
                </div>
                

                <Link href="/">
                    <Image
                        src="/images/logo-01.png"
                        width={155}
                        height={180}
                        alt={"logo"}
                        className={utilStyles.logo}
                    />
                </Link>
                
                
                {isUser && (
                <>
                {!userContext.isUserIconChecked && (
                <div className={utilStyles.buttonWrapper}>
                    <RoundButton handleClick={event => userContext.checkUserInfo(event)}>
                        {<IconContext.Provider value={{ size: "2rem", className: "react-icons" }}>
                            <ImUser/> 
                        </IconContext.Provider>}
                    </RoundButton>
                    {userName !== undefined && (
                        <SmallP >{userName}</SmallP>
                    )}

                    
                </div>)}





                
                    {userContext.isUserIconChecked && (
                    <UserNav></UserNav>
                    )}
                    
                </>    
                )}

                
            </NavBase>
        </header>
    )
};

export default Header;

Header.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
       
        return { userData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}