import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import AuthDetails from "./authdetails";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import "../Styles/addforum.css";


function AddForum() {
    const [forum, setForum] = useState([]);
    const forumCollectRef = collection(db, "gameforum");
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
            date: date, 
            gameid: params.id, 
            question: newQuestions, 
            username: auth.currentUser.email});

        }
        else{
            alert("Must Be Logged In To Add A Post")
        }
    };
    
    const UpdateForum = async (id) => {

        if(auth.currentUser != null){
            alert("Edited Successfully")

        const forumDoc = doc(db, "gameforum", id)
        const newFields = {title: newTitle, date: date, gameid: params.id, question: newQuestions, username: auth.currentUser.email}
        await updateDoc(forumDoc, newFields)
        }
        else{
            alert("Must Be Logged In To Edit A Post")
        }
    }

    const DeleteForum = async (id) => {
        if(auth.currentUser != null){
            alert("Deleted Successfully")

        const forumDoc = doc(db, "gameforum", id)
        await deleteDoc(forumDoc)
        }
        else{
            alert("You are not aurtorised to delete a post")
        }
    };

    const FilterData = async (id) => {
        const data = await getDocs(forumCollectRef);

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
        <div className="createeditforum">
        <h1>Ask For Help</h1>
        <input className="inputtitleforum" placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input className="inputquestionforum" placeholder = "Question..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        <button className="btncreateforum" onClick={CreateForum}> Create Forum</button>        

        <h1>Edit Post</h1>
        <input className="edittitleforum" placeholder = "Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
        <input className="editquestionforum" placeholder = "Question..." onChange={(event) => {setNewQuestions(event.target.value)}}/>
        </div>

        
        {forum.filter((forum) => {
            return forum.gameid.includes(params.id)
        }).map((forum)=> {
          

            return (
                
                
                <div className="forforum"> 
                <h1 className="forumtitle"> {forum.title} </h1>
                <h1 className="forumquestion">{forum.question} </h1>
                <h5 className="foruminfo">Created On: {forum.date} Creator: {forum.username} </h5>
                {/* <h1 className="forumgameid">Gameid: {forum.gameid} </h1>
                <h1 className="forumid">id: {forum.id} </h1>    */}

                <Link to={`/forum/${forum.id}`}>
                    <button className="btncommentforum">Comment</button>
                </Link>              

                <button className="btndeleteforum" onClick={() => {DeleteForum(forum.id)}}>Delete</button>
                <button className="btneditforum" onClick={() => {UpdateForum(forum.id, forum.title)}}>Edit</button>


                </div>
        )}
            

)}
    </div>
}

export default AddForum;