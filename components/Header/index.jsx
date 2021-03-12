import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import utilStyles from '../../styles/utils.module.css'
import {LabelAsButton, InvisibleInput} from "../Checkbox";
import {PageHeading} from "../Headings";
import {useBasket} from "../../context/BasketContext";
import { RoundButton } from "../StyledComponents/Button"
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons"

const HeaderBase = styled.header`
display: flex;
width: 100%;
height: 20vh;
background: white;
color: #346f83;
align-items: center;
justify-content: space-around;

`

function Header({heading, isUser, isLoggedIn}) {

    const basket = useBasket();
    console.log(basket);
    const extraFunction = (event) => {
        console.log(event.target);
        basket.checkCart(event);
    }

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

            {isUser === true &&
                  (<Image
                  src={isLoggedIn ? "/images/Ida.jpg" : "/images/IMG_0119.jpg" }
                  alt="user image"
                  width= {40}
                  height= {40}
                  className={utilStyles.roundImg}
                 />)
            }

            
                {!basket.isCartChecked && (
                <RoundButton id="cartBtn" handleClick={event => basket.checkCart(event)}>
                    {<IconContext.Provider value={{ size: "1rem", className: "react-icons" }}>
                        <FiShoppingCart/>  
                    </IconContext.Provider>}
                </RoundButton>
                )}
            
            

        </HeaderBase>
    )
}

export default Header;
