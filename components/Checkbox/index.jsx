import styled from "styled-components";

const InvisibleInput = styled.input`
    
    width: .1px;
    height: .1px;



`
export const Label = styled.label`
    font-size: 1rem;
    margin: 1em;
    border: 1px solid black;
    padding: 2em;

    &&:hover {
        background: purple;
    }
`


function Checkbox( { labelText, name, ref } ) {
    return(
        <>
        <input
            type="checkbox"
            defaultChecked={false}
            name={name}
            ref={ref}
        />

        <label htmlFor={name}>{ labelText }</label>
        </>
    )
}

export default Checkbox