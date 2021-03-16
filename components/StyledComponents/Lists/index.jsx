import styled from "styled-components"

export const Li = styled.li`
    list-style: ${props => props.listStyle};
    font-size: ${props => props.theme.fontSizes.txt}
`

Li.defaultProps = {
    listStyle: "none"
}



export const InlineLi = styled(Li)`
    display: inline;
    text-transform: lowercase;
    font-size: ${props => props.theme.fontSizes.txt};
`

export const Ul = styled.ul`
    padding: 0;
    display: inline;
`