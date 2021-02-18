import firebaseInstance from "../config/firebase";
import readCollection from "../pages/database/readCollection";
import readDocument from "../pages/database/readDocument";

export default function Home( { game, error, testArray, menuItems, document, meny }) {
  
  if (error !== undefined) {
    return (
      <p>En fil har oppstått: {error}</p>
    )
  }

  console.log(meny);
  
  let doc = document._delegate._document.objectValue.proto.mapValue.fields;

  //console.log(doc.typer.arrayValue.values);
  let arrayTypes = doc.typer.arrayValue.values;

  console.log(arrayTypes);

  



  function test() {
    meny.forEach(item => {
      if (item.rating < 6) {
        console.log("liten")
      } else {
        console.log("stor")
      }
    })

    let newArray = [];
    arrayTypes.forEach(type => {
      newArray.push(Object.values(type).join(""));
      console.log(Object.values(type).join(""))
    })

    console.log(newArray);

    
    
    

   /*
    if (doc.rating < 5) {
      console.log("liten");
    } else {
      console.log("stor")
    }*/
  }


  return (
    <>
      <h1>Index</h1>
      

      <p>hei</p>
      <button onClick={test}>testknapp</button>
    
    </>
  )
}

//Jeg vil at hele denne skal kjøres før vi rendrer. 
//Før vi rendrer komponenten skal du lagre propsene som sendes inn.
//Derfor async.
//Kan også brukes til å hente slug fra url-en, og datauthenting
//Alt som skal være klart fra serveren før render skal inn her. 

//Henter dataene


Home.getInitialProps = async () => {

  try {
    const meny = await readCollection("games")

    const document = await readDocument("games", "idatester")

    return {meny, document}

  } catch (error) {
    return {
      error: error.message
    }
  }
/*
  const menuItems = await readCollection("games");

  

    return { menuItems, testArray, document };*/
  };
  /*
  try {
    const collection = await firebaseInstance.firestore().collection('games');
    const document = await collection.doc('cedLq3EfUdUgW928ll6r').get()

    if (document.exists !== true) {
      throw new Error('Dokumentet finnes ikke.');

    }

    //Send data fra dokumentet inn i reactkomponenten
    const game = {
      id: document.id,
      ...document.data()//innebygd funksjon som returnerer alle data som ligger i dokumentet på det tidspunktet. Må brukes, veldig viktig

    };

    

  } catch(error) {
    return {
      error: error.message
    }
  }*/


