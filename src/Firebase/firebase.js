// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKIQtUA7KtKWnYvrcBgfYT1Ysv8O02orE",
  authDomain: "ctrlrw-60e64.firebaseapp.com",
  databaseURL: "https://ctrlrw-60e64-default-rtdb.firebaseio.com",
  projectId: "ctrlrw-60e64",
  storageBucket: "ctrlrw-60e64.appspot.com",
  messagingSenderId: "383494784190",
  appId: "1:383494784190:web:412cff448881cf17e9caef",
  measurementId: "G-S9KHTGHF15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

