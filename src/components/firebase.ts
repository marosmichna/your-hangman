
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDUb9s5pYb1BlzYAWpy8Wi4P_grFJ4RkYU",
  authDomain: "movies-project-beacf.firebaseapp.com",
  projectId: "movies-project-beacf",
  storageBucket: "movies-project-beacf.appspot.com",
  messagingSenderId: "543740535251",
  appId: "1:543740535251:web:5eb7f21f9a00a56afd8f26"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);