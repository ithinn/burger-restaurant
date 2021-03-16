import styled from "styled-components"

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

export const SectionBase = styled.section`
    width: ${props => props.sectionWidth};
    height: ${props => props.sectionHeight};
    background: #f9f9f8;
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    margin: ${props => props.margin};
    background-image: ${props => props.bgImg};
    background-size: cover;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align}
`

SectionBase.defaultProps = {
    margin: "0",
    sectionWidth: "96%",
    sectionHeight: "auto",
    bgImg: "none",
    justify: "center",
    align: "center",


}
