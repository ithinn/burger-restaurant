import styled from "styled-components";

const ButtonBase = styled.button`
    font-size: 1rem;
    border: 2px solid black;
    color: ${props => props.txtColor};
    background: ${props => props.btnColor};
    padding: .7em;
    text-transform: uppercase;
    margin: 2em;
    &:hover {
        background: rgba(0, 0, 0, .5);
        color: white;
    }
`

function Button( {type, btnColor, txtColor, children, id, onClick} ) {
    return(
        
        <ButtonBase 
            id={id}
            onClick={event => onClick(event)}
            type={type}
            btnColor={btnColor} 
            txtColor={txtColor}> {children} </ButtonBase> 
            
    )
}

export default Button;