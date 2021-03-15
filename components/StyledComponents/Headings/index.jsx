import styled from "styled-components";

export const BlueH1 = styled.h1`
    font-family: ${props => props.theme.fonts.mainFont};
    text-transform: uppercase;
    text-shadow: ${props => props.theme.shadows.coloredHeading};
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.main};
    text-align: center;
`
export const WhiteH1 = styled(BlueH1)`
    text-shadow: ${props => props.theme.shadows.whiteHeading};
    color: white;
`


export const BlackH2 = styled.h2`
    font-family: ${props => props.theme.fonts.sectionHeading};
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.black};
    text-align: center;

`
export const BlueH2 = styled(BlackH2)`
    font-family: ${props => props.theme.fonts.mainFont};
    color: ${props => props.theme.colors.main};
`

export const BlueH3 = styled.h3`
        font-family: ${props => props.theme.fonts.mainFont};
        font-size: ${props => props.theme.fontSizes.sm};
        color: ${props => props.clr};
        text-align: ${props => props.textAlign};
`

BlueH3.defaultProps = {
    textAlign: "center",
    clr: "#346f83"
}

export const Paragraph = styled.p`
    font-family: ${props => props.theme.fonts.text};
    font-size: ${props => props.theme.fontSizes.txt};
    color: ${props => props.clr};
    text-align: ${props => props.textAlign};
    font-style: ${props => props.style};
`
Paragraph.defaultProps = {
    textAlign: "center",
    clr: "#346f83",
    style: "normal" 

}


export const SmallP = styled.p`
    font-family: ${props => props.theme.fonts.text};
    font-size: ${props => props.theme.fontSizes.txt};
    color: ${props => props.theme.colors.main};
    text-align: center;
    margin: 0;
`
