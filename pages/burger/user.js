import Layout from "../../components/Layout";
import readCollection from "../database/readCollection";
import Select from "../../components/Select";
import FlexContainer from "../../components/FlexContainer";
import Button from "../../components/Button";
import {useEffect, useState} from "react"
import RadioInput from "../../components/RadioInput";
import firebaseInstance from "firebase";


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
    const [orderNumber, setOrderNumber] = useState();
    const [order, setOrder] = useState(null)
    const [orderList, setOrderList] = useState(orders.length)
    const [userHasOrdered, setUserHasOrdered] = useState(false);
    
    //Get userId from Auth
    useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
            if (user) {
                //User is signed in
                let uid = user.uid
              
                setUserId(uid);
                setIsLoggedIn(true);
            } else {
                console.log(user + "is signed out")
            }
        })

        setOrderNumber(orderList + 1);
    }, [order, resetState]);
    console.log(userId);
    
    function resetState() {
        setBread(null);
        setDrink(null);
        setBurgerSize(null);
        setSides(null);
        setSidesSize(null);
        setDrinkSize(null);
        setBurger(null);
    }
    
    function handleAdd() {
        console.log("added to order");
        
        let fullOrder = {
            userId: userId,
            orderNumber: orderNumber,
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
            setOrder({...order, orderList: [...order.orderList, newOrder]});
        }

        resetState();
    }

    console.log(order);
    //setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));

    function handleSubmit(event) {
        event.preventDefault();
        
        const collection = firebaseInstance.firestore().collection("orders");
        
        collection.doc().set({
            
            order: order

        })
        .then(() => {
            console.log("lagt til")
            
            resetState();
            setOrder(null);
            setOrderList(orderList + 1);
            setUserHasOrdered(true);
    
        })
        .catch(error => {
            console.error(error)
        })

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
        setUserHasOrdered(false);  
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
            <h2>Logg inn for å bestille mat</h2>
            
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
            </>
        )
    }

    return(
        <>
        <Layout user>
    
        {isLoggedIn ? renderPlaceYourOrder() : renderLoginFirst() }   

            <Button
                id="signOutBtn"
                onClick={() => handleSignOutClick()}
                btnColor="purple"
                txtColor="white"
            >Logg ut</Button>
    
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