import Layout from "../components/Layout";
import StatusList from "../components/StatusList";
import FlexContainer from "../components/FlexContainer";
import {useAuth} from "../config/auth";
import {useEffect} from "react"

function Restaurant() {
    const userContext = useAuth();

    useEffect(() => {
        console.log("context", userContext);
 
    }, [userContext])
    
  

    return(
        
        <Layout restaurant>
       
        <FlexContainer
                flexWidth="100%"
                flexHeight="auto"
                direction="column"
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
        