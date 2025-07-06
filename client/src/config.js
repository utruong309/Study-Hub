// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlQrerSvuHi2THBABxUkQTsu8vpw-6Mdk",
  authDomain: "studyhub-dfd67.firebaseapp.com",
  projectId: "studyhub-dfd67",
  storageBucket: "studyhub-dfd67.firebasestorage.app",
  messagingSenderId: "967834634580",
  appId: "1:967834634580:web:5d0d62d79e99ba3147a0c1",
  measurementId: "G-2G0PFPMF98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);