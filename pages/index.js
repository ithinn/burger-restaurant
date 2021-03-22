//------------------------------------------------------------------------------React/Next/Context/Firebase
import { useEffect, useState, useRef } from "react"
import Link from "next/link";
import { useRouter } from "next/router";
import { useBasket } from "../context/BasketContext";
import { useAuth } from "../config/auth";
import { useUser } from "../context/UserContext";
import readCollection from "../config/database/readCollection";
import firebaseInstance from "firebase";
//------------------------------------------------------------------------------Components
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Cart from "../components/Cart";
import Skeleton from "../components/Skeleton";
import { MenuItem } from "../components/MenuItem"
import { BlueH1, BlackH2, HandH2 } from "../components/StyledComponents/Headings";
import { Flex } from "reflexbox";
import { Button } from "../components/StyledComponents/Button";
import { Overlay } from "../components/StyledComponents/Overlay";


function Home({userData, food}) {
//-------------------------------------------------------------------------------Definitions
    const [orderNumber, setOrderNumber] = useState(null);
    const basket = useBasket();
    const userContext = useUser();
    const router = useRouter();

    //Find todays date
    const today = new Date();
    const date = today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
    
    //Get userId and userName
    const {user, loading, isAuthenticated} = useAuth();
    const userId = user ? user.uid : false;
    let userName;

    useEffect(() => {
        userData.forEach(user => {
            if (user.id === userId) {
                userName = user.firstName
                userContext.getUserName(userName);
            }
        })
    }, [])

    //Set orderNumber based on the counter in the database
    useEffect(() => {
        let ref = firebaseInstance
        .firestore()
        .collection("globals").doc("counter")

        return ref.onSnapshot((snapshot) => {
           
            snapshot.data().count
            setOrderNumber(snapshot.data().count);
        })

    }, []);
       

//---------------------------------------------------------------------------------Functions 

    //Update the counter in the database
    const handleCount = async () => {

        const counterRef = firebaseInstance
        .firestore()
        .collection("globals")
        .doc("counter");

        await firebaseInstance.firestore().runTransaction((transaction) => {
            return transaction.get(counterRef).then((doc) => {
                const count = doc.data().count;
                let newCount = count +1;
                if (newCount > 100) {
                    newCount = 1
                }

                transaction.update(counterRef, {count: newCount});
            })
        })
    }


    //Add to an order
    const onAdd = async (data) => {

        let price;
        let addOns = basket.listAddOns(data.addOns)
        let addOnsPrice = 15 * addOns.length;
        let sizeIndex = data.size.charAt(0);

        //Use the sizeIndex to access the right price in the food-item's pricearray.
        food.forEach(item => {
    
            item.details.forEach(el => {
                if (el.name === data.name) {
                    price = el.prices[sizeIndex] 
                }
            })
        })

        //Calculate total basePrice and add the orderItem to the order
        price = (Number(price) + addOnsPrice) * data.count;

        let newData = data;
        newData = {...newData, price: price, basePrice: price}
        
        basket.addProductLine(newData)
    }

    //Map out the menu
    const menu = food.map((category, index) => {
 
    return(
        <div key={"key" + index} id="menu">
            <BlackH2>{category.id}</BlackH2>
        
            <Flex 
            width="90%" 
            justifyContent="center" 
            flexWrap="wrap"
            mb={3}>
                
                {category.details.map((item, index) => {
                        
                    return <MenuItem 
                        isLoggedIn={isAuthenticated} 
                        handleAdd={onAdd} 
                        index={index} 
                        itemData={item} 
                        key={item.name}
                        foodData={food} />
                })} 
                
            </Flex> 
        </div>
    )
    });


    //Send the order to the database
    async function sendOrder() {
        
        if (isAuthenticated) {

            try {

                const collection = firebaseInstance.firestore().collection("orders");
                await collection.doc().set({
                    userId: userId,
                    isOrdered: true,
                    isPrepared: false,
                    isPickedUp: false,
                    orderList: basket.productLines,
                    orderDate: date,
                    orderNumber: orderNumber,
                })
                
                basket.emptyProductLine([]);
                router.push("/userStatus");
                basket.checkCart(false);
                handleCount();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    //Remove item from cart
    function handleRemove(event) {
        let index = event.target.id.replace(/[^0-9.]/g, "");
        basket.removeItem(index);
    }

    //Change amount of products in the cart
    function handleChange(event) {
        let index = event.target.id.replace(/[^0-9.]/g, "");
        let value = Number(event.target.value);
        basket.updateProductLines(index, value);   
    }    


//------------------------------------------------------------------------------------------Render
    
    
    if (loading) {
        return <Skeleton/>
    }

    return(
        <Layout home>

            <Banner bgImg={'url("/images/dinerFurniture.jpg")'}>
                <HandH2>Beste burgeren på Østlandet</HandH2>

                <Flex>
                    <Link passHref href={isAuthenticated ? "#menu" : "/login"}>
                        <a>
                            <Button p={3} fontSize="md">
                                {isAuthenticated ? "Bestill nå" : "Logg inn"}
                            </Button>
                        </a>
                    </Link>

                    {!isAuthenticated && (
                    <Link passHref href="/addUser">
                        <a>
                            <Button p={3} fontSize="md">Registrer ny bruker</Button>
                        </a>
                    </Link>
                    )}

                </Flex>
            </Banner>
        
            <BlueH1>Meny</BlueH1>
            
            {menu}  

            {basket.isCartChecked && (
            <>
            <Cart 
                sendOrder={event => sendOrder(event)} 
                handleRemove={event => handleRemove(event)} 
                handleChange={event => handleChange(event)}/>
            
            <Overlay position="fixed" height="100vh"/>
            </>
            )}
        
        </Layout>
    )
}


export default Home;


Home.getInitialProps = async () => {
    try {
        const userData = await readCollection("users")
        const orderData = await readCollection("orders");
        const food = await readCollection("newfood");
        return { userData, orderData, food }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}




