import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCEOET2v1xp411MmUYEIDFEt6eZxj664UM",
    authDomain: "auth-dev-aeabc.firebaseapp.com",
    projectId: "auth-dev-aeabc",
    storageBucket: "auth-dev-aeabc.appspot.com",
    messagingSenderId: "1034279601847",
    appId: "1:1034279601847:web:5fa3db610c90c3b47a2f32"
})

export const auth = app.auth()
export default app;