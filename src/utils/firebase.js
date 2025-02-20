// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBceckq7TrQbAItSfNnGmfoYwHDTGwYPno",
  authDomain: "netflixgpt-da1ff.firebaseapp.com",
  projectId: "netflixgpt-da1ff",
  storageBucket: "netflixgpt-da1ff.firebasestorage.app",
  messagingSenderId: "1020004273836",
  appId: "1:1020004273836:web:ad82d1692391dc99511909",
  measurementId: "G-CSYHSJQWP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =getAuth();