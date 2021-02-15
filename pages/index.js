import firebaseInstance from "../config/firebase";

export default function Home( { game, error }) {
  
  if (error !== undefined) {
    return (
      <p>En fil har oppstått: {error}</p>
    )
  }

  return (
    <pre>
      <code>
        {JSON.stringify(game, null, 2)}
      </code>
    </pre>

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

    return { game };

  } catch(error) {
    return {
      error: error.message
    }
  }
};

