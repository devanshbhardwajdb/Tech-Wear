// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmeJLGoT0QRA5okPY302thwI0VgcizzTo",
  authDomain: "tech-wear-a3da2.firebaseapp.com",
  projectId: "tech-wear-a3da2",
  storageBucket: "tech-wear-a3da2.appspot.com",
  messagingSenderId: "265276898758",
  appId: "1:265276898758:web:4874c87f6038902c7206c7",
  measurementId: "G-T3PP3MBPEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)