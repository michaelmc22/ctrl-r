import { getAuth } from "firebase/auth";
const auth = getAuth();


function validate(){
    if (auth.currentUser) {
        var user_email = auth.currentUser.email
      }

    if (user_email === "test@456.com" ){
       console.log("Access Granted") 
    }else{
        alert('You Are Not An Authorized User')
        window.location = "/home"
    }
}

export default validate;