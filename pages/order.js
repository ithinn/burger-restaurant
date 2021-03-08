import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import Button from "../components/Button";
import {useEffect, useState} from "react"
import RadioInput from "../components/RadioInput";
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";
import {useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"


const schema = object().shape({
    
})



function Order({userData}) {

    const [userId, setUserId] = useState(null)
    const [orderList, setOrderList] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {register, handleSubmit, watch, errors} = useForm({
        mode: "onChange",
        defaultValues: {
            hamburgerCount: 1,
            cheeseburgerCount: 1,
            chipsCount: 1,
            sweetPotatoeCount: 1,
            colaCount: 1,
            spriteCount: 1,
        },
        resolver: yupResolver(schema)
    })
    let userName;
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();


    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
            //console.log(user);

            if (user) {

                let uid = user.uid
                setUserId(uid);
                setIsLoggedIn(true);

            } else {
                console.log(user + "is signed out")
                setIsLoggedIn(false);
            }
        })

    }, []);


    /*
    const userContext = useAuth();
    

    //Get userId
    useEffect(() => {
        //console.log(userContext.uid);
        //setUserId(userContext.uid);
    }, [userContext])*/

    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            //console.log(user.name);
            userName = user.name
        }
    })

    const onSubmit = async (data) => {
        let orderList = [];
        //const reg = /^\d+$/;
        console.log("Added to chart")

        for (let item in data) {
            
      
            if (data[item]) {
                /*
                if (reg.test(data[item]) && data[item] > 1) {
                    orderList.push(data[item])
                    //value = data[item]
                } else {
                    //key = item
                    orderList.push(item);
                }
                */
                orderList.push(item);
            }
        }

        setOrderList(orderList);
    }

    async function sendOrder(event) {
        console.log("submitted");
        //console.log(data);
        console.log(orderList);

        try {
            const collection = firebaseInstance.firestore().collection("orders");
            await collection.doc().set({
                userId: userId,
                isOrdered: true,
                isPrepared: false,
                isPickedUp: false,
                orderList: orderList,
                orderDate: date
            })
        }
        catch(error) {
            console.log(error);
        }

    }


    

    return(
        <>
        <h1>Velkommen {userName}  </h1>
        <p>{userId}</p>

        <h2>Velg produkter</h2>
        <form
            onSubmit={handleSubmit(onSubmit)}>

            <ul>
                <li>
                    <input id="hamburger" type="checkbox" name="hamburger" ref={register} />
                    <label htmlFor="hamburger">Hamburger</label>
                </li>

                <li>
                    <input id="cheeseburger" type="checkbox" name="cheeseburger" ref={register} />
                    <label htmlFor="cheeseburger" >Cheeseburger</label>
                </li>

                <li>
                    <input id="pommesFrites" type="checkbox"  name="pommesFrites" ref={register} />
                    <label htmlFor="pommesFrites">Pommes Frites</label>
                </li>

                <li>
                    <input id="sweetPotatoe" placeholder="Søtpotet" type="checkbox" name="Søtpotetchips" ref={register} />
                    <label htmlFor="sweetPotatoe" >Søtpotetchips</label>   
                </li>

                <li>
                    <input id="cola" type="checkbox" name="cocaCola" ref={register} />
                    <label htmlFor="cola" >Cola</label>
                </li>

                <li>
                    <input id="sprite" type="checkbox" name="sprite" ref={register} />
                    <label htmlFor="sprite" >Sprite</label>
                </li>
            </ul>    
            
            <button type="submit">Send</button>

        </form>

        
        {orderList &&(
        <>    
        <h2>Kvittering</h2>
        <ul>
                {orderList && (orderList.map((item, index) => {
                    return (
                    <li key={item, index}>
                        {item}
                        
                    </li>)
                }))}
            </ul>

        <button onClick={event => sendOrder(event)} >Send inn</button>
        
        </>
        )}

        </>
    )
}

export default Order;

Order.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        return { userData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}
/*



<form onSubmit={handleSubmit(onSubmitOrder)}>
            <ul>
                {orderList && (orderList.map((item, index) => {
                    return (
                    <li key={item, index}>
                        {item}
                        
                    </li>)
                }))}
            </ul>

            <button type="submit">Send inn</button>
        </form>

                    <label htmlFor="hamburgerCount">Velg antall: </label>
                    <input id="hamburgerCount" type="number" placeholder="velg antall" name="hamburgerCount" ref={register} />


                        <label htmlFor="small">Liten</label>
                        <input id="small" name={item + "size"} type="radio" value="stor" ref={register}/>

                        <label htmlFor="medium">Medium</label>
                        <input id="medium" name={item + "size"} type="radio" value="stor" ref={register}/>

                        <label htmlFor="large">Stor</label>
                        <input id="large" name={item + "size"} type="radio" value="stor" ref={register}/>


 <label htmlFor="hamburgerSelect">Velg størrelse: </label>
                    <select id="hamburgerSelect" name="size" ref={register({ required: true })}>
                        <option value="200g">200g</option>
                        <option value="400g">400g</option>
                        <option value="800g">800g</option>
                    </select>




                        */

/* <input name="size" type="radio" value="liten" ref={register({ required: true })}/>
                        <label htmlFor="liten">Liten</label>
                        <input name="size" type="radio" value="medium" ref={register({ required: true })}/>
                        <label htmlFor="medium">Medium</label>
                        <input name="size" type="radio" value="stor" ref={register({ required: true })}/>
*/