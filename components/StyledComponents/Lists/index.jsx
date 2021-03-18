import styled from "styled-components"

export const Li = styled.li`
    list-style: ${props => props.listStyle};
    font-size: ${props => props.theme.fontSizes.txt};
    color: ${props => props.color};
    font-family: ${props => props.fontFamily}
`

Li.defaultProps = {
    listStyle: "none",
    color: "#346f83",
    fontFamily: "oswald"
}



export const InlineLi = styled(Li)`
    display: inline;
    
    text-transform: lowercase;
    font-size: ${props => props.theme.fontSizes.txt};
`

export const Ul = styled.ul`
    padding: ${props => props.padding};
    display: ${props => props.display};
    padding-top: ${props => props.pt}
    
`
Ul.defaultProps = {
    padding: "0",
    display: "block",
    pt: "0"
}
