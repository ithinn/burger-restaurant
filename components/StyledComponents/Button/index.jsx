import styled, { withTheme } from "styled-components"
import theme from "../../../styles/theme"


const ButtonBase = styled.button`
    color: ${props => props.clr};
    background-color: ${props => props.bgClr};
    border: ${props => props.theme.borders.element};
    font-size: ${props => props.theme.fontSizes.sm};
    margin: ${props => props.theme.space[3]};
    padding: ${props => props.theme.space[1, 2]};
    font-family: ${props => props.theme.fonts.mainFont};
    text-transform: uppercase;
`

ButtonBase.defaultProps = {
    clr: "white",
    bgClr: "#346f83",
}

export function Button({ handleClick, children, bgClr, clr }) {
    return (
        <ButtonBase 
        bgClr={bgClr}
        clr={clr}
        onClick={handleClick}>{ children }</ButtonBase>
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



