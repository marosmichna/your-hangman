
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBr6hQaSEPJ5W-d5bCMjfClKzprd5spLWE",
  authDomain: "hangman-70c89.firebaseapp.com",
  projectId: "hangman-70c89",
  storageBucket: "hangman-70c89.appspot.com",
  messagingSenderId: "617645660010",
  appId: "1:617645660010:web:b24aec26dec57ccb9c3713"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);