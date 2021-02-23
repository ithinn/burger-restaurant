import styled from "styled-components";

const FlexBase = styled.article`
    width: ${props => props.flexWidth};
    height: ${props => props.flexHeight};
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    display: flex;
    border: ${props => props.border}
    
`

function FlexContainer({border, flexWidth, flexHeight, direction, justify, align, children}) {
    return(
        <FlexBase
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

export default FlexContainer;