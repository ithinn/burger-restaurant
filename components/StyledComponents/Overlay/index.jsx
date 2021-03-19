import styled from "styled-components";
import { Box } from "reflexbox/styled-components"
import { AuthProvider } from "../../../config/auth";

export const Overlay = styled(Box)`
    position: fixed;
    top: ${props => props.top};
    z-index: ${props => props.theme.zIndices[2]};
    background-color: rgba(0,0,0,.7);
`

Overlay.defaultProps = {
    width: "100vw",
    height: "auto",
    bg: "overlay",
    as: "div",
    top: "0"
}
