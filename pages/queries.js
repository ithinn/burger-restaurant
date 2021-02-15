import firebaseInstance from "../config/firebase";
import {useEffect, useState} from "react";


function Queries() {

    const [list, setList] = useState(null);
    const [before, setBefore] = useState(null);
    const [highRate, setHighRate] = useState(null);

    useEffect(() => {
        try {
            const gamesCollection = firebaseInstance.firestore().collection("games")
            
            let tempList = [];
            let beforeList = []

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


            gamesCollection.where("year", ">", "1995").get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                    
                    beforeList.push({
                        id: doc.id,
                        ...doc.data()
                    })  
                    
                });
            
                let filtered = beforeList.filter(item => {
                    return (item.rating >= 7)
                })

               
                setBefore(beforeList);
                setHighRate(filtered);
    
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
    

    function showItems() {
        console.log(list);
        console.log(before);
        console.log(highRate);
    }
   
    
    const listItems = list.map(item => {
        return (<li>{item.title + ": " + item.rating}</li>)
    })

    const beforeItems = before.map(item => {
        return (<li>{item.title + ": " + item.rating}</li>)
    })

    const highRateItems = highRate.map(item => {
        return (<li>{item.title + ": " + item.rating}</li>)
    })

    function renderList() {
        return(
            <ul>
                {list.map(item => {
                    <li>{item.title}</li>
                })} 

            </ul>
        )
    }

    return(
        <>
        <h1>Queries</h1>
        <button onClick={showItems}>Vis</button>
        <h2>Kom ut i 1995</h2>
        
        <ul>
            {listItems}
        </ul>

        <h2>Kom ut etter 1995</h2>
        <ul>
            {beforeItems}
        </ul>

        <h2>Kom ut etter 95, over 7 rating</h2>
        <ul>
            {highRateItems}
        </ul>
        
        
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







        


