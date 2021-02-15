import firebaseInstance from "../config/firebase";
import {useEffect, useState} from "react";

//const list = []





function Queries() {

    const [list, setList] = useState(null);


    useEffect(() => {
        try {
            const gamesCollection = firebaseInstance.firestore().collection("games")
            
            let tempList = [];

            gamesCollection.where("year", "==", "1995").get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                    
                    tempList.push({
                        id: doc.id,
                        ...doc.data()
                    })  
                    
                });

                setList(tempList);
    
            })
            .catch(error => {
                console.log(error);
            })
    
            
          
    
        } catch (error) {
            return {
                error: error.message
            }
        }


    }, [])
    
    
    function getData() {
        
        
    }

    function showItems() {
       

        console.log(list);
    }
   
   //console.log(list);

    function renderList() {
        return(
            <ul>
                {list.forEach(item => {
                    <li>{item.title}</li>
                })} 

            </ul>
        )
    }

    //<p>{list[0].title}</p>
    //<p>{list[1].title}</p>
    //{list.forEach(item => {
   //     return <li>{item.title}</li>
    //})}

    return(
        <>
        <h1>Queries</h1>
        <button onClick={showItems}>Vis</button>
        <p>{list[0].title}</p>
        <p>{list[1].title}</p>
        <ul>
            
        </ul>
        {list !== null ? renderList() : <h2>null</h2>}
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







        


