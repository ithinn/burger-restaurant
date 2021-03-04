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





function User( {food, orders} ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [burger, setBurger] = useState(null);
    const [burgerSize, setBurgerSize] = useState(null);
    const [drink, setDrink] = useState(null);
    const [drinkSize, setDrinkSize] = useState(null);
    const [bread, setBread] = useState(null);
    const [sides, setSides] = useState(null);
    const [sidesSize, setSidesSize] = useState(null);
    const [userId, setUserId] = useState(null)
    const [order, setOrder] = useState(null)
    const [orderList, setOrderList] = useState(orders.length)
    const [onlyOrder, setOnlyOrder] = useState(null);

    


    //Get userId from Auth
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

        //setOrderNumber(orderList + 1);
    }, [order, resetState]);
    

    function resetState() {
        setBread(null);
        setDrink(null);
        setBurgerSize(null);
        setSides(null);
        setSidesSize(null);
        setDrinkSize(null);
        setBurger(null);
    }
    

    //Add to the order
    function handleAdd() {
        console.log("added to order");
        
        let fullOrder = {
            userId: userId,
            state: 1,
            orderList: [{
                bread: bread,
                burgerType: burger,
                burgerSize: burgerSize,
                sideDish: sides,
                sideDishSize: sidesSize,
                drink: drink,
                drinkSize: drinkSize,
            }]
        }

        let newOrder = {
            bread: bread,
            burgerType: burger,
            burgerSize: burgerSize,
            sideDish: sides,
            sideDishSize: sidesSize,
            drink: drink,
            drinkSize: drinkSize,
        }

        if (order === null) {
            setOrder(fullOrder);
        } else {
            setOrder({
                ...order, orderList: [...order.orderList, newOrder]
            });
        }

        setOnlyOrder(newOrder);

        resetState();
    }

    //Submit the order
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const ref = firebaseInstance.database().ref("liveOrders");
            const newOrder = ref.push()
            await newOrder.set({
                order: order,  
            })

            let orderRef = (await newOrder).key;

            const collection = firebaseInstance.firestore().collection("orders");
            await collection.doc(orderRef).set({
                order: order
            })

            
            const userInFirestore = firebaseInstance.firestore().collection("users").doc(userId);
            await userInFirestore.update({
                usersOrders: onlyOrder
            })

            

            resetState();
            setOrder(null);
            setOrderList(orderList + 1);
        }
        catch(error) {
            console.log(error);
        }

    }

    let menu = food.map(category => {
      
        return(
            <>
            <h3>{category.id}</h3>
            <FlexContainer>
                {category.type.map((type, index) => {
                    return(<RadioInput handleChange={event => handleChange(event)} radioName={category.id} radioId={type} labelText={type}/>)
                })}

                {category.sizes !== undefined ?
                <Select requiredCondition={category.type} handleChange={event => handleChange(event)} key={category.id + "size"} inputId={category.id + "size"} labelText="Velg størrelse">
 
                {category.sizes.map((el, index) => {
                return(
                
                index === 1 ? <option selected value={el}>{el}</option> : <option value={el}>{el}</option> )
                })}

                </Select> : null}

            </FlexContainer>
            </>
        )
    })


    function handleSignOutClick() {
        firebaseInstance.auth().signOut().then(() => {
           
            console.log("is signed out")
          }).catch((error) => {
            console.log(error);
          });
          setIsLoggedIn(false);
       // setUserHasOrdered(false);  
    }



    function handleChange(event) {
        switch( event.target.name) {
            case "burgers":
                setBurger(event.target.id);
                break;
            case "drinks":
                setDrink(event.target.id);
                break;
            case "sides":
                setSides(event.target.id);
                break;
            case "bread":
                setBread(event.target.id);
                break;
        }

        switch(event.target.id) {
            case "burgerssize":
                setBurgerSize(event.target.value);
                break;
            case "drinkssize":
                setDrinkSize(event.target.value);
                break;
            case "sidessize":
                setSidesSize(event.target.value);
                break;
        }
    }

    function renderLoginFirst() {
        return(
            <>
            <h2>
                <Link href="/login"><a className={utilStyles.link}>Logg inn</a></Link> for å bestille mat</h2>
            
            <form>
            {menu}
            </form>
            
            </>
        )
    }
    function renderPlaceYourOrder() {
        return(
            <>
                <h2>{"Velkommen " + userId}</h2>
            
            <form onSubmit={event => handleSubmit(event)}>
            {menu}

            <Button
                type="submit"
                btnColor="green"
                txtColor="white"> Send bestilling </Button>
            </form>

            <Button
                onClick={() => handleAdd()}
                btnColor="blue"
                txtColor="white">
                    Legg til i bestilling
            </Button>
            <Button
                id="signOutBtn"
                onClick={() => handleSignOutClick()}
                btnColor="purple"
                txtColor="white"
            >Logg ut</Button>
            </>
        )
    }

    return(
        <>
        <Layout user isLoggedIn={isLoggedIn}>
    
        {isLoggedIn ? renderPlaceYourOrder() : renderLoginFirst() }   

            
    
        </Layout>
        </>
    )
}

export default User;



User.getInitialProps = async () => {
    try {
        const food = await readCollection("food")
        const orders = await readCollection("orders")
        return { food, orders }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}