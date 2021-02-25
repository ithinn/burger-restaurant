import styled from "styled-components";

const CircleBase = styled.article`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${props => props.bgrClr}
`


function OrderStatusCircle({background, children}) {
    return(
        <>
        <CircleBase bgrClr={background}>{children}</CircleBase>
        </>
    )
} 

export default OrderStatusCircle;