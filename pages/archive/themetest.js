import styled from "styled-components";
import {Flex, Box} from "reflexbox";



/*

const Box = styled.div`

    width: 100px;
    height: 100px;
    background: ${props => props.theme.backgroundClr};
    position: relative;

    margin: ${props => props.theme.space[props.margin]};
    padding: ${props => props.theme.space[props.padding]};
    border: 1px solid blue;

`

Box.defaultProps = {
    margin: 0,
    padding: 0,
    border: "1px solid blue"
};*/


const ButtonNew = styled.button`
    
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
        display: none;
    }
    
`



function ThemeTest() {
    return(
        <Box width="100vw">
            <Box bg="blue" height="300px" width={[1, 1/2, 1/4]}>
                Boxbox
                
            </Box>

            <Box bg="red" height="100px" width={[1/4, 1/2, 1]}>Card
            <ButtonNew>Button</ButtonNew>
            </Box>
            
            <Box variant="badge">Badge</Box>


            <Flex bg="cyan" height="20em" justifyContent="center">
            
                <Box bg="pink" height="100px" width="100px">Box1</Box>
                <Box bg="purple" height="100px" width="100px">Box2</Box>
                <Box bg="green" height="100px" width="100px">Box3</Box>
            </Flex>
        </Box>

        
        
    )
}

export default ThemeTest;