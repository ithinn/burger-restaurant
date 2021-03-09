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
        <InvisibleInput 
            type="checkbox"
            defaultChecked={false}
            name={name}
            ref={ref}
        />

        <Label htmlFor={name}>{ labelText }</Label>
        </>
    )
}

export default Checkbox