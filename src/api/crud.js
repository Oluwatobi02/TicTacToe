import { addDoc, collection, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";

export async function createStatus(room) {
    
    try {
        const docRef = doc(db, 'game', room)
        await setDoc(docRef, {
                'room': room,
                'board': Array(9).fill(null),
                'status': 'ongoing',
                'disableClick': false,
                'screenText': 'start',
                'currentPlayer': 'X'
            })

            const data = getGame(room)
            return data
          } catch (e) {
            console.error("Error adding document: ", e);
            return null
          }
}


export async function getGame(room) {
    const gameRef = doc(db, 'game', room);
    const gameSnapshot = await getDoc(gameRef);
    // console.log(gameSnapshot.data())
    return gameSnapshot.data()
    
  }


  export async function updateGameStatus(room, newStatus) {
    const gameRef = doc(db, "game", room);
    
    try {
      await updateDoc(gameRef, newStatus);
      console.log("Document updated with ID: ", room);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
  

