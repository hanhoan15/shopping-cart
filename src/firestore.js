import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCmyOJ8ZlI5f4d1xYvdCTTi2dqWcKjONuQ",
  authDomain: "shopping-cart-aa5b7.firebaseapp.com",
  projectId: "shopping-cart-aa5b7",
  storageBucket: "shopping-cart-aa5b7.appspot.com",
  messagingSenderId: "891593864359",
  appId: "1:891593864359:web:5a0e80fd89d559c9295782"
});

const reduxSagaFirebase = new ReduxSagaFirebase(app);


export default reduxSagaFirebase;