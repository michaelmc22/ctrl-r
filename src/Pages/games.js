import React from "react";
import Card from "../Components/card";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../Styles/game.css";


function Games() {

    const [games, setGames] = useState([]);
    const gameCollectRef = collection(db, "games");
  
    useEffect(() => {

        const GetGames = async (id) => {
            const data = await getDocs(gameCollectRef);
            setGames(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
        };

        GetGames();
    }, [])

    return( <div className="AddGames">
        
        {games.map((games)=> {
            return <div> 
                <Card
                title={games.title}
                imageurl={games.image}
                body={games.description}
                />             

                <Link to={`/gamepage/${games.id}`}>
                    <button className="btnlookgame">View Game</button>
                </Link>
                                               
                                                
             </div> 
        })}
    </div>
    )

}

export default Games;