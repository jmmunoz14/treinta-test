import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC-XmWkUZuers4sRZs2cRtBsQ3gqbxdFuk",
    authDomain: "testtreinta.firebaseapp.com",
    projectId: "testtreinta",
    storageBucket: "testtreinta.appspot.com",
    messagingSenderId: "788319058015",
    appId: "1:788319058015:web:0f900ba13cb90aae7143ea",
    measurementId: "G-MKFZCQBK3F"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();


export default {
    firebase,
    db,
    auth,
}