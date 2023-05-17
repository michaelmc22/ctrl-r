import React from "react";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../Styles/card.css";




function Card({title, imageurl, body}) {

    const [games, setGames] = useState([]);
    const gameCollectRef = collection(db, "games");
  
    useEffect(() => {

        const GetGames = async (id) => {
            const data = await getDocs(gameCollectRef);
            setGames(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
        };

        GetGames();
    }, [])


   
    return (
        <div className="card-container">
            <div className="img-container">
                <img src ={imageurl} alt='' />
            </div>

            <div className="card-content">
            <div className="card-title">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
             <p>{body}</p>

            </div> 
            </div>

        </div>
    )
}

export default Card;