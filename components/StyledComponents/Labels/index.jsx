import styled from "styled-components"
import { Box } from "reflexbox/styled-components"


export const Label = styled(Box)`
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.main};
    font-family: ${props => props.theme.fonts.mainFont};
    margin-right: ${props => props.theme.space[3]};
    display: ${props => props.display}
`

Label.defaultProps = {
    as: "label",
    ml: 0
}

export const LabelAsButton = styled(Label)`
    color: ${props => props.theme.colors.red};
    border: ${props => props.theme.borders.subElement};
    padding: ${props => props.theme.space[1]};
    
   &:hover {
        background-color: ${props => props.theme.colors.brown};
        color: white;
    }

    &:active {
        background-color: white;
        color: ${props => props.theme.colors.main}
    }
    
`