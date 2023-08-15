// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Qh3GJkLXuhKyX5iFYqTxZiUt5PJuhfk",
  authDomain: "social-media-7d5f5.firebaseapp.com",
  projectId: "social-media-7d5f5",
  storageBucket: "social-media-7d5f5.appspot.com",
  messagingSenderId: "701308300919",
  appId: "1:701308300919:web:e73cc3587dc9d663bba072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);