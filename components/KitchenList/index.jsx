import { FiPrinter } from "react-icons/fi";
import { Button } from "../StyledComponents/Button"
import { Flex, Box } from "reflexbox/styled-components" 
import OrderItem from "../OrderItem";
import {Overlay} from "../StyledComponents/Overlay"

function KitchenList( {orders, id, side, handleClick, onSubmit, focus, btnText } ) {
    console.log(orders);
    return(
        <>

       
        <Flex as="article" minHeight="110vh" minWidth="30em" width="50%" flexDirection="column" p={0} variant={focus && side==="L" ? "fgBoxL" : focus && side === "R" ? "fgBoxR" : "bgBox"}>
           
           
            <Button bg={!focus ? "#333" : "#333"} margin={0} handleClick={handleClick} id={"btn" + id} >
                {btnText}
            </Button>

        {orders !== null && (

            <>
            <Box opacity={!focus ? ".1" : "1"} boxShadow={focus && id === "todo" ? "fgBoxL" : focus && id === "prepared" ? "fgBoxR" : null }as="article">

           
                {id==="todo" && (

                    <>
                    {orders.map(order => {
                        if (order.isOrdered) {
                            return <OrderItem listId={id} orderData={order} onSubmit={onSubmit} />
                        } 
                    })}
                    </>

                )}

                {id==="prepared" && (
                    <>
                    {orders.map(order => {
                        if (order.isPrepared) {
                            return <OrderItem listId={id} orderData={order} onSubmit={onSubmit} />
                        } 
                    })}
                    </>

                )}
           
            </Box>

          </>
            
        )}
           
            

               

        </Flex>
         
        </>
    )
}

export default KitchenList;

//
//{!focus && (<Overlay minHeight="110vh"></Overlay>)}
