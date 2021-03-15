import styled from "styled-components"

export const NavBase = styled.nav`
width: ${props => props.navWidth};
height: ${props => props.navHeight};
display: flex;
justify-content: ${props => props.justify};
align-items: ${props => props.align};
position: ${props => props.position}
z-index: ${props => props.theme.zIndices[3]}
`
NavBase.defaultProps = {
    navWidth: "90%",
    navHeight: "20vh",
    justify: "space-between",
    align: "flex-start",
    bg: "white",
    position: "none"

}
