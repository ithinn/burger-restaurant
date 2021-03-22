import styled from "styled-components"
import {Box, Flex} from "reflexbox/styled-components"

export const HeadingWrapper = styled(Flex)`
    position: absolute;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
`

export const ImgBase = styled.img`
    width: 100%;
    height: 10vh;
    object-fit: cover;
    object-position: bottom;
`

export const NavBase = styled.nav`
    width: ${props => props.navWidth};
    height: ${props => props.navHeight};
    display: flex;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    position: ${props => props.position};
    z-index: ${props => props.theme.zIndices[3]};

`
NavBase.defaultProps = {
    navWidth: "90%",
    navHeight: "20vh",
    justify: "space-between",
    align: "flex-start",
    position: "none",
}


export const SectionBase = styled(Flex)`
    display: flex;
    flex-wrap: wrap;
    background-image: ${props => props.bgImg};
    background-size: cover;
    background-position: ${props => props.bgPosition};
    position: ${props => props.position};
    top: ${props => props.top};
    right: ${props => props.right};
    z-index: ${props => props.zIndices}
`

SectionBase.defaultProps = {
    as: "section",
    m: "0 auto",
    width: "96%",
    height: "auto",
    bg: "#f9f9f8",
    bgImg: "none",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    bgPosition: "center",
    position: "none",
    zIndices: 0,
    top: "0",
    right: "0"
}


export const LoginBase = styled.section`
    background-image: url("/images/dinerChairs.jpg");
    background-size: cover;
    width: 100%;
    height: 150;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`


export const FormBase = styled(Box)`
    background-color: white;
`

FormBase.defaultProps = {
    as: "article",
    mt: "3em",
    ml: "auto",
    mr: "auto",
    mb: "1em",
    width: "20em",
    p: 3   
}

