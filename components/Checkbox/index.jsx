import styled from "styled-components";

const Input = styled.input`
    font-size: 1rem;
    margin-right: 1em;
`
export const Label = styled.label`
    font-size: 1rem;

`

function Checkbox( { labelText } ) {
    return(
        <>
        <Input 
            type="checkbox"
            defaultChecked={false}/>
        <Label>{ labelText }</Label>
        </>
    )
}

export default Checkbox