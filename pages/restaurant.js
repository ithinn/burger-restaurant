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
                justifyContent="space-around"
                bgImg='url("/images/dinerChairs.jpg")'
                minHeight="100vh">

               
                <StatusList id="ordered" heading="Vi jobber med:"/>
                
                <StatusList id="prepared" heading="Du kan hente:"/>
                
                
            </SectionBase>
        </Layout>
    )
}

export default Restaurant;

