import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import AuthDetails from "./authdetails";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import "../Styles/addbigforum.css";



function AddForum() {
    const [forum, setForum] = useState([]);
    const forumCollectRef = collection(db, "forum");
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

        if(auth.currentUser != null){
            
            alert("Created Successfully")
            
            
            
        await addDoc(forumCollectRef, {
            title: newTitle, 
            question: newQuestions, 
            date: date, 
            username: auth.currentUser.email});
        }
        else{
            alert("You must be logged in to create a post")
        }
            
        
    };
    
    const UpdateForum = async (id) => {


        if(auth.currentUser != null){
            alert("Edited Successfully")
        

        const forumDoc = doc(db, "forum", id)
        const newFields = { title: newTitle, 
            question: newQuestions, 
            date: date, 
            username: auth.currentUser.email}
        await updateDoc(forumDoc, newFields)
        }
        else{
            alert("You must be logged in to edit a post")
        }
    }

    const DeleteForum = async (id) => {

        if(auth.currentUser != null){
            alert("Deleted Successfully")

        const forumDoc = doc(db, "forum", id)
        await deleteDoc(forumDoc)
        }
        else{
            alert("You are not authorised to Delete posts")
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


    return<div className="AddBigForum">
        <div className="createeditdivbigfor">
        <h1 className="createposttitle">Global Chat</h1>
        <input className="inputtitle" placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input className="inputquestion" placeholder = "Question..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        <button className="btncreate" onClick={CreateForum}> Create Forum</button>        

        <h1>Edit Post</h1>
        <input className="edittitle" placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input className="editquestion" placeholder = "Question..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        </div>
        {forum.map((forum)=> {
          

            return (
                
                
                <div className="divforbigforum"> 
                <h1 className="titlebigfor">{forum.title} </h1>
                <h2 className="questionbigfor">{forum.question} </h2>
                <h5 className="infobigfor">Created On: {forum.date} Creator: {forum.username} </h5> 

                <Link to={`/bigforum/${forum.id}`}>
                    <button className="commentbigfor">Comment</button>
                </Link>              

                <button className="deletebigfor" onClick={() => {DeleteForum(forum.id)}}>Delete</button>
                <button className="editbigfor"onClick={() => {UpdateForum(forum.id, forum.title)}}>Edit</button>


                </div>
        )}
            

)}
    </div>
}

export default AddForum;