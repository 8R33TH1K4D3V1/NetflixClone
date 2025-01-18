import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword,
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA_7lX5KTD2osXvKr5P-PxrVW-CicZ4FHM",
  authDomain: "netflix-clone-1563a.firebaseapp.com",
  projectId: "netflix-clone-1563a",
  storageBucket: "netflix-clone-1563a.appspot.com",
  messagingSenderId: "564959393805",
  appId: "1:564959393805:web:899a05e4a83667d561bd44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password, navigate) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!");
    navigate('/'); // Redirect to home
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error(error.message || "An error occurred during signup.");
  }
};

const login = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    navigate('/'); // Redirect to home
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(formatFirebaseError(error.message));
  }
};

const logout = () => {
  try {
    signOut(auth);
    toast.success("Logout successful!");
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error(formatFirebaseError(error.message));
  }
};

const formatFirebaseError = (errorMessage) => {
  if (!errorMessage) return "An unexpected error occurred.";
  try {
    const parts = errorMessage.split('/');
    const cleanMessage = parts[1]?.split('-').join(' ') || errorMessage;
    return cleanMessage;
  } catch {
    return errorMessage;
  }
};

export { auth, db, login, signup, logout };
