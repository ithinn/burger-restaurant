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

function StatusList( {heading} ) {
    return(
    <>
    <Container>
    <h2>{heading}</h2>
    <UlBase>
        <li>302</li>
        <li>303</li>
        <li>304</li>
    </UlBase>
    </Container>
    </>);
}

export default StatusList;