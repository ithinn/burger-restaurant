import styled from "styled-components"

export const Count = styled.div`
    width: 25px;
    height: 20px;
    background-color: ${props => props.theme.colors.red};
    border-radius: ${props => props.theme.radii.round};
    color: white;
    padding: .1em;
    display: flex;
    justify-content: center;
    align-items: center;
`