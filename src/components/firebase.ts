
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8gv696iQI9QR5_im5KWR0ZR67DkscbV8",
  authDomain: "hangman-fe79f.firebaseapp.com",
  projectId: "hangman-fe79f",
  storageBucket: "hangman-fe79f.appspot.com",
  messagingSenderId: "895555008743",
  appId: "1:895555008743:web:3583a23495b531d6744a42"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);