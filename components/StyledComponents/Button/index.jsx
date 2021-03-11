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

ButtonBase.defaultProps = {
    bgrColor: "#346f83",
    txtColor: "#333333"
}

function Button({ handleClick, children }) {
    return (
        <ButtonBase onClick={handleClick}>{ children }</ButtonBase>
    )

}

export default Button