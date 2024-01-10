// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1wh0A8tB40WDKduPGn9mLsGKrLWCKFYY",
    authDomain: "ecommerce-homespa.firebaseapp.com",
    projectId: "ecommerce-homespa",
    storageBucket: "ecommerce-homespa.appspot.com",
    messagingSenderId: "498683782256",
    appId: "1:498683782256:web:e018152c4a15bd9323c0b5",
    measurementId: "G-YTSYHVPG2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth,db };
export default app;
