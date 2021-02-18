import styled from "styled-components";

function Select( {children, labelText, inputId, handleChange} ) {
    return(
        <>
        <label htmlFor={inputId}>{labelText}</label>
        <select name={inputId} id={inputId} onChange={event => handleChange(event)}> {children} </select>
        </>

    )
}

export default Select;