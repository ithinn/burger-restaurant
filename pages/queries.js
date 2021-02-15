import firebaseInstance from "../config/firebase";
import {useState} from "react";

//const list = []





function Queries() {

    const [list, setList] = useState([]);



    function getData() {
        try {
            const gamesCollection = firebaseInstance.firestore().collection("games")
            
            gamesCollection.where("year", "==", "1995").get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                    
                    setList(
                    ...[{
                        id: doc.id,
                        ...doc.data()
                        }] 
                    )
                });
    
            })
            .catch(error => {
                console.log(error);
            })
    
            
          
    
        } catch (error) {
            return {
                error: error.message
            }
        }
        
    }

    getData();
   console.log(list);

    return(
        <>
        <h1>Queries</h1>
        
        </>
    )
}

export default Queries

/*
function Queries( {list, data1} ) {

    const [data, useData] = useState(null);

    function renderList() {
    try {
        const gamesCollection = firebaseInstance.firestore().collection("games");
        const gamesData = gamesCollection.get();
    
        list = [];
        
        const data1 = gamesCollection.where("year", "==", "1995")
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
        
            setData(list);

        return(
        <ul>
            {list.forEach(game => {
                 return <li>game</li>
            })}
            </ul>
        ) ;
    
        }catch (error) {
            return {
                error: error.message
            };
        }
    }    
    
    
    return(
        <>
        <h1>Query</h1>
        {renderList()}
        </>
    )
}

export default Queries;
*/
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







        


