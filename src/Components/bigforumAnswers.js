import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import AuthDetails from "./authdetails";
import { getAuth } from "firebase/auth";
import "../Styles/bigforumanswers.css";


function BigForumAns() {
    const [forum, setForum] = useState([]);
    const forumCollectRef = collection(db, "forumans");
    const [newTitle, setNewTitle] = useState("");
    const [newQuestions, setNewQuestions] = useState("");
    const [newGameid, setNewGameid] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newComment, setNewComment] = useState([]);
    const params = useParams();
    const auth = getAuth();

    console.log(auth)

    var date1 = new Date().getDate(); //To get the Current Date
    var date2 = new Date().getMonth() + 1; //To get the Current Date
    var date3 = new Date().getFullYear(); //To get the Current Date

    var date = (date1 + "/" + date2 + "/" + date3)

    const CreateForum = async (id) => {

        if(auth.currentUser !=null){
            alert("Created Successfully")
        
        await addDoc(forumCollectRef, {
            answer: newQuestions, 
            date: date, 
            forumid: params.forumid, 
            username: auth.currentUser.email});
        }
        else{
            alert("Must Be Logged In to create comment")
        }
    };
    
    const UpdateForum = async (id) => {

        if(auth.currentUser !=null){
            alert("Edited Successfully")

        const forumDoc = doc(db, "forumans", id)
        const newFields = { 
            answer: newQuestions, 
            date: date, 
            forumid: params.forumid, 
            username: auth.currentUser.email}
        await updateDoc(forumDoc, newFields)
        }
        else{
            alert("Must Be Logged In to edit comment")
        }
    }

    const DeleteForum = async (id) => {
        if(auth.currentUser !=null){
            alert("Deleted Successfully")

        const forumDoc = doc(db, "forumans", id)
        await deleteDoc(forumDoc)
        }
        else{
            alert("Must Be Logged In to delete comment")
        }
    };


    useEffect(() => {

        const GetForum = async (id) => {
            const data = await getDocs(forumCollectRef);
            setForum(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
        };
        GetForum();
        console.log(params.id);

    }, [])


    return <div className="AddForum">
        <div className="createanswersdiv">
        <h1>Create Comment</h1>
        <input className="inputtitle" placeholder = "Answer..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        <button className="btncreateforum" onClick={CreateForum}> Create Forum</button>        

        <h1>Edit Comment</h1>
        <input className="inputtitle" placeholder = "Question..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        </div>

        

        {forum.filter((forum) => {
            return forum.forumid.includes(params.forumid)
        }).map((forum)=> {
        
            return (
                
                
                <div className="showanswersdiv"> 
                <h1 className="comment">{forum.answer} </h1>
                <h5>Created On: {forum.date} Creator: {forum.username} </h5>
                {/* <h1>forumid: {forum.forumid} </h1> */}

                <button className="btndeleteforum" onClick={() => {DeleteForum(forum.id)}}>Delete</button>
                <button className="btneditforum" onClick={() => {UpdateForum(forum.id, forum.title)}}>Edit</button>


                </div>
        )}
            

)}
    </div>
}

export default BigForumAns;