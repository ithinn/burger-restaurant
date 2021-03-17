import { Flex } from "reflexbox/styled-components" 
import OrderItem from "../OrderItem";
import { BlueH2 } from "../StyledComponents/Headings"

function KitchenList2({orders, toDoFocus, prepFocus, onSubmit}) {

    return (
        <>
        {orders !== null && (
        
        <div>
            {toDoFocus && (
                <>
                <BlueH2>Bestilte ordre</BlueH2>
                
                <Flex as="article" flexWrap="wrap" justifyContent="center">
                    
                    {orders.map(order => {
                        if (order.isOrdered) {
                        return <OrderItem orderData={order} onSubmit={onSubmit} />
                        } 
                    })}

                </Flex>

                </>
                
            )}

            {prepFocus && (
                <>
                <BlueH2>Klar til henting</BlueH2>
                
                <Flex as="article" bg="red" flexWrap="wrap" justifyContent="center">
                    
                    {orders.map(order => {
                        if (order.isPrepared) {
                        return <OrderItem orderData={order} onSubmit={onSubmit} />
                        } 
                    })}

                </Flex>
                </>
            )}

    
        </div>
        )}
        </>
    )

}

export default KitchenList2