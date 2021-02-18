import Layout from "../components/Layout";
import OrderItem from "../components/OrderItem"


function Kitchen( {labelText} ) {

//Hent alle bestillinger med status "pending"
//Lagre dem i state(?)
//Map ut ett order-item for hvert - send inn state som props til labelText og andre detaljer

    return(
        <>
        <Layout kitchen>
        
        <h2>Bestillinger</h2>
       
        <OrderItem labelText="Vegetarburger" size="500g"/>
        <OrderItem labelText="Vegetarburger" size="500g"/>
        <OrderItem labelText="Vegetarburger" size="500g"/>
        <OrderItem labelText="Vegetarburger" size="500g"/>
       
        </Layout>
        </>
    )
}

export default Kitchen;