import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, [])

    const userSignout= () => {
        signOut(auth).then(() =>{
            alert('Signed Out Successfully')
        }).catch(error => console.log(error))
    }
    return(
        <div>
            {authUser ? <><p>{`Signed In as ${authUser.email}`} </p><button onClick={userSignout}>Signout</button></>
            : <p>Signed out</p> }
        </div>
    )
}

export default AuthDetails;