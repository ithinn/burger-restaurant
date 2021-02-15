import firebaseInstance from "../../config/firebase";

import { useEffect, useState } from "react";
import InputBlock from "../../components/InputBlock";

function AddGame() {
/*
    useEffect(() => {
        

    }, [])*/

    const [title, setTitle] = useState(null)
    const [rating, setRating] = useState(null)
    const [year, setYear] = useState(null)


    function handleSubmit(event) {
        event.preventDefault();
        
        console.log(title, rating, year);

        const collection = firebaseInstance.firestore().collection("games");
        collection.doc().set({
            rating: rating,
            title: title,
            year: year
        })
        .then(() => {
            console.log("lagt til")
            //State - endre grensesnittet - melding. Eller send dem til en annen side. 
        })
        .catch(error => {
            console.error(error)
        })
   
    }

    function handleTitleChange(event) {
        console.log(event.target.value);
        setTitle(event.target.value)
    }
    function handleRatingChange(event) {
        console.log(event.target.value);
        setRating(event.target.value)
    }
    function handleYearChange(event) {
        console.log(event.target.value);
        setYear(event.target.value)
    }

    return(
        <main>
            <h1>Legg til spill</h1>
            <form
                name="add-game"
                id="add-game"
                action="/"
                method="GET"
                onSubmit={event => handleSubmit(event)}
            >

                <InputBlock
                    inputName="title"
                    inputId="title"
                    inputType="text"
                    inputPlaceholder="Spillets tittel"
                    labelText="Tittel"
                    inputChangeHandler={event => handleTitleChange(event)}
                />
                <InputBlock
                    inputName="rating"
                    inputId="rating"
                    inputType="number"
                    labelText="Karakter"
                    inputChangeHandler={event => handleRatingChange(event)}
                />
                <InputBlock
                    inputName="year"
                    inputId="year"
                    inputType="number"
                    labelText="Utgivelsesår"
                    inputChangeHandler={event => handleYearChange(event)}
                />

                <button type="submit">Send inn</button>

            </form>
        </main>


    )
}

export default AddGame;