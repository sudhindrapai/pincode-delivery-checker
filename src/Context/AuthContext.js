import React, { useContext, useEffect, useState } from "react";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import {auth} from '../firebasebase'

const AuthContext = React.createContext();

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider ({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [signinStatus, setSigninStatus] = useState(false);
    const [isRequestSent, setRequestSentStatus] = useState(false)

    function login (email, password) {
        setRequestSentStatus(true);
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setSigninStatus(true)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setSigninStatus(false)
  });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
            }
          });

        return unSubscribe;
    },[]);

    const value = {
        currentUser,
        signinStatus,
        isRequestSent,
        login
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}