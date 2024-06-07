// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0C1ahJe0k24EzwLP_vrArEDfkqKidmac",
  authDomain: "tictactoe-e67c8.firebaseapp.com",
  projectId: "tictactoe-e67c8",
  storageBucket: "tictactoe-e67c8.appspot.com",
  messagingSenderId: "283771160122",
  appId: "1:283771160122:web:cb6afc1ccc89a8ef6e9703",
  measurementId: "G-YQ52VT6EVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);


// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

export default db