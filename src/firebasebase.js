// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyBL2O-3LF2WlrxaG5t_wtU05rpi--g-qZ8",
    authDomain: "pincode-checker.firebaseapp.com",
    databaseURL: "https://pincode-checker-default-rtdb.firebaseio.com",
    projectId: "pincode-checker",
    storageBucket: "pincode-checker.appspot.com",
    messagingSenderId: "481767297880",
    appId: "1:481767297880:web:250d6cbc57009a833c4b2d",
    measurementId: "G-N9NWTE8TMD"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export default app