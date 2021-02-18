import styled from "styled-components";
import FlexContainer from "../FlexContainer";

const InvisibleInput = styled.input`
    width: 1px;
    height: 1px;
    display: inline-block;
    :focus ~ label {
        background-color: purple;
    }
`

const LabelAsButton = styled.label`
    font-size: 1rem;
    border: 1px solid black;
    padding: .5em;
    margin: .2em;
    :focus {
        border: 3px solid red;
    }
    display: inline;

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