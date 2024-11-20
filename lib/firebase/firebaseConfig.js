// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "kiss my ass",
  authDomain: "fruityy-e9220.firebaseapp.com",
  projectId: "fruityy-e9220",
  storageBucket: "fruityy-e9220.firebasestorage.app",
  messagingSenderId: "195412990296",
  appId: "1:195412990296:web:dcbc89934cfddb00e2ed2d",
  measurementId: "G-7HK3K3PYB0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
export const auth = getAuth(app);
