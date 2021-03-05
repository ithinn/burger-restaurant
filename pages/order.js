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
    const [isLoggedIn, setIsLoggedIn] = useState(null)
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

    const userContext = useAuth();
    let userName;

    //Get userId
    useEffect(() => {
        //console.log(userContext.uid);
        //setUserId(userContext.uid);
    }, [userContext])

    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            console.log(user.name);
            userName = user.name
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
        const {hamburger, cheeseburger} = data;
        console.log(cheeseburger);

        let orderList = [];
        var reg = /^\d+$/;

        let testObj;
        let key;
        let value;

        const word = "Count"
        for (let item in data) {
            
            //console.log(typeof data[item]);
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

            testObj = {
                key: value
            }

           // console.log(testObj)
        }

        setOrderList(orderList);
        console.log(orderList);
    }

    const onSubmitOrder = async (data) => {
        console.log("submitted");
        console.log(data);
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

                   
                    
                    <label htmlFor="hamburgerCount">Velg antall: </label>
                    <input id="hamburgerCount" type="number" placeholder="velg antall" name="hamburgerCount" ref={register} />
                </li>

                <li>
                    <input id="cheeseburger" type="checkbox" name="cheeseburger" ref={register} />
                    <label htmlFor="cheeseburger" >Cheeseburger</label>

                    <label htmlFor="cheeseburgerCount">Velg antall: </label>
                    <input id="cheeseburgerCount" type="number" placeholder="velg antall" name="cheeseburgerCount" ref={register} />
                </li>

                <li>
                    <input id="pommesFrites" type="checkbox"  name="pommesFrites" ref={register} />
                    <label htmlFor="pommesFrites">Pommes Frites</label>
                    
                    <label htmlFor="chipsCount">Velg antall: </label>
                    <input id="chipsCount" type="number" placeholder="velg antall" name="chipsCount" ref={register} />
                </li>

                <li>
                    <input id="sweetPotatoe" placeholder="Søtpotet" type="checkbox" name="Søtpotetchips" ref={register} />
                    <label htmlFor="sweetPotatoe" >Søtpotetchips</label>
                    
                    <label htmlFor="sweetPotatoeCount">Velg antall: </label>
                    <input id="sweetPotatoeCount" type="number" placeholder="velg antall" name="sweetPotatoeCount" ref={register} />
                </li>

                <li>
                    <input id="cola" type="checkbox" name="cocaCola" ref={register} />
                    <label htmlFor="cola" >Cola</label>
                    
                    <label htmlFor="colaCount">Velg antall: </label>
                    <input id="colaCount" type="number" placeholder="velg antall" name="colaCount" ref={register} />
                </li>


                <li>
                    <input id="sprite" type="checkbox" name="sprite" ref={register} />
                    <label htmlFor="sprite" >Sprite</label>
                    
                    <label htmlFor="spriteCount">Velg antall: </label>
                    <input id="spriteCount" type="number" placeholder="velg antall" name="spriteCount" ref={register} />
                </li>
            </ul>    
            
            
            
            
            
            

            <button type="submit">Send</button>

        </form>

        

        {orderList &&(
        <>    
        <h2>Velg antall</h2>
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