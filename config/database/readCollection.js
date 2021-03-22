import firebaseInstance from "../firebase";


async function readCollection(text) {

    try {
        const collection = await firebaseInstance.firestore().collection(text)
        const readCollection = await collection.get()
    
    
        let returnArray = [];
    
        readCollection.forEach(item => {
          returnArray.push({
            id: item.id,
            ...item.data()
          })
        })
      
        return(returnArray);
    } 
    catch(error) {
        console.log(error);
    }
    
    

}

export default readCollection;



/*


/*
    try {
        const collection = await firebaseInstance.firestore().collection("games");
        const collectionData = await collection.get();

        const list = []

        console.log("Readcollection er i drift")

        collectionData.forEach( game => {
            list.push({
                id: game.id,
                ...game.data()
            })
        })

    //console.log(list);
    //setData(list);

    return {list} ;
    
    } catch (error) {
        return {
            error: error.message
        }
    }*/
    

  

    /*
    try {

    }
    catch(error) {

    }


function ReadCollection({error, games}) {
        console.log(games);

        const [data, setData] = useState(null)

        useEffect(() => {

            setData(games)

        }, [])



        return(
            <>
             <main>
            <h1>Mine favorittspill</h1>
            <ul>
                {data!== null ? data.map(item => {
                    return(
                        <li key={item.id}>
                            {JSON.stringify(item)}
                        </li>
                    )
                }): null}
            </ul>

            <article>

            </article>
        </main>
            
            </>    
        )
}

ReadCollection.getInitialProps = async () => {

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
        
        return { games };
        
    }catch (error) {
        return {
            error: error.message
        };
    }

}

export default ReadCollection;

  */