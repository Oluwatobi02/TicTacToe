
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyD0C1ahJe0k24EzwLP_vrArEDfkqKidmac",
  authDomain: "tictactoe-e67c8.firebaseapp.com",
  projectId: "tictactoe-e67c8",
  storageBucket: "tictactoe-e67c8.appspot.com",
  messagingSenderId: "283771160122",
  appId: "1:283771160122:web:cb6afc1ccc89a8ef6e9703",
  measurementId: "G-YQ52VT6EVE"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);




export default db