import BurgerSvg from "../BurgerSvg";
import { SectionBase } from "../StyledComponents/Bases";
import { Box } from "reflexbox/styled-components";
import { BlackH2 } from "../StyledComponents/Headings";

function Skeleton( {text} ) {
    return(
        <SectionBase width="100%" height="100vh" flexDirection="column">
            
            <BlackH2 textAlign="center">{text ? text : "Siden lastes inn"}</BlackH2>
            
            <Box width="200px" height="200px">
                <BurgerSvg color="#346f83"></BurgerSvg>
            </Box>
            
        </SectionBase>
    )
}

export default Skeleton;