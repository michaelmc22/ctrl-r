import React from "react";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import AddForum from "../Components/addForum";
import validate from "../Components/validate";
import "../Styles/gamepage.css";

function Gamepage() {
    const params = useParams();
    const [games, setGames] = useState([]);
    const gameCollectRef = doc(db, "games",params.id);



    

    useEffect(() =>  {
        const GetGames = async(id) => {
            const doc = await getDoc(gameCollectRef);
            let doc_data = doc.data()
            console.log(doc_data);

            setGames(doc_data);
        };

        GetGames();
    }, [])


    return (

        
        <div className="divgamepage">
            <div className="gamepagedetails">
            <h2 className="gamepagetitle">{games.title}</h2>
            <img className="gamepageimage" src={games.image} />
            <h2 className="gamepagedescription">{games.description}</h2>
            <h2 className="gamepageage">Age Rating: {games.age}</h2>
            <h2 className="gamepageconsole">Console Availability: {games.console}</h2>
            <h3 className="gamepagepubdev">Development Studio: {games.dev} Published By: {games.publisher}</h3>
            </div>

            <div>
            </div>

            <AddForum />

        </div>
        
)}

export default Gamepage;

