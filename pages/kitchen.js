//------------------------------------------------------React, Firebase, Context
import { useState } from "react";
import { useAuth } from "../config/auth";
import { useBasket } from "../context/BasketContext";
//------------------------------------------------------Components
import Layout from "../components/Layout";
import { Button } from "../components/StyledComponents/Button";
import { SectionBase, NavBase } from "../components/StyledComponents/Bases"
import KitchenList from "../components/KitchenList"
import Skeleton from "../components/Skeleton"
import Banner from "../components/Banner"

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
            
            <Banner bgImg='url("images/dinerChairs.jpg")'>
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
            </Banner>

            <SectionBase>
                <KitchenList 
                    toDoFocus={toDoFocus}
                    prepFocus={prepFocus}
                    handleAddOns={item => basket.listAddOns(item)} 
                />
            </SectionBase>
            
        </Layout>
    )
}

export default Kitchen;
