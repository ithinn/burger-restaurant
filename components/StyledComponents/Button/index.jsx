import styled from "styled-components"
import theme from "../../../styles/theme"


const ButtonBase = styled.button`
    color: white;
    background-color: ${props => props.theme.colors.main};
    border: ${props => props.theme.borders.element};
    font-size: ${props => props.theme.fontSizes.sm};
    margin: ${props => props.theme.space[3]};
    padding: ${props => props.theme.space[1, 2]};
    font-family: ${props => props.theme.fonts.mainFont};
    text-transform: uppercase;
`

export function Button({ handleClick, children }) {
    return (
        <ButtonBase onClick={handleClick}>{ children }</ButtonBase>
    )

}

const RoundButtonBase = styled.button`
    border: ${props => props.theme.borders.element};
    color: ${props => props.theme.colors.main};
    width: 40px;
    height: 40px;
    border-radius: ${props => props.theme.radii.round};
    position: fixed;
    top: ${props => props.top};
    left: ${props => props.left};
    z-index: ${props => props.theme.zIndices[3]}; 
    
`

RoundButtonBase.defaultProps = {
    top: "none",
    position: "fixed" ,
    left: "10%" 
}

export function RoundButton({ handleClick, children }) {
    return (
        <RoundButtonBase onClick={handleClick}>{ children }</RoundButtonBase>
    )

}



