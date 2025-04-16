// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCct43yDh_KqRF1yCsQXk_wdv8ifV7EIOM",
  authDomain: "mtm6404-contactbook.firebaseapp.com",
  projectId: "mtm6404-contactbook",
  storageBucket: "mtm6404-contactbook.firebasestorage.app",
  messagingSenderId: "478327852113",
  appId: "1:478327852113:web:8e452b8d91978afab2bc70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;