import styled from "styled-components"

export const Input = styled.input`
    font-family: ${props => props.theme.fonts.mainFont};
    border: ${props => props.error ? props.theme.borders.error : props.theme.borders.element};
    margin-bottom: ${props => props.marginB};
    font-size: ${props => props.theme.fontSizes.sm};
    width: ${props => props.inpWidth}
`

Input.defaultProps = {
    inpWidth: "auto",
    marginB: "1em",
}


export const Select = styled.select`
    color: ${props => props.theme.colors.main};
    font-family: ${props => props.theme.fonts.mainFont};
    font-size: ${props => props.theme.fontSizes.sm};
    border: ${props => props.theme.borders.element};
`

export const InvisibleCheckbox = styled.input`
    width: .1px;
    height: .1px;
    margin-bottom: 2em;
    
    &:checked ~ label {
        background-color: ${props => props.theme.colors.brown};
        color: white;
    }  
`