import styled from "styled-components"
import { Label } from "../Checkbox";
import FlexContainer from "../FlexContainer";


const InputBase = styled.input`
    margin-right: 1em;
`

function Input({inputType, inputId, labelText, inputChangeHandler} ) {
    return(
        <>
        <FlexContainer direction="column">
            <Label> {labelText} </Label>
            <InputBase 
            type={inputType} 
            name={inputId} 
            id={inputId} 
            onChange={event => inputChangeHandler(event)}/>
        </FlexContainer>
       
        </>
    )
}

export default Input;