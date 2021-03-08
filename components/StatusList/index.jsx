import styled from "styled-components";

const UlBase = styled.ul`
    width: 30%;
    height: auto;
    font-size: 2rem;
    
`

const Container = styled.div`
    width: 50%;
    height: auto;
    padding: 1em;
   

`

function StatusList( {heading, array} ) {
    console.log(array);
    return(
    <>
    <Container>
    <h2>{heading}</h2>
    <UlBase>
    {array !== null && (array.map((item, index) => {
            return <li>{item.orderNumber}</li>
        }))}
        
        
    </UlBase>
    </Container>
    </>);
}

export default StatusList;