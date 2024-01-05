import React, {useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const IsUserLoggedIn = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUserLoggedIn(true);
            //mostrar id de usuario
            // console.log(user.uid);
         } else {
            setUserLoggedIn(false);
         }
      });
   }, []);
    return userLoggedIn;
}