import styled from "styled-components";

const FlexContainer = styled.article`
    width: ${props => props.flexWidth};
    height: ${props => props.flexHeight};
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    display: flex;
    border: ${props => props.border};
    background: ${props => props.backgroundClr};
    margin: ${props => props.theme.space[2]};
    flex-wrap: wrap;
`

FlexContainer.defaultProps= {
    border: "none", 
    flexWidth: "100px", 
    flexHeight: "auto", 
    direction: "column", 
    justify: "center", 
    align: "center",  
    backgroundClr: "none"
}


/*
function FlexContainer({}) {
    return(
        <FlexBase
            backgroundClr={backgroundClr}
            flexWidth={flexWidth}
            flexHeight={flexHeight}
            direction={direction}
            justify={justify}
            border={border}
            align={align}>
            {children}
        </FlexBase>
    )
}
*/
export default FlexContainer;