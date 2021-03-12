import styled from "styled-components";

export const BlueH1 = styled.h1`
    font-family: ${props => props.theme.fonts.mainFont};
    text-transform: uppercase;
    text-shadow: ${props => props.theme.shadows.coloredHeading};
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.main};
    text-align: center;
`

export const BlackH2 = styled.h2`
    font-family: ${props => props.theme.fonts.sectionHeading};
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.black};
    text-align: center;
`

export const BlueH3 = styled.h3`
        font-family: ${props => props.theme.fonts.mainFont};
        font-size: ${props => props.theme.fontSizes.md};
        color: ${props => props.theme.colors.main};
        text-align: center;
`