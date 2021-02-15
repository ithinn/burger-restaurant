import firebaseInstance from "../config/firebase";

function GamesList( { error, games }) {
    return(

        <main>
            <h1>Mine favorittspill</h1>
            <ul>
                {games.map(item => {
                    return(
                        <li key={item.id}>
                            {JSON.stringify(item)}
                        </li>
                    )
                })}
            </ul>

            <article>

            </article>
        </main>
    )
}

GamesList.getInitialProps = async () => {

    try {
        //Hent samlingen først
        const gamesCollection = await firebaseInstance.firestore().collection('games');

        //Legg hele samlingen i gamesData
        const gamesData = await gamesCollection.get();

        let games = []
        
        //Jeg vil ha et array med objekter og id for alle dokumentene mine.
        gamesData.forEach(game => {
            games.push(
                {
                id: game.id,
                ...game.data()
                }
            );
        });
        
        const query = gamesData.where("year", "==", "1995")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
            })
        })
        .catch(error => {
            console.log("Error getting documents: ", error)
        }); 



        return { games };
        
    }catch (error) {
        return {
            error: error.message
        };
    }

}

export default GamesList;