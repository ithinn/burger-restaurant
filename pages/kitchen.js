import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Button } from "../components/StyledComponents/Button";
import firebaseInstance from "../config/firebase";
import { SectionBase, NavBase } from "../components/StyledComponents/Bases"
import KitchenList2 from "../components/KitchenList2"
import { useAuth } from "../config/auth";
import Skeleton from "../components/Skeleton"
import { useBasket } from "../context/BasketContext";

function Kitchen() {

    const [prepFocus, setPrepFocus] = useState(false);
    const [toDoFocus, setToDoFocus] = useState(true);
    const { loading } = useAuth();
    const basket = useBasket();

    //Toggle which list that should be rendered
    function toggleLists(event) {

        if (event.target.id === "todoBtn") {
            setToDoFocus(true);
            setPrepFocus(false);
        } else {
            setToDoFocus(false);
            setPrepFocus(true);
        }
    }

    if (loading) {
        return <Skeleton/>
    }

    return(
        <Layout>
            
            <SectionBase width="100%" height="40vh" bgImg='url("images/dinerChairs.jpg")'>

                
                <NavBase justify="center">
                    <Button 
                        fontSize="md" id="todoBtn" 
                        handleClick={event => toggleLists(event)} >Bestilt
                    </Button>

                    <Button 
                        fontSize="md" 
                        handleClick={event => toggleLists(event)}> Klar til henting
                    </Button>
                </NavBase>
            </SectionBase>

            <SectionBase>
                <KitchenList2 
                    toDoFocus={toDoFocus}
                    prepFocus={prepFocus}
                    handleAddOns={item => basket.listAddOns(item)}
                     
                />
            </SectionBase>
            
        </Layout>
    )
}

export default Kitchen;
