import styled from "styled-components";
import FlexContainer from "../FlexContainer";

const InvisibleInput = styled.input`
    width: 1px;
    height: 1px;
   
    :focus ~ label {
        background-color: purple;
    }
`

const LabelAsButton = styled.label`
    font-size: 1rem;
    border: 1px solid black;
    padding: .5em;
    margin: .2em;
  


`


function RadioInput( {labelText, radioId, radioName, handleChange} ) {
    return(
        <div>
        <InvisibleInput onChange={event => handleChange(event)} type="radio" id={radioId} name={radioName}/>
        <LabelAsButton htmlFor={radioId}>{labelText}</LabelAsButton>    
        </div>
        
    )
}

export default RadioInput;