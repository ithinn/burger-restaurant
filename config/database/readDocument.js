import firebaseInstance from "firebase"

async function readDocument(collection, id) {
    const col = await firebaseInstance.firestore().collection(collection);
    const document = await col.doc(id).get();
    

    return document;
}

export default readDocument;