import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLgQfWc6el2LYskeO2f1pU_5fNPyso6Dc",
  authDomain: "famista-cb7e9.firebaseapp.com",
  projectId: "famista-cb7e9",
  storageBucket: "famista-cb7e9.appspot.com",
  messagingSenderId: "731015836197",
  appId: "1:731015836197:web:3b14578987e9d8b14185cc",
  measurementId: "G-W7GS8N6Q51"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
