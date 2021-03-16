import styled from "styled-components";
import { Box } from "reflexbox/styled-components"
import { AuthProvider } from "../../../config/auth";

export const Overlay = styled(Box)`
    position: relative;
    z-index: ${props => props.theme.zIndices[3]}
`

Overlay.defaultProps = {
    width: "100%",
    height: "auto",
    bg: "overlay",
    as: "div"

}
