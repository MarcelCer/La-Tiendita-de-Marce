// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf_oNKyuQPTRWIsKKCRzZAT18l2L5ERWU",
  authDomain: "prueba-27c26.firebaseapp.com",
  projectId: "prueba-27c26",
  storageBucket: "prueba-27c26.firebasestorage.app",
  messagingSenderId: "878504868664",
  appId: "1:878504868664:web:0cd299d5450f547dd9dfcd",
  measurementId: "G-VRBXG6QGXC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function crearUsuario(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("Credenciales", userCredential);
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code, error.message);
      // ..
    });
}

export function loginEmailPass(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Sign In
        console.log("Credenciales", userCredential);
        const user = userCredential.user;
        console.log(user);
        resolve(user);
        //..
      })
      .catch((error) => {
        console.log(error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
}
