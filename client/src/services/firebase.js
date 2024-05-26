// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "usthb-pfe-2d21e.firebaseapp.com",
    projectId: "usthb-pfe-2d21e",
    storageBucket: "usthb-pfe-2d21e.appspot.com",
    messagingSenderId: "234389935649",
    appId: "1:234389935649:web:b7bd58e2ef77a8c89cb560",
    measurementId: "G-SHHYMB28JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;