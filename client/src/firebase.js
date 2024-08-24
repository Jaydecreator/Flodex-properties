// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "flodex-properties.firebaseapp.com",
  projectId: "flodex-properties",
  storageBucket: "flodex-properties.appspot.com",
  messagingSenderId: "626322513051",
  appId: "1:626322513051:web:def63056b529694e3c7a3e",
//   measurementId: "G-PQDKJF0YCR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);