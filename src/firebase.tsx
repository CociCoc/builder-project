
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0_5u_GLECns2r8GxhM6iwGUpLaSWe9Rk",
    authDomain: "shops-f6959.firebaseapp.com",
    projectId: "shops-f6959",
    storageBucket: "shops-f6959.appspot.com",
    messagingSenderId: "585048472062",
    appId: "1:585048472062:web:49af77b69e86aaca9f28af",
    measurementId: "G-MJRNZ06RDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);