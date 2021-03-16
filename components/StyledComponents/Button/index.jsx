import styled, { withTheme } from "styled-components"
import theme from "../../../styles/theme"
import { Box} from "reflexbox/styled-components"

const ButtonBase = styled(Box)`
    border: ${props => props.theme.borders.element};
    text-transform: uppercase;

    &:hover {
        color: ${props => props.hoverClr};
        background-color: ${props => props.hoverBg};
    }
`

ButtonBase.defaultProps = {
    color: "white",
    bg: "main",
    as: "button",
    margin: 3,
    fontSize: "sm",
    fontFamily: "mainFont",
    p: [1,2],
    hoverClr: "#346f83",
    hoverBg: "white"
}

export function Button({ handleClick, children, id, ...rest }) {
    return (
        <ButtonBase 
        
        onClick={handleClick}
        id={id}
        {...rest}

        >{ children }
        </ButtonBase>
    )

}

const RoundButtonBase = styled.button`
    border: ${props => props.theme.borders.element};
    color: ${props => props.theme.colors.main};
    width: ${props => props.btnWidth};
    height: ${props => props.btnHeight};
    border-radius: ${props => props.theme.radii.round};
    position: ${props => props.position};
 
    &:hover {
        color: white;
        background: ${props => props.theme.colors.main};

    }
    
    display: flex;
    justify-content: center;
    align-items: center;
`

RoundButtonBase.defaultProps = {
    position: "none",
    btnWidth: "60px",
    btnHeight: "60px",
}
/*
top: "8vh",
    position: "none" ,
    left: "10%",
    right:"none",


    position: ${props => props.position};
    top: ${props => props.top};
    left: ${props => props.left};
       z-index: ${props => props.theme.zIndices[3]}; 
*/
export function RoundButton({ handleClick, children, top, position, left, right, btnWidth, btnHeight }) {
    return (
        <RoundButtonBase 
        onClick={handleClick}
        top={top}
        left={left}
        position={position}
        right={right}
        btnWidth={btnWidth}
        btnHeight={btnHeight}
        >{ children }</RoundButtonBase>
    )

}



