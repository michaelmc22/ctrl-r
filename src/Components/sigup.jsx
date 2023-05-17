import React from "react";
import { useState } from "react";
import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h1>Sign Up For Your Account!</h1>
                <input className="inputemail" type="email" placeholder="email..." value={email}
                onChange={(e) => setEmail(e.target.value)}></input>

                <input className="inputemail" type="password" placeholder="password..." value={password}
                onChange={(e) => setPassword(e.target.value)}></input>

                <button className="btnsignup" type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUp;