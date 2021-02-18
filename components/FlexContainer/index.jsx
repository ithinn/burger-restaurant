import styled from "styled-components";

const FlexBase = styled.article`
    width: ${props => props.flexWidth};
    height: ${props => props.flexHeight};
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    display: flex;
    
`

function FlexContainer({flexWidth, flexHeight, direction, justify, align, children}) {
    return(
        <FlexBase
            flexWidth={flexWidth}
            flexHeight={flexHeight}
            direction={direction}
            justify={justify}
            align={align}>
            {children}
        </FlexBase>
    )
}

export default FlexContainer;