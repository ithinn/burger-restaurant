
import Layout from "../../components/Layout";
import Login from "../../components/Login";
import Register from "../../components/Register";
import readCollection from "../database/readCollection";
import Select from "../../components/Select";
import FlexContainer from "../../components/FlexContainer";
import Button from "../../components/Button";
import {useEffect, useState} from "react"
import RadioInput from "../../components/RadioInput";
import firebaseInstance from "firebase";

function User( {food, orders} ) {
    
    const [burger, setBurger] = useState(null);
    const [burgerSize, setBurgerSize] = useState(null);
    const [drink, setDrink] = useState(null);
    const [drinkSize, setDrinkSize] = useState(null);
    const [bread, setBread] = useState(null);
    const [sides, setSides] = useState(null);
    const [sidesSize, setSidesSize] = useState(null);
    const [userNumber, setUserNumber] = useState(201)
    const [orderNumber, setOrderNumber] = useState(null);
    const [order, setOrder] = useState([{
        userNumber: userNumber,
        orderNumber: orderNumber,
        state: 1,
        
    }])
    useEffect(() => {
        setOrderNumber(orders.length + 1 );
        
    }, [])

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
        console.log("handleAdd")

        let newOrder = {
            bread: bread,
            burgerType: burger,
            burgerSize: burgerSize,
            sideDish: sides,
            sideDishSize: sidesSize,
            drink: drink,
            drinkSize: drinkSize,
        }

        setOrder(searches => [...searches, newOrder])
        resetState();
 
        console.log(order);
    }

    console.log(order)

    function handleSubmit(event) {
        event.preventDefault();
  
        const collection = firebaseInstance.firestore().collection("orders");
        collection.doc().set({
            /*bread: bread,
            burgerType: burger,
            burgerSize: burgerSize,
            sideDish: sides,
            sideDishSize: sidesSize,
            drink: drink,
            drinkSize: drinkSize,
            orderNumber: orderNumber,
            userNumber: userNumber,
            state: 1*/
            order: order

        })
        .then(() => {
            console.log("lagt til")
            setOrder([{
                userNumber: userNumber,
                orderNumber: orderNumber,
                state: 1,
                
            }]);
            resetState();
            //State - endre grensesnittet - melding. Eller send dem til en annen side. 
        })
        .catch(error => {
            console.error(error)
        })

    }
    //console.log(food);

    let menu2 = food.map(category => {
        return(
            <>
            <h3>{category.id}</h3>
            <FlexContainer>
                {category.type.map((type, index) => {
                    return(<RadioInput handleChange={event => handleChange(event)} radioName={category.id} radioId={type} labelText={type}/>)
                })}

                {category.sizes !== undefined ?
                <Select handleChange={event => handleChange(event)} key={category.id + "size"} inputId={category.id + "size"} labelText="Velg størrelse">
 
                {category.sizes.map(el => {
                return(<option value={el}>{el}</option>)
                })}

                </Select> : null}

            </FlexContainer>
            </>
        )
    })



    function handleChange(event) {
        console.log(event.target);
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
/*
    */

    return(
        <>
        <Layout user>

            <h2>Du kan bestille:</h2>
            
            <form onSubmit={event => handleSubmit(event)}>
            {menu2}

            
            
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
           

       
       
            <Login/>

    
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