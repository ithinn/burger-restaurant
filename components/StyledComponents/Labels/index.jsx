import styled from "styled-components"

export const Label = styled.label`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.main};
    font-family: ${props => props.theme.fonts.mainFont};
    margin-right: ${props => props.theme.space[3]};
`

export const LabelAsButton = styled(Label)`
    border: ${props => props.theme.borders.element};
    padding: ${props => props.theme.space[2]};
    margin: 1em;
    
    
   &:hover {
        background-color: ${props => props.theme.colors.brown};
        color: white;
    }

    &:active {
        background-color: white;
        color: ${props => props.theme.colors.main}
    }
    
`