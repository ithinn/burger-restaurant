import { createContext, useContext, useEffect, useState } from "react";

import firebaseInstance from "../config/firebase";
import nookies from "nookies";


const AuthContext = createContext({ user: null });


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = user !== null  && !loading;


  useEffect(() => {
    return firebaseInstance.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", null, { path: "/" });
      } else {
        const token = await user.getIdToken();
        //console.log("token", token);
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }

      setLoading(false);
    });
  });

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseInstance.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return clearInterval(handle);
  });

  // Logic

  return <AuthContext.Provider value={{user, isAuthenticated, loading}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};


/*
import {createContext, useEffect, useState, useContext} from "react";
import firebaseInstanceInstance from "./firebaseInstance";
import nookies from "nookies";


const AuthContext = createContext({user: null});

export function AuthProvider({children}) {
    const [user, setUser] = useState();

    useEffect(() => {
        return firebaseInstance.auth().onIdTokenChanged(
            async (user) => {
                if (!user) {
                    setUser(null)
                    //setter cookie
                    nookies.set(undefined, "token", null, { path: "/"})
                } else {
                    const token = user.getIdToken()
                    setUser(user)
                    nookies.set(undefined, "token", token, { path: "/"})
                }
            }
        )
    })

    //Vi vil ha en måte å sørge for at token er så ferks som mulig - refreshes ikke av seg selv.
    useEffect(() => {
        const handle = setInterval( async () => {
            const user = firebaseInstance.auth().currentUser;

            if (user) {
                await user.getIdToken(true)
            }

        }, 10 * 60 * 1000);

        return clearInterval(handle)
    })

    

    return (
        <div>
            <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
        </div>
    )



}

export const useAuth = () => {
    return useContext(AuthContext);
}*/