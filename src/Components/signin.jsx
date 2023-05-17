import React, { useContext } from "react";
import { useState } from "react";
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import "../Styles/signin.css";


const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential); //'Logged in succesfully'
        }).catch((error) => {
            alert('Incorrect Username or Password');
        });
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Login</h1>
                <input className="inputemail" type="email" placeholder="email..." value={email}
                onChange={(e) => setEmail(e.target.value)}></input>

                <input className="inputpassword" type="password" placeholder="password..." value={password}
                onChange={(e) => setPassword(e.target.value)}></input>

                <button className="btnsignin" type="submit">Login</button>
            </form>
        </div>
    )
};

export default SignIn;