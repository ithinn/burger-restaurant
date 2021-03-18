import Layout from "../components/Layout";
import StatusList from "../components/StatusList";
import firebaseInstance from "../config/firebase";
import {useEffect, useState} from "react"
import {SectionBase} from "../components/StyledComponents/Bases"
import Skeleton from "../components/Skeleton";
import { useAuth } from "../config/auth";

function Restaurant() {

    const { loading } = useAuth();

    if (loading) {
        return <Skeleton/>
    }
 
    return(
        <Layout restaurant>
            <SectionBase
                flexDirection="row" 
                width="100%" 
                alignItems="flex-start" 
                justifyContent="space-between">

                <SectionBase m="0" width="13em" minHeight="100vh" bgImg='url("/images/dinerChairs.jpg")'></SectionBase>
                    <StatusList id="ordered" heading="Vi jobber med:"/>
                    <StatusList id="prepared" heading="Du kan hente:"/>
                <SectionBase bgPosition="top" m="0" width="13em" height="100vh" bgImg='url("/images/dinerFurniture.jpg")'></SectionBase>
                
            </SectionBase>
        </Layout>
    )
}

export default Restaurant;

