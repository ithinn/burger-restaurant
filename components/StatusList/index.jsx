import styled from "styled-components";
import { Box } from "reflexbox/styled-components"
import { BlackH2, BlueH2, BlueH1 } from "../StyledComponents/Headings"
import { Ul, Li } from "../StyledComponents/Lists";


function StatusList( {heading, array} ) {
    console.log(array);
    return(
        <Box>
            <BlueH1>{heading}</BlueH1>
            <Ul>
            {array !== null && (array.map((item, index) => {
                    return <Li listStyle="default"><BlackH2 textAlign="left">{item.orderNumber}</BlackH2></Li>
                }))}
                
                
            </Ul>
        </Box>  
    );
}

export default StatusList;