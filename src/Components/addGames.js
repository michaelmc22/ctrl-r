import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import validate from "./validate";
import { getAuth } from "firebase/auth";


function AddGames() {
    const [games, setGames] = useState([]);
    const gameCollectRef = collection(db, "games");
    const [newTitle, setNewTitle] = useState("");
    const [newDev, setNewDev] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newAchievements, setNewAchievements] = useState("");
    const [newConsole, setNewConsole] = useState("");
    const [newPub, setNewPub] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState("");

    const auth = getAuth();

    const CreateGame = async (id) => {
        await addDoc(gameCollectRef, {title: newTitle, dev: newDev, age: newAge, achievements: newAchievements, console: newConsole, publisher: newPub, description: newDescription, image: newImage});
    };
    
    const UpdateGame = async (id) => {

        const gameDoc = doc(db, "games", id)
        const newFields = {title: newTitle, dev: newDev, age: newAge, achievements: newAchievements, console: newConsole, publisher: newPub, description: newDescription, image: newImage}
        await updateDoc(gameDoc, newFields)
    }

    const DeleteGame = async (id) => {
        const gameDoc = doc(db, "games", id)
        await deleteDoc(gameDoc)
    };


    useEffect(() => {

        const GetGames = async (id) => {
            const data = await getDocs(gameCollectRef);
            setGames(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
        };
        GetGames();


    }, [])
    console.log(games)

    return <div className="AddGames">
        <h1>Create New Game</h1>
        <input placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input placeholder = "Description..." onChange={(event) => {setNewDescription(event.target.value)}}/>
        <input placeholder = "Console..." onChange={(event) => {setNewConsole(event.target.value)}}/>
        <input placeholder = "Age Rating..." onChange={(event) => {setNewAge(event.target.value)}}/>
        <input placeholder = "Developer..." onChange={(event) => {setNewDev(event.target.value)}}/>
        <input placeholder = "Publisher..." onChange={(event) => {setNewPub(event.target.value)}}/>
        <input placeholder = "Achievements..." onChange={(event) => {setNewAchievements(event.target.value)}}/>
        <input placeholder = "Image Link..." onChange={(event) => {setNewImage(event.target.value)}}/>


        <button onClick={CreateGame}> Create User</button>        

        <h1>Edit Game</h1>
        <input placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input placeholder = "Description..." onChange={(event) => {setNewDescription(event.target.value)}}/>
        <input placeholder = "Console..." onChange={(event) => {setNewConsole(event.target.value)}}/>
        <input placeholder = "Age Rating..." onChange={(event) => {setNewAge(event.target.value)}}/>
        <input placeholder = "Developer..." onChange={(event) => {setNewDev(event.target.value)}}/>
        <input placeholder = "Publisher..." onChange={(event) => {setNewPub(event.target.value)}}/>
        <input placeholder = "Achievements..." onChange={(event) => {setNewAchievements(event.target.value)}}/>
        <input placeholder = "Image Link..." onChange={(event) => {setNewImage(event.target.value)}}/>




        {games.map((games)=> {
            return <div> 
                <h1>{validate()} </h1>
                <h1>title: {games.title} </h1>
                <h1>developer: {games.description} </h1>
                <h1>Age Rating: {games.console} </h1>
                <h1>achievements: {games.age} </h1>
                <h1>console: {games.dev} </h1>
                <h1>pub: {games.publisher} </h1>
                <h1>description: {games.achievements}</h1>
                <h1>Image link: {games.image}</h1>
                <h1>id: {games.id} </h1>                

                <button onClick={() => {UpdateGame(games.id, games.title)}}>Edit</button>
                <button onClick={() => {DeleteGame(games.id)}}>Delete</button>
                

                </div>
        })}
    </div>
}

export default AddGames;