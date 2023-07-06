import swal from "sweetalert";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUORmfXV-7PaYDwxkvuVQjoAZZT1AEaY0",
  authDomain: "turo-landing.firebaseapp.com",
  projectId: "turo-landing",
  storageBucket: "turo-landing.appspot.com",
  messagingSenderId: "107972146118",
  appId: "1:107972146118:web:edfb5e3af6f5efbb62f8c7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// sigin wth google
const signInGoogle = async () => {
  try {
    var provider = new GoogleAuthProvider();
    const result = await auth;
    await signInWithPopup(auth, provider);
    await addUserToDB();
    await swal("Congratulations!", "Loggined successfully!", "success");
  } catch (e) {
    console.log(e.message);
  }
};
console.log(auth);

// adding users to database
const addUserToDB = async () => {
  const uid = auth.currentUser.uid;
  var userProfile = { email: "", name: "", photoURL: "" };
  userProfile.email = auth.currentUser.email;
  userProfile.name = auth.currentUser.displayName;
  userProfile.photoURL = auth.currentUser.photoURL;

  return setDoc(doc(db, "users", uid), userProfile);
};

export default signInGoogle;

export {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getFirestore,
  doc,
  setDoc,
  swal,
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
