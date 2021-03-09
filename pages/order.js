import Layout from "../components/Layout";
import readCollection from "./database/readCollection";
import Select from "../components/Select";
import FlexContainer from "../components/FlexContainer";
import Button from "../components/Button";
import {useEffect, useState, useRef } from "react"
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
import CheckBox from "../components/Checkbox";
import InputBlock from "../components/InputBlock";
const schema = object().shape({
    
})



function Order({userData, orderData, food}) {

    const [userId, setUserId] = useState(null)
    const [burgerInput, setBurgerInput] = useState(null);
    const [userHasOrdered, setUserHasOrdered] = useState(null)
    const [sidesInput, setSidesInput] = useState(null);
    const [drinksInput, setDrinksInput] = useState(null);
    const [orderList, setOrderList] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null);
    const {register, handleSubmit, reset, watch, errors} = useForm({
        mode: "onChange",
        defaultValues: {
            hamburgerCount: 1,
            cheeseburgerCount: 1,
            chipsCount: 1,
            sweetPotatoeCount: 1,
            colaCount: 1,
            spriteCount: 1,
            typeSize: null
        },
        resolver: yupResolver(schema)
    })
    let userName;
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();


    

   

    //Get userId
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
            setOrderNumber(data.length + 101)
            
        })

    }, []);

   
    //Get userName
    userData.forEach(user => {
        if (user.id === userId) {
            userName = user.name
        }
    })


    //Add to order
    const onSubmit = async (data) => {
        let orderList = [];
        console.log("Added to chart")

        let type;
        let countTest;
        let sizeTest;
       
        for (let item in data.type) {
            
            if (data.type[item]) {
                //console.log(item, "is true");
               // orderList.push(item);
                type = item;

                for (let count in data.typeCount) {
                    
                    if (count === item) {
                        //console.log(data.typeCount[count], item, count)
                        countTest = data.typeCount[count]
                    }
                  
                }

                for (let size in data.typeSize) {
                    
                    if (size === item) {
                        //console.log(data.typeSize[size], item, count);
                        sizeTest = data.typeSize[size]
                    }   
                }
                console.log(type, sizeTest, countTest);
                orderList = [...orderList, [type, sizeTest, countTest]]
               // setOrderList(prev => [...prev, [type, sizeTest, countTest]]);
            }

            
            
        }

        console.log(orderList);
        setOrderList(orderList);

        reset
        
        //console.log(hamburger)

        
    }



    const menu = food.map(category => {
        return(
            <>
            
            <div>
                <h2>{category.id}</h2>
                {category.type.map(type => {
                    return(
                        
                            <FlexContainer border="1px solid red" flexHeight="10em" align="center" width="20em"  key={type}>
                         
                            <div>
                                <CheckBox 
                                    labelText={type}
                                    name={`type[${type}]`}
                                    ref={register}
                                />

                            </div>

                            <div>
                                <InputBlock
                                    inputName={`typeCount[${type}]`}
                                    />


                                <label htmlFor="typeCount">Antall</label>
                                <input type="number" name={`typeCount[${type}]`} ref={register}/>
                            </div>

                            <div>
                                <label htmlFor="typeSize">Velg størrelse</label>
                                <select name={`typeSize[${type}]`} ref={register}>
                                    <option value="0">-</option>
                                    <option value="400g">400g</option>
                                    <option value="600g">600g</option>
                                    <option value="800g">800g</option>
                                </select>
                            </div>
                        
                           

                        </FlexContainer>
                       
                        
                    )
                })}
            </div>
            </>
        )
    })
    //Send order to database
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
                setOrderList(null);
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


    function addInputField(event) {
        console.log(event.target.value);

        let array = [];
     
        for (let i = 0; i < event.target.value; i++) {
            array.push(i);
        }

        const inputList = array.map((item, index) => {
            return (
               
                    <select id={"hamburgerSize" + index+1} name="hamburger[hamburgerSize][]" ref={register}>
                            <option value="200g">200g</option>
                            <option value="400g">400g</option>
                            <option value="800g">800g</option>
                    </select>  
            )
        })

        setBurgerInput(inputList);
        //setSidesInput(inputList);
        //setDrinksInput(inputList);
       
    }

    /*
    const burgerInputs = useRef()

    <div ref={burgerInputs}>
    <select id="hamburgerSelect" name="hamburger[hamburgerSelect][]" ref={register}>
        <option value="200g">200g</option>
        <option value="400g">400g</option>
        <option value="800g">800g</option>
    </select>
</div>*/






    function renderPage() {
        return(
            <article>
                <h1>Velkommen {userName}</h1>
                <p>{userId}</p>

                <h2>Velg produkter</h2>
                <form
                onSubmit={handleSubmit(onSubmit)}>

                    {menu}

             {/*hamburger[hamburger][]

            <ul>
                <li>
                    <input onChange={event => addInputField(event)} id="hamburger" type="checkbox" name="hamburger" ref={register} />
                    <label htmlFor="hamburger">Hamburger</label>
                    
                    <select id="hamburgerSelect" name="hamburger[hamburgerSelect][]" ref={register}>
                        <option value="0">-</option>
                        <option value="200g">200g</option>
                        <option value="400g">400g</option>
                        <option value="800g">800g</option>
                    </select>

{/*
                    <label htmlFor="hamburgerCount">Velg antall: </label>
                    <input id="hamburgerCount" type="number" placeholder="velg antall" name="hamburger[hamburgerCount][]" ref={register} onChange={event => addInputField(event)}/>

               
                    
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
            

        */}
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

/*
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
    
      */


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
                
                        {item[0] + ", " + item[1] + " " + item[2] + " stk"}
                        
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
        const food = await readCollection("food");
        return { userData, orderData, food }
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


/*
        switch (event.target.id) {
            case hamburger:

                inputList = array.map((item, index) => {
                    return (
                        <select id={"hamburgerSize" + index+1} name="hamburger[hamburgerSize][]" ref={register}>
                                    <option value="200g">200g</option>
                                    <option value="400g">400g</option>
                                    <option value="800g">800g</option>
                                </select>
                    )
                })
                break;
            case hamburger:

                inputList = array.map((item, index) => {
                    return (
                        <select id={"hamburgerSize" + index+1} name="hamburger[hamburgerSize][]" ref={register}>
                                    <option value="200g">200g</option>
                                    <option value="400g">400g</option>
                                    <option value="800g">800g</option>
                                </select>
                    )
                })
                break;
            case hamburger:

                inputList = array.map((item, index) => {
                    return (
                        <select id={"hamburgerSize" + index+1} name="hamburger[hamburgerSize][]" ref={register}>
                                    <option value="200g">200g</option>
                                    <option value="400g">400g</option>
                                    <option value="800g">800g</option>
                                </select>
                    )
                })
                break;

hamburger[hamburgerSize][]
        }*/


                        

/* <input name="size" type="radio" value="liten" ref={register({ required: true })}/>
                        <label htmlFor="liten">Liten</label>
                        <input name="size" type="radio" value="medium" ref={register({ required: true })}/>
                        <label htmlFor="medium">Medium</label>
                        <input name="size" type="radio" value="stor" ref={register({ required: true })}/>
*/