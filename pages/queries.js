import firebaseInstance from "../config/firebase";

function Queries( {list, data} ) {
    try {
        const gamesCollection = firebaseInstance.firestore().collection("games");
        const gamesData = gamesCollection.get();
    
        list = [];
    
        const datarfsddf = gamesCollection.where("year", "==", "1995")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    
                    //Idas forsøk
                    list.push({
                        id: doc.id,
                        ...doc.data()
                        } 
                    )
                });
            })
            .catch(error => {
                console.log("Error getting documents: ", error)
            }); 
        
        return { list };
    
        }catch (error) {
            return {
                error: error.message
            };
        }

    console.log(data);
    return(
        <>
        <h1>Query</h1>
      
        </>
    )
}

export default Queries;

//Queries.initialProps = async () => {
   /* try {
    const gamesCollection = await firebaseInstance.firestore().collection("games");
    const gamesData = await gamesCollection.get();

    list = [];

    const data = gamesCollection.where("year", "==", "1995")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                
                //Idas forsøk
                list.push({
                    id: doc.id,
                    ...doc.data()
                    } 
                )
            });
        })
        .catch(error => {
            console.log("Error getting documents: ", error)
        }); 
    
    return { data };

    }catch (error) {
        return {
            error: error.message
        };
    }
}*/







        


