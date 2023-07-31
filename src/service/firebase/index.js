// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwp5t-xRjcjynb9FL6SzWFRqHJoFBx9SA",
    authDomain: "convitecasamento-b54ec.firebaseapp.com",
    projectId: "convitecasamento-b54ec",
    storageBucket: "convitecasamento-b54ec.appspot.com",
    messagingSenderId: "14927159443",
    appId: "1:14927159443:web:a2bc8af950ac7d8c9f6d66",
    measurementId: "G-PNHBXP0LZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {db, storage, auth}