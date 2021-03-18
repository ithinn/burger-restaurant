import styled from "styled-components";

export const BlueH1 = styled.h1`
    font-family: ${props => props.theme.fonts.mainFont};
    text-transform: uppercase;
    text-shadow: ${props => props.theme.shadows.coloredHeading};
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.main};
    text-align: center;
    letter-spacing: ${props => props.theme.letterSpacings[3]};
    position: ${props => props.position};
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    bottom: ${props => props.bottom};



    @media (max-width: 40em) {
        font-size: ${props => props.theme.fontSizes.lg};
    }
`
BlueH1.defaultProps = {
    position: "none",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
}

export const WhiteH1 = styled(BlueH1)`
    text-shadow: ${props => props.theme.shadows.whiteHeading};
    color: white;
`


export const HandH2 = styled.h2`

    font-family: ${props => props.theme.fonts.hand};
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray};
    text-shadow: 5px 5px #333;
    letter-spacing: ${props => props.theme.letterSpacings[2]};
    text-align: center;

    @media (max-width: 40em) {
        font-size: ${props => props.theme.fontSizes.lg};
    }
    
`

export const BlackH2 = styled.h2`
    font-family: ${props => props.theme.fonts.sectionHeading};
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.black};
    text-align: ${props => props.textAlign};

`

BlackH2.defaultProps = {
    textAlign: "center"
}

export const BlueH2 = styled(BlackH2)`
    font-family: ${props => props.theme.fonts.mainFont};
    color: ${props => props.theme.colors.main};
`

export const BlueH3 = styled.h3`
        font-family: ${props => props.theme.fonts.mainFont};
        font-size: ${props => props.theme.fontSizes.sm};
        color: ${props => props.color};
        text-align: ${props => props.textAlign};
    
`

BlueH3.defaultProps = {
    textAlign: "center",
    color: "#346f83",

};


export const Pa = styled.p`
    font-family: ${props => props.theme.fonts.text};
    font-size: ${props => props.theme.fontSizes.txt};
    font-family: ${props => props.theme.fonts.text};
    font-size: ${props => props.theme.fontSizes.txt};
    color: ${props => props.clr};
    text-align: ${props => props.textAlign};
    font-style: ${props => props.fontStyle};

`
Pa.defaultProps = {
    textAlign: "center",
    clr: "#346f83",
    fontStyle: "normal" 
}


export const SmallP = styled.p`
    font-family: ${props => props.theme.fonts.text};
    font-size: ${props => props.theme.fontSizes.txt};
    color: ${props => props.theme.colors.main};
    text-align: center;
    margin: 0;
`
