import React from "react";
import SignIn from "../Components/signin";
import SignUp from "../Components/sigup";
import AuthDetails from "../Components/authdetails";
import Profile from "../Components/profile";

function Account() {
  return (
    <div>
        <SignIn/>
        <SignUp/>
        <AuthDetails />
        <Profile />
    </div>
  );
}

export default Account;



