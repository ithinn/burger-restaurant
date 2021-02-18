import styled from "styled-components";
import {Label} from "../Checkbox";



function Select( {children, labelText, inputId, handleChange} ) {
    return(
        <div>
        <Label htmlFor={inputId}>{labelText}</Label>
        <select name={inputId} id={inputId} onChange={event => handleChange(event)}> {children} </select>
        </div>

    )
}

export default Select;