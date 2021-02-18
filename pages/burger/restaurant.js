import Header from "../../components/Header";
import Layout from "../../components/Layout";
import StatusList from "../../components/StatusList";
import FlexContainer from "../../components/FlexContainer";

function Restaurant() {
    return(
        
        <Layout restaurant>
       
        <FlexContainer
                flexWidth="100%"
                flexHeight="auto"
                direction="row"
                justify="center"
                align="center">
            
            <StatusList heading="Vi jobber med:"/>
            <StatusList heading="Du kan hente:"/>
            
        </FlexContainer>
        
        </Layout>
    
    )
}

export default Restaurant;

//<Header heading="Snart får du mat"/>
        