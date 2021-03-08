import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import Button from "../components/Button";
import {useEffect, useState } from "react"
import RadioInput from "../components/RadioInput";
import firebaseInstance from "firebase";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'
import {useAuth} from "../config/auth";
import {useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import { useRouter } from "next/router";
import { render } from "react-dom";


const schema = object().shape({
    
})



function Order({userData, orderData}) {

    const [userId, setUserId] = useState(null)
    const [userHasOrdered, setUserHasOrdered] = useState(false)
    const [orderList, setOrderList] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null);
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

    //console.log(orderData);
    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {

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

    //Get number of existing orders
    useEffect(() => {
        let ref = firebaseInstance.firestore().collection("orders").where("isPickedUp", "==", false)
        ref.onSnapshot((snapshot) => {
            console.log(snapshot);
            let data = [];
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            console.log(data);
            setOrderNumber(data.length + 101)
            
        })

    }, []);

    console.log(orderNumber);
   
    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            //console.log(user.name);
            userName = user.name
        }
    })

    const onSubmit = async (data) => {
        let orderList = [];
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


        if (isLoggedIn) {
            console.log("submitted");
     
            try {
                const collection = firebaseInstance.firestore().collection("orders");
                await collection.doc().set({
                    userId: userId,
                    isOrdered: true,
                    isPrepared: false,
                    isPickedUp: false,
                    orderList: orderList,
                    orderDate: date,
                    orderNumber: orderNumber
                    
                })
                setUserHasOrdered(true);
            }
            catch(error) {
                console.log(error);
            }
        }
      
    }

    function renderLoginFirst() {
        return(
            <>
            <h2>
                <Link href="/login"><a className={utilStyles.link}>Logg inn</a></Link> for å bestille mat</h2>
            </>
        )
    }

    function renderPage() {
        return(
            <article>
                <h1>Velkommen {userName}</h1>
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
            </article>
        )
        
    }

    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
            console.log("is signed out")
          }).catch((error) => {
            console.log(error);
          });
          setIsLoggedIn(false);
    }


    //Redirect after sending the order
    const useUser = () => ({ user: null, loading: false })
    const { user, loading } = useUser()
    const router = useRouter()
    
      useEffect(() => {
        if (userHasOrdered === true) {
            if (!(user || loading)) {
                router.push('/userStatus')
                console.log("ordered");
            }

            return <p>Redirecting...</p>
        }

      }, [userHasOrdered, user, loading])
    
      


    return(
        <Layout user>
        {isLoggedIn ? renderPage() : renderLoginFirst()}
        
        

        
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

        <button onClick={handleSignOutClick} >Logg ut</button>

        </Layout>
    )
}

export default Order;

Order.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        const orderData = await readCollection("orders");
        return { userData, orderData }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}
/*
  
    const userContext = useAuth();
    

    //Get userId
    useEffect(() => {
        //console.log(userContext.uid);
        //setUserId(userContext.uid);
    }, [userContext])



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