import styled from "styled-components"

export const Label = styled.label`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.main};
    font-family: ${props => props.theme.fonts.mainFont};
    margin-right: ${props => props.theme.space[3]};
`