
import Layout from "../../components/Layout";
import Login from "../../components/Login";
import Register from "../../components/Register";
import readCollection from "../database/readCollection";
import Select from "../../components/Select";
import FlexContainer from "../../components/FlexContainer";
import Button from "../../components/Button";
import {useState} from "react"

function User( {food} ) {
    const [burger, setBurger] = useState(null);
    const [drink, setDrink] = useState(null);




    function handleSubmit(event) {
        event.preventDefault();

        console.log(burger, drink)

    }

    let menu = food.map(item => {
        return (
            <>
        <FlexContainer flexWidth="20em" justify="space-around">
        <Select handleChange={event => handleChange(event)} key={item.id} inputId={item.id} labelText={item.id}>
            


            {item.type.map(el => {
                return(<option value={el}>{el}</option>)
            })}
             
         </Select>
  
         <Select key={item.id + "size"} inputId={item.id + "size"} labelText="Velg størrelse">
 
         {item.sizes.map(el => {
         return(<option value={el}>{el}</option>)
         })}
 
         </Select>
        </FlexContainer>
       
       
      
        </>
        )

       
    })

    function handleChange(event) {
        console.log(event.target.value);
        switch( event.target.id) {
            case "burgers":
                setBurger(event.target.value);
                break;
            case "drinks":
                setDrink(event.target.value);
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
            {menu}
            <Button
                type="submit"
                btnColor="green"
                txtColor="white"> Send bestilling </Button>
            </form>
           

       
       
            <Login/>

    
        </Layout>
        </>
    )
}

export default User;


User.getInitialProps = async () => {
    try {
        const food = await readCollection("food")
        return { food }
    }
    catch (error) {
        return {
            error: error.message
        }
    } 
}