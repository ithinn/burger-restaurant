import styled from "styled-components"
import {Box, Flex} from "reflexbox/styled-components"

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
    bg: "white",
    position: "none"
}

export const SectionBase = styled(Flex)`
    display: flex;
    flex-wrap: wrap;
    background-image: ${props => props.bgImg};
    background-size: cover;

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
    border: "none"


}
